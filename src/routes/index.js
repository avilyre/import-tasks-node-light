import { randomUUID } from "node:crypto";
import { createPath } from "./utils/create-path.js";
import { Database } from "../database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: createPath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");
      res.writeHead(200).end(JSON.stringify(tasks));
    }
  },
  {
    method: "POST",
    path: createPath("/tasks"),
    handler: (req, res) => {
      const { description } = JSON.parse(req.body);

      if (!description) return res.writeHead(400).end();
      
      const task = {
        id: randomUUID(),
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      database.insert("tasks", task);

      res.writeHead(201).end();
    }
  },
  {
    method: "PUT",
    path: createPath("/tasks/:id"),
    handler: (req, res) => {
      res.writeHead(204).end();
    }
  },
  {
    method: "DELETE",
    path: createPath("/tasks/:id"),
    handler: (req, res) => {
      res.writeHead(204).end();
    }
  }
]