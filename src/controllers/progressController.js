const UserStats    = require('../models/UserStats');
const UserProgress = require('../models/UserProgress');
const Lesson       = require('../models/Lesson');
const Exercise     = require('../models/Exercise');

const progressController = {
  /**
   * GET /progress
   * Full "Your Progress" page with stats and per-lesson breakdown.
   */
  async index(req, res, next) {
    try {
      const userId = req.session.user.id;

      const [userStats, summary, allLessons] = await Promise.all([
        UserStats.findByUser(userId),
        UserProgress.getSummary(userId),
        Lesson.findAll(),
      ]);

      // Attach completion data to each lesson
      for (const lesson of allLessons) {
        const total = await Exercise.countByLesson(lesson.id);
        const done  = await UserProgress.countCompletedByLesson(userId, lesson.id);
        lesson.totalExercises = total;
        lesson.completedExercises = done;
        lesson.progressPct = total > 0 ? Math.round((done / total) * 100) : 0;
      }

      const accuracy = summary.total_completed > 0
        ? Math.round((summary.total_correct / summary.total_completed) * 100)
        : 0;

      // Mastery percentage (overall)
      const totalExercises = allLessons.reduce((sum, l) => sum + l.totalExercises, 0);
      const totalCompleted = allLessons.reduce((sum, l) => sum + l.completedExercises, 0);
      const masteryPct = totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0;

      res.render('progress/index', {
        pageTitle:    'Your Progress',
        currentPage:  'progress',
        userStats,
        summary,
        accuracy,
        masteryPct,
        allLessons,
        recentLessons: await Lesson.findRecentByUser(userId),
      });

    } catch (err) {
      next(err);
    }
  },
};

module.exports = progressController;
