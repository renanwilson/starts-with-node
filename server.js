import express from "express";
import challengeRoute from "./src/routes/challengesRoutes.js";
import admin from "firebase-admin";
import loginRoutes from "./src/routes/loginRoutes.js";
import { initializeApp } from "firebase/app";
import sdk from "./sdkConfig.json" assert { type: "json" };

const server = express();
server.use(express.json());

initializeApp({
  apiKey: "AIzaSyD78eLaIzkgQGkLcNIjiU1y5ADKuIWWU1k",
  authDomain: "start-with-node-315a8.firebaseapp.com",
  projectId: "start-with-node-315a8",
  storageBucket: "start-with-node-315a8.appspot.com",
  messagingSenderId: "631194663093",
  appId: "1:631194663093:web:7aabba28218b594a4966fc",
});

admin.initializeApp({
  credential: admin.credential.cert(sdk),
});

server.use(
  express.urlencoded({
    extended: true,
  })
);

server.use(challengeRoute);
server.use(loginRoutes);

server.listen({ host: "0.0.0.0", port: process.env.PORT ?? 3333 });
