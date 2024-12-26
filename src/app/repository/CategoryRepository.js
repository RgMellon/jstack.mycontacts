const db = require('../../database');

class CategoryRepository {
  async store(name) {
    const [row] = await db.query(
      `
        INSERT INTO categories(name) VALUES($1)
        RETURNING *
    `,
      [name]
    );

    return row;
  }

  async findAll() {
    const rows = await db.query('SELECT * FROM categories');
    return rows;
  }
}

module.exports = new CategoryRepository();
