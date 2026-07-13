const { pool } = require('../config/database');

const UserStats = {
  /**
   * Get stats for a user, or return default values if none exist.
   */
  async findByUser(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM user_stats WHERE user_id = $1',
      [userId]
    );
    return rows[0] || null;
  },

  /**
   * Create initial stats row when a user registers.
   */
  async create(userId) {
    const { rows } = await pool.query(
      `INSERT INTO user_stats (user_id)
       VALUES ($1)
       RETURNING *`,
      [userId]
    );
    return rows[0];
  },

  /**
   * Add XP and update streak.
   */
  async addXP(userId, xp) {
    const today = new Date().toISOString().slice(0, 10);
    const { rows } = await pool.query(
      `UPDATE user_stats
       SET total_xp           = total_xp + $2,
           current_streak     = CASE
             WHEN last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN current_streak + 1
             WHEN last_activity_date = CURRENT_DATE THEN current_streak
             ELSE 1
           END,
           last_activity_date = CURRENT_DATE,
           updated_at         = NOW()
       WHERE user_id = $1
       RETURNING *`,
      [userId, xp]
    );
    return rows[0];
  },

  /**
   * Set assessment level result.
   */
  async setAssessmentLevel(userId, level) {
    const { rows } = await pool.query(
      `UPDATE user_stats
       SET assessment_level = $2, updated_at = NOW()
       WHERE user_id = $1
       RETURNING *`,
      [userId, level]
    );
    return rows[0];
  },
};

module.exports = UserStats;
