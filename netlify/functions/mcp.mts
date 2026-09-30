// The Perfect UI MCP server at https://perfectui.dev/api/mcp, as a Netlify Function v2. The handler is in
// netlify/mcp/handler.ts; the tools come from the @chrissgon/perfectui-mcp package, which netlify.toml
// ships unbundled (it reads its corpus from a file next to its code).
import type { Config } from "@netlify/functions";
import { handleMcpRequest } from "../mcp/handler.ts";

export default handleMcpRequest;

export const config: Config = {
  // Literal values only: Netlify reads this object from the source without running it, so a value
  // imported from another module (MCP_PATH) would leave the function without its route.
  path: "/api/mcp",
  // 30 requests per 60 s per IP and domain. Rate limiting runs before functions in Netlify's request
  // chain, so a blocked request gets a 429 without invoking the function. Code-based rules work on every
  // plan (2 per project on Free); rate limits of functions are set here, not in netlify.toml. `action` is
  // left out, so the default (block) applies. Accessed 2026-09-30:
  // https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/
  // https://docs.netlify.com/resources/troubleshooting/request-chain/
  rateLimit: {
    windowLimit: 30,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
