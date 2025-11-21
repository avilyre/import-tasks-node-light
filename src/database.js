export class Database {
  #database = {};

  insert(table, data) {
    const isTableAlreadyExists = Array.isArray(this.#database[table]);

    if (!isTableAlreadyExists) {
      return this.#database[table] = [data];
    }

    this.#database[table].push(data);
  }

  select(table, id) {
    const isTableExists = Array.isArray(this.#database[table]);

    if (!isTableExists) return [];

    if (id) return this.#database[table].find(item => item.id === id);

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
  }

  delete(table, id) {
    const isTableExists = Array.isArray(this.#database[table]);

    if (!isTableExists) return;

    const updatedDatabase = this.#database[table].filter(item => item.id !== id);
    this.#database[table] = updatedDatabase;
  }
}