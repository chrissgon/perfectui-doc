// The Perfect UI MCP server over HTTP, for netlify/functions/mcp.mts. The five read-only tools and
// their data come from @chrissgon/perfectui-mcp (https://github.com/chrissgon/perfectui-mcp):
// buildServer and its bundled corpus of the 1.0.0 docs. This file only adapts them to one stateless
// Streamable HTTP request: a new server and transport per request, JSON responses instead of SSE,
// POST only. No tool writes, sends or runs anything, and the server makes no outbound request: a tool
// argument is data to validate, never an instruction.
import { buildServer, loadCorpus, TOOL_NAMES } from "@chrissgon/perfectui-mcp";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

export { TOOL_NAMES };

export const MCP_PATH = "/api/mcp";

/**
 * Largest request body accepted. check_markup takes up to 100,000 characters of HTML; as a JSON string
 * that is at most about 300 KB of UTF-8 (3 bytes per character) plus escaping, so 512 KiB leaves room
 * for the envelope while staying far below the platform's own body limit.
 */
export const MAX_BODY_BYTES = 512 * 1024;

// Read and validated once per function instance (cold start), shared by every request it serves.
const corpus = loadCorpus();

const NO_STORE = { "cache-control": "no-store", "x-content-type-options": "nosniff" } as const;

function jsonRpcError(status: number, message: string, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message }, id: null }), {
    status,
    headers: { "content-type": "application/json", ...NO_STORE, ...headers },
  });
}

/**
 * MCP lets a client omit `arguments` in `tools/call`; the SDK would then validate `undefined` against a
 * tool's strict object schema and fail (get_install and list_components take no input). Give such calls
 * `{}`. A body that is not valid JSON goes through unchanged, and the transport answers it.
 */
export function withDefaultArguments(body: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return body;
  }
  const fix = (m: unknown) => {
    if (m && typeof m === "object" && (m as { method?: unknown }).method === "tools/call") {
      const params = (m as { params?: unknown }).params;
      if (params && typeof params === "object" && (params as { arguments?: unknown }).arguments === undefined) {
        (params as { arguments?: unknown }).arguments = {};
      }
    }
  };
  if (Array.isArray(parsed)) parsed.forEach(fix);
  else fix(parsed);
  return JSON.stringify(parsed);
}

/**
 * Handles one HTTP request to the MCP endpoint. Netlify's custom headers do not apply to function
 * responses, so the handler sets its own (https://docs.netlify.com/manage/routing/headers/).
 */
export async function handleMcpRequest(req: Request): Promise<Response> {
  // Stateless server: no server-initiated SSE stream (GET), no session to end (DELETE), no CORS preflight.
  if (req.method !== "POST") {
    return jsonRpcError(405, "Method not allowed. This stateless MCP endpoint accepts POST only.", { allow: "POST" });
  }
  const tooLarge = () => jsonRpcError(413, `Request body too large (limit ${MAX_BODY_BYTES} bytes).`);
  const length = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) return tooLarge();
  const body = await req.text();
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return tooLarge();

  const server = buildServer(corpus);
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless
    enableJsonResponse: true,
  });
  try {
    await server.connect(transport);
    const headers = new Headers(req.headers);
    headers.delete("content-length"); // the body below may differ in length from the original
    const res = await transport.handleRequest(new Request(req.url, { method: "POST", headers, body: withDefaultArguments(body) }));
    for (const [k, v] of Object.entries(NO_STORE)) res.headers.set(k, v);
    return res;
  } catch (err) {
    console.error("mcp handler error", err);
    return jsonRpcError(500, "Internal server error");
  } finally {
    // The JSON response body is fully built before handleRequest resolves, so closing here is safe.
    await transport.close();
    await server.close();
  }
}
