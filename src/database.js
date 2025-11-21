export class Database {
  #database = {};

  insert(table, data) {
    const isTableAlreadyExists = Array.isArray(this.#database[table]);

    if (!isTableAlreadyExists) {
      return this.#database[table] = [data];
    }

    this.#database[table].push(data);
  }

  select(table) {
    const isTableExists = Array.isArray(this.#database[table]);
    return isTableExists ? this.#database[table] : [];
  }
}