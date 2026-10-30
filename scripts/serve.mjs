import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, relative, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const publicRoots = new Set(["index.html", "styles.css", "config.js", "src", "data"]);
const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"]
]);

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || "/", "http://localhost").pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  if (pathname.split("/").some((part) => part.startsWith("."))) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const requestedPath = pathname.endsWith("/") ? pathname + "index.html" : pathname;
  const filePath = resolve(root, "." + requestedPath);
  const relativePath = relative(root, filePath);
  const firstPart = relativePath.split(sep)[0];
  if (relativePath.startsWith("..") || !publicRoots.has(firstPart)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes.get(extname(filePath)) || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'"
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    response.writeHead(error && error.code === "ENOENT" ? 404 : 500);
    response.end(error && error.code === "ENOENT" ? "Not found" : "Server error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log("Dashboard available at http://127.0.0.1:" + port);
});