// Serves a generated site the way a static host does: `/path` → `/path/index.html`,
// unknown paths → `404.html` with status 404, text compressed with brotli or gzip as the client
// accepts, as Netlify does, so Lighthouse measures real transfer sizes.
// Usage: node static-server.mjs <dir> <port>
import { createServer } from "node:http";
import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";

const [, , dirArg = ".output/public", portArg = "4173"] = process.argv;
const root = resolve(dirArg);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".txt": "text/plain",
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const bare = clean.replace(/[/\\]+$/, "");
  const candidates = [join(root, clean), join(root, clean, "index.html"), join(root, `${bare}.html`)];
  for (const file of candidates) {
    if (!file.startsWith(root)) continue;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

try {
  await stat(join(root, "index.html"));
} catch {
  console.error(`No generated site in ${root}: run \`bun run generate\` first.`);
  process.exit(1);
}

const compressible = new Set([".html", ".js", ".mjs", ".css", ".json", ".svg", ".txt", ""]);

// Compressed once per file and kept in memory, as a CDN caches it: compressing on every request
// would slow responses and change what Lighthouse's simulation infers from observed timings.
const cache = new Map();

function encode(body, ext, accepts) {
  if (!compressible.has(ext)) return [body, undefined];
  const encoding = !process.env.NO_BR && /\bbr\b/.test(accepts) ? "br" : /\bgzip\b/.test(accepts) ? "gzip" : undefined;
  if (!encoding) return [body, undefined];
  const key = `${encoding}:${body.length}:${body.subarray(0, 64).toString("hex")}:${body.subarray(-64).toString("hex")}`;
  if (!cache.has(key)) {
    cache.set(key, encoding === "br" ? brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }) : gzipSync(body, { level: 9 }));
  }
  return [cache.get(key), encoding];
}

function send(req, res, status, type, raw, ext) {
  const [body, encoding] = encode(raw, ext, req.headers["accept-encoding"] ?? "");
  const headers = { "content-type": type };
  if (encoding) {
    headers["content-encoding"] = encoding;
    headers.vary = "accept-encoding";
  }
  res.writeHead(status, headers);
  res.end(body);
}

// Warm the cache before serving, so the first request of a measured page is as fast as a CDN's.
for (const entry of await readdir(root, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !compressible.has(extname(entry.name))) continue;
  const body = await readFile(join(entry.parentPath, entry.name));
  for (const accepts of ["br", "gzip"]) encode(body, extname(entry.name), accepts);
}

createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  if (file) {
    send(req, res, 200, types[extname(file)] ?? "application/octet-stream", await readFile(file), extname(file));
    return;
  }
  const notFound = await readFile(join(root, "404.html")).catch(() => Buffer.from("Not found"));
  send(req, res, 404, types[".html"], notFound, ".html");
}).listen(Number(portArg), () => console.log(`static server on http://localhost:${portArg}`));
