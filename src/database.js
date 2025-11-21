import fs from "node:fs/promises";

const persistPath = new URL("../database.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    try {
      fs.readFile(persistPath, "utf-8").then(data => {
        this.#database = JSON.parse(data);
      }).catch(() => {
        this.#persist();
      });
    } catch {
      this.#persist();
    }
  }

  #persist() {
    fs.writeFile(persistPath, JSON.stringify(this.#database));
  }

  insert(table, data) {
    const isTableAlreadyExists = Array.isArray(this.#database[table]);

    if (!isTableAlreadyExists) {
      this.#database[table] = [data];
    } else {
      this.#database[table].push(data);
    }

    this.#persist();
  }

  select(table, id, search) {
    const isTableExists = Array.isArray(this.#database[table]);
    const isSelectById = id;
    const isSearching = Boolean(search);

    if (!isTableExists) return [];

    if (isSelectById) {
      return this.#database[table].find(item => item.id === id)
    }

    if (isSearching) {
      return this.#database[table].filter((item) => {
        return Object.entries(search).some(([key, value]) => {
          return item[key].toLowerCase().includes(value.toLowerCase());
        })
      });
    }

    return this.#database[table];
  }

  update(table, id, data) {
    const isTableExists = Array.isArray(this.#database[table]);

    if (!isTableExists) return;

    const updatedDatabase = this.#database[table].map(item => {
      if (item.id === id) {
        return {
          id,
          ...item,
          ...data
        };
      }
      return item;
    });
    this.#database[table] = updatedDatabase;
    this.#persist();
  }

  delete(table, id) {
    const isTableExists = Array.isArray(this.#database[table]);

    if (!isTableExists) return;

    const updatedDatabase = this.#database[table].filter(item => item.id !== id);
    this.#database[table] = updatedDatabase;
    this.#persist();
  }
}