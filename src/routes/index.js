import { randomUUID } from "node:crypto";
import { createPath } from "./utils/create-path.js";
import { Database } from "../database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: createPath("/tasks"),
    handler: (req, res) => {
      const query = req.query

      const searchOptions = query?.search ? {
        title: query?.search,
        description: query?.search,
      } : null;

      const tasks = database.select("tasks", null, searchOptions);
      res.writeHead(200).end(JSON.stringify(tasks));
    }
  },
  {
    method: "POST",
    path: createPath("/tasks"),
    handler: (req, res) => {
      const { title,description } = JSON.parse(req.body);

      if (!description || !title) return res.writeHead(400).end();
      
      const task = {
        id: randomUUID(),
        title,
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
    path: createPath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = JSON.parse(req.body);

      if (!id || !title || !description) return res.writeHead(400).end();

      const task = {
        id,
        title,
        description,
        updated_at: new Date()
      };

      database.update("tasks", id, task);
      res.writeHead(204).end();
    }
  },
  {
    method: "PATCH",
    path: createPath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.select("tasks", id);

      if (task.length === 0) return res.writeHead(404).end();

      const completed_at = task.completed_at ? null : new Date();

      const updatedTask = {
        ...task,
        completed_at,
      };

      database.update("tasks", id, updatedTask);
      res.writeHead(204).end();
    }
  },
  {
    method: "DELETE",
    path: createPath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      if (!id) return res.writeHead(400).end();

      database.delete("tasks", id);
      res.writeHead(204).end();
    }
  }
]