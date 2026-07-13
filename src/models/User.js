const { pool } = require('../config/database');

const User = {
  /**
   * Find a user by email address.
   * Used during login to verify credentials.
   */
  async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  },

  /**
   * Find a user by ID.
   * Used to load user data into session / views.
   */
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Create a new user account.
   * Returns the created user (without password_hash).
   */
  async create(name, email, passwordHash) {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, passwordHash]
    );
    return rows[0];
  },
};

module.exports = User;
