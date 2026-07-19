const Lesson       = require('../models/Lesson');
const UserStats    = require('../models/UserStats');
const Exercise     = require('../models/Exercise');
const UserProgress = require('../models/UserProgress');

const lessonController = {
  /**
   * GET /lessons
   * List all lessons grouped by level.
   */
  async index(req, res, next) {
    try {
      const userId  = req.session.user.id;
      const lessons = await Lesson.findAll();

      // Attach completion count to each lesson
      for (const lesson of lessons) {
        const total = await Exercise.countByLesson(lesson.id);
        const done  = await UserProgress.countCompletedByLesson(userId, lesson.id);
        lesson.totalExercises = total;
        lesson.completedExercises = done;
        lesson.progressPct = total > 0 ? Math.round((done / total) * 100) : 0;
      }

      // Group by level
      const grouped = {};
      for (const lesson of lessons) {
        if (!grouped[lesson.level]) grouped[lesson.level] = [];
        grouped[lesson.level].push(lesson);
      }

      const userStats = await UserStats.findByUser(userId);
      const dailyExercises = await UserProgress.countCompletedToday(userId);

      res.render('lessons/index', {
        pageTitle:    'Lessons',
        currentPage:  'lessons',
        grouped,
        userStats,
        dailyExercises,
        recentLessons: await Lesson.findRecentByUser(userId),
      });

    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /lessons/:id
   * Lesson detail: description, exercise list, vocabulary link.
   */
  async show(req, res, next) {
    try {
      const userId = req.session.user.id;
      const lesson = await Lesson.findById(req.params.id);

      if (!lesson) {
        const err = new Error('Lesson not found');
        err.status = 404;
        return next(err);
      }

      const exercises = await Exercise.findByLesson(lesson.id);

      // Attach completion status per exercise
      for (const ex of exercises) {
        const progress = await UserProgress.findByUserAndExercise(userId, ex.id);
        ex.completed = progress ? progress.completed : false;
        ex.correct   = progress ? progress.correct : false;
      }

      const totalEx    = exercises.length;
      const completedEx = exercises.filter(e => e.completed).length;

      const userStats = await UserStats.findByUser(userId);
      const dailyExercises = await UserProgress.countCompletedToday(userId);

      res.render('lessons/show', {
        pageTitle:    lesson.title,
        currentPage:  'lessons',
        lesson,
        exercises,
        totalEx,
        completedEx,
        userStats,
        dailyExercises,
        recentLessons: await Lesson.findRecentByUser(userId),
      });

    } catch (err) {
      next(err);
    }
  },
};

module.exports = lessonController;
