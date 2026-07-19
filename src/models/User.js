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

  /**
   * Update user name and email.
   */
  async update(id, name, email) {
    const { rows } = await pool.query(
      'UPDATE users SET name = $2, email = $3 WHERE id = $1 RETURNING id, name, email',
      [id, name, email]
    );
    return rows[0];
  },

  /**
   * Update user password hash.
   */
  async updatePassword(id, passwordHash) {
    await pool.query(
      'UPDATE users SET password_hash = $2 WHERE id = $1',
      [id, passwordHash]
    );
  },

  /**
   * Delete a user account and all associated data (cascades via FK).
   */
  async deleteById(id) {
    await pool.query('DELETE FROM user_stats WHERE user_id = $1', [id]);
    await pool.query('DELETE FROM user_progress WHERE user_id = $1', [id]);
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  },
};

module.exports = User;
