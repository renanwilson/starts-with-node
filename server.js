import express from "express";
import route from "./src/routes/challengesRoutes.js";

const server = express();
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);
server.use(route);
server.listen({ host: "0.0.0.0", port: process.env.PORT ?? 3333 });
