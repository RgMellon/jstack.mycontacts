const db = require('../../database/index.js');

class ContactRepository {
  async findAll(orderBy) {
    const directions = orderBy?.toUppercase() === 'desc' ? 'DESC' : 'ASC';
    const rows = await db.query(
      `SELECT * FROM contacts ORDER BY name ${directions}`
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return rows;
  }

  async remove(id) {
    const deleteOp = await db.query(`DELETE FROM contacts WHERE id = $1`, [id]);
    return deleteOp;
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `INSERT INTO contacts(name, email, phone, category_id)
       VALUES($1, $2, $3, $4)
       RETURNING *
      `,
      [name, email, phone, category_id]
    );

    return row;
  }

  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM contacts WHERE email = $1', [
      email,
    ]);

    return rows;
  }

  async update(id, { name, email, phone, category_id }) {
    const [row] = await db.query(
      `UPDATE contacts
      SET name = $1, email = $2, category_id = $3, phone = $4
      WHERE id = $5
      RETURNING *
    `,
      [name, email, category_id, phone, id]
    );

    return row;
  }
}

module.exports = new ContactRepository();
