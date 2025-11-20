import http from "node:http";
import { routes } from "./routes.js";
import { jsonStreamMiddleware } from "./middlewares/json-stream.middleware.js";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  await jsonStreamMiddleware(req, res);

  const route = routes.find(route => {
    return route.method === req.method && new RegExp(route.path).test(req.url);
  });

  if (route) return route.handler(req, res);

  res.writeHead(404).end();
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});