import http from "node:http";
import { routes } from "./routes/index.js";
import { jsonStreamMiddleware } from "./middlewares/json-stream.middleware.js";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await jsonStreamMiddleware(req, res);

  const route = routes.find(route => route.method === method && route.path.test(url));

  if (route) {
    const routeParams = { ...url.match(route.path).groups } || null;

    req.params = routeParams;

    return route.handler(req, res)
  };

  res.writeHead(404).end();
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});