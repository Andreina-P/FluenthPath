const Lesson     = require('../models/Lesson');
const UserStats  = require('../models/UserStats');
const Vocabulary = require('../models/Vocabulary');

const vocabularyController = {
  /**
   * GET /lessons/:id/vocabulary
   * Static vocabulary cards for a lesson — always visible, no hover.
   */
  async index(req, res, next) {
    try {
      const lesson = await Lesson.findById(req.params.id);

      if (!lesson) {
        const err = new Error('Lesson not found');
        err.status = 404;
        return next(err);
      }

      const words = await Vocabulary.findByLesson(lesson.id);

      res.render('vocabulary/index', {
        pageTitle:    `Vocabulary: ${lesson.title}`,
        currentPage:  'lessons',
        lesson,
        words,
        userStats: await UserStats.findByUser(req.session.user.id),
        recentLessons: await Lesson.findRecentByUser(req.session.user.id),
      });

    } catch (err) {
      next(err);
    }
  },
};

module.exports = vocabularyController;
