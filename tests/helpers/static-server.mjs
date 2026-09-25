// Serves a generated site the way a static host does: `/path` → `/path/index.html`,
// unknown paths → `404.html` with status 404. Usage: node static-server.mjs <dir> <port>
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const [, , dirArg = ".output/public", portArg = "4173"] = process.argv;
const root = resolve(dirArg);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".txt": "text/plain",
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(root, clean), join(root, clean, "index.html"), join(root, `${clean}.html`)];
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

createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  if (file) {
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
    return;
  }
  const notFound = join(root, "404.html");
  res.writeHead(404, { "content-type": types[".html"] });
  res.end(await readFile(notFound).catch(() => "Not found"));
}).listen(Number(portArg), () => console.log(`static server on http://localhost:${portArg}`));
