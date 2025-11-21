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

  delete(table, id) {
    const isTableExists = Array.isArray(this.#database[table]);

    if (!isTableExists) return;
    
    const updatedDatabase = this.#database[table].filter(item => item.id !== id);
    this.#database[table] = updatedDatabase;
  }
}