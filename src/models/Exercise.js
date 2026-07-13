const { pool } = require('../config/database');

const Exercise = {
  /**
   * Get all exercises for a lesson, ordered by position.
   */
  async findByLesson(lessonId) {
    const { rows } = await pool.query(
      'SELECT * FROM exercises WHERE lesson_id = $1 ORDER BY order_index ASC',
      [lessonId]
    );
    return rows;
  },

  /**
   * Get a single exercise by ID.
   */
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM exercises WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Get all assessment exercises (lesson_id IS NULL, type = 'assessment').
   */
  async findAssessment() {
    const { rows } = await pool.query(
      `SELECT * FROM exercises
       WHERE type = 'assessment'
       ORDER BY order_index ASC`
    );
    return rows;
  },

  /**
   * Count exercises in a lesson (for progress display).
   */
  async countByLesson(lessonId) {
    const { rows } = await pool.query(
      'SELECT COUNT(*)::int AS total FROM exercises WHERE lesson_id = $1',
      [lessonId]
    );
    return rows[0].total;
  },
};

module.exports = Exercise;
