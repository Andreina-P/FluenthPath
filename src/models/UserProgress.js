const { pool } = require('../config/database');

const UserProgress = {
  /**
   * Get all progress records for a user.
   */
  async findByUser(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM user_progress WHERE user_id = $1',
      [userId]
    );
    return rows;
  },

  /**
   * Get progress for a specific exercise.
   */
  async findByUserAndExercise(userId, exerciseId) {
    const { rows } = await pool.query(
      'SELECT * FROM user_progress WHERE user_id = $1 AND exercise_id = $2',
      [userId, exerciseId]
    );
    return rows[0] || null;
  },

  /**
   * Count completed exercises for a lesson.
   */
  async countCompletedByLesson(userId, lessonId) {
    const { rows } = await pool.query(
      `SELECT COUNT(*)::int AS done
       FROM user_progress
       WHERE user_id = $1 AND lesson_id = $2 AND completed = TRUE`,
      [userId, lessonId]
    );
    return rows[0].done;
  },

  /**
   * Record an exercise attempt (upsert).
   * Increments attempts, sets correct/completed on first correct answer.
   */
  async upsert(userId, exerciseId, lessonId, isCorrect) {
    const { rows } = await pool.query(
      `INSERT INTO user_progress (user_id, exercise_id, lesson_id, completed, correct, attempts, completed_at)
       VALUES ($1, $2, $3, $4, $4, 1, CASE WHEN $4 THEN NOW() ELSE NULL END)
       ON CONFLICT (user_id, exercise_id)
       DO UPDATE SET
         attempts     = user_progress.attempts + 1,
         correct      = user_progress.correct OR EXCLUDED.correct,
         completed    = user_progress.completed OR EXCLUDED.completed,
         completed_at = COALESCE(user_progress.completed_at, EXCLUDED.completed_at)
       RETURNING *`,
      [userId, exerciseId, lessonId, isCorrect]
    );
    return rows[0];
  },

  /**
   * Get summary stats for dashboard.
   * Returns total completed, total correct, lessons touched.
   */
  async getSummary(userId) {
    const { rows } = await pool.query(
      `SELECT
         COUNT(*)::int                                          AS total_attempted,
         COUNT(*) FILTER (WHERE completed = TRUE)::int          AS total_completed,
         COUNT(*) FILTER (WHERE correct = TRUE)::int            AS total_correct,
         COUNT(DISTINCT lesson_id)::int                         AS lessons_touched
       FROM user_progress
       WHERE user_id = $1`,
      [userId]
    );
    return rows[0];
  },
};

module.exports = UserProgress;
