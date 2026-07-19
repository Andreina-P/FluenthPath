const UserStats    = require('../models/UserStats');
const UserProgress = require('../models/UserProgress');
const Lesson       = require('../models/Lesson');

const dashboardController = {
  /**
   * GET /dashboard
   * Main dashboard: progress summary, skill breakdown, recent lessons.
   */
  async index(req, res, next) {
    try {
      const userId = req.session.user.id;

      const [userStats, summary, recentLessons, allLessons] = await Promise.all([
        UserStats.findByUser(userId),
        UserProgress.getSummary(userId),
        Lesson.findRecentByUser(userId),
        Lesson.findAll(),
      ]);

      // Calculate accuracy percentage
      const accuracy = summary.total_completed > 0
        ? Math.round((summary.total_correct / summary.total_completed) * 100)
        : 0;

      const dailyExercises = await UserProgress.countCompletedToday(userId);

      // Calculate real skill percentages
      const skillPcts = await UserProgress.getSkillPercentages(userId);

      res.render('dashboard/index', {
        pageTitle:      'Dashboard',
        currentPage:    'dashboard',
        userStats,
        summary,
        accuracy,
        recentLessons,
        allLessons,
        skillPcts,
        dailyExercises,
      });

    } catch (err) {
      next(err);
    }
  },
};

module.exports = dashboardController;
