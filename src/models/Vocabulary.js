const { pool } = require('../config/database');

const Vocabulary = {
  /**
   * Get all vocabulary cards for a lesson, ordered by position.
   */
  async findByLesson(lessonId) {
    const { rows } = await pool.query(
      'SELECT * FROM vocabulary WHERE lesson_id = $1 ORDER BY order_index ASC',
      [lessonId]
    );
    return rows;
  },
};

module.exports = Vocabulary;
