import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.ttf': 'font/ttf' };
const port = Number(process.env.PORT || 4321);
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relative = pathname === '/' ? 'proof/mobile.html' : pathname.replace(/^\/+/, '');
    const path = resolve(root, relative);
    const allowed = ['proof', 'output', 'wip-assets'].some(directory => path.startsWith(resolve(root, directory) + sep));
    if (!allowed || relative.split(/[\\/]/).some(part => part.startsWith('.'))) {
      response.writeHead(404).end('Not found');
      return;
    }
    const bytes = await readFile(path);
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' }).end(bytes);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Visual proof: http://127.0.0.1:${port}/`));
