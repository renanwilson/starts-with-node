import { randomUUID } from "node:crypto";
import { postgresConfig } from "../config/postgresConfig.js";

export class DatabasePostgres {
  async list(search) {
    let challenges;
    if (search) {
      challenges =
        await postgresConfig`select * from challenges where title ilike ${
          "%" + search + "%"
        }`;
    } else {
      challenges = await postgresConfig`select * from challenges`;
    }
    return challenges;
  }

  async create(challenge) {
    const challengeId = randomUUID();
    const { title, description, tasks_lists } = challenge;
    const response = { ...challenge, id: challengeId };

    await postgresConfig`insert into challenges (id, title, description, tasks_lists) VALUES (${challengeId}, ${title}, ${description}, ${tasks_lists})`;

    return response;
  }

  async update(id, challenge) {
    const { title, tasks_lists, description } = challenge;
    await postgresConfig`update challenges set title = ${title}, tasks_lists = ${tasks_lists}, description = ${description} WHERE id = ${id}`;
  }

  async retrieve(id) {
    const challeges =
      await postgresConfig`select * from challenges where id = ${id}`;
    return challeges;
  }

  async delete(id) {
    await postgresConfig`delete from challenges where id = ${id}`;
  }
}
