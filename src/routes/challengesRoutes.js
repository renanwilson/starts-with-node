import { DatabasePostgres } from "../controllers/Challenges.js";
import express from "express";

const route = express.Router();
const database = new DatabasePostgres();

route.post("/challenges", async (request, reply) => {
  const { title, description, tasks_lists } = request.body;

  const response = await database.create({
    title,
    description,
    tasks_lists,
  });

  return reply.status(201).send(response);
});

route.get("/challenges", async (request, reply) => {
  const search = request.query.search;
  const challenges = await database.list(search);
  return reply.status(200).send(challenges);
});
route.get("/challenges/:id", async (request, reply) => {
  const { id } = request.params;
  console.log(id);
  const challenges = await database.retrieve(id);
  return reply.status(200).send(challenges);
});

route.put("/challenges/:id", async (request, reply) => {
  const challengeId = request.params.id;
  const { title, description, tasks_lists } = request.body;
  await database.update(challengeId, { title, description, tasks_lists });
  return reply.status(204).send();
});

route.delete("/challenges/:id", async (request, reply) => {
  const challengesId = request.params.id;

  await database.delete(challengesId);
  return reply.status(204).send();
});

export default route;
