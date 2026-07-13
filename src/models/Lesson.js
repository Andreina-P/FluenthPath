const { pool } = require('../config/database');

const Lesson = {
  /**
   * Get all lessons ordered by level and order_index.
   */
  async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM lessons ORDER BY order_index ASC'
    );
    return rows;
  },

  /**
   * Get a single lesson by ID.
   */
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM lessons WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Get recent lessons a user has worked on (for sidebar).
   */
  async findRecentByUser(userId, limit = 3) {
    const { rows } = await pool.query(
      `SELECT DISTINCT l.*
       FROM lessons l
       JOIN user_progress up ON up.lesson_id = l.id
       WHERE up.user_id = $1
       ORDER BY l.order_index ASC
       LIMIT $2`,
      [userId, limit]
    );
    return rows;
  },
};

module.exports = Lesson;
