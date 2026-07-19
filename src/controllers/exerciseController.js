const Exercise     = require('../models/Exercise');
const Lesson       = require('../models/Lesson');
const UserProgress = require('../models/UserProgress');
const UserStats    = require('../models/UserStats');

/**
 * Map exercise type to its EJS view filename.
 */
const viewMap = {
  multiple_choice: 'exercises/multiple-choice',
  translate:       'exercises/translate',
  listening:       'exercises/listening',
  word_bank:       'exercises/word-bank',
  speaking:        'exercises/speaking',
  reading:         'exercises/reading',
};

const exerciseController = {
  /**
   * GET /exercises/:id
   * Render the correct exercise view based on type.
   */
  async show(req, res, next) {
    try {
      const exercise = await Exercise.findById(req.params.id);

      if (!exercise) {
        const err = new Error('Exercise not found');
        err.status = 404;
        return next(err);
      }

      const lesson = exercise.lesson_id
        ? await Lesson.findById(exercise.lesson_id)
        : null;

      // Get all exercises in this lesson for session progress
      let sessionExercises = [];
      let currentIndex = 0;
      if (lesson) {
        sessionExercises = await Exercise.findByLesson(lesson.id);
        currentIndex = sessionExercises.findIndex(e => e.id === exercise.id);
      }

      const view = viewMap[exercise.type];
      if (!view) {
        const err = new Error('Unknown exercise type');
        err.status = 404;
        return next(err);
      }

      // Parse JSON fields
      if (exercise.options && typeof exercise.options === 'string') {
        exercise.options = JSON.parse(exercise.options);
      }
      if (exercise.word_bank_items && typeof exercise.word_bank_items === 'string') {
        exercise.word_bank_items = JSON.parse(exercise.word_bank_items);
      }

      const userId = req.session.user.id;
      const userStats = await UserStats.findByUser(userId);
      const dailyExercises = await UserProgress.countCompletedToday(userId);

      res.render(view, {
        pageTitle:     lesson ? `Exercise: ${lesson.title}` : 'Exercise',
        currentPage:   'lessons',
        exercise,
        lesson,
        sessionTotal:  sessionExercises.length,
        sessionCurrent: currentIndex + 1,
        userStats,
        dailyExercises,
        recentLessons: lesson
          ? await Lesson.findRecentByUser(userId)
          : [],
      });

    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /exercises/:id/submit
   * Evaluate the answer and redirect to feedback (PRG pattern).
   */
  async submit(req, res, next) {
    try {
      const userId   = req.session.user.id;
      const exercise = await Exercise.findById(req.params.id);

      if (!exercise) {
        const err = new Error('Exercise not found');
        err.status = 404;
        return next(err);
      }

      // Normalize helper: strip punctuation, collapse spaces, lowercase
      const normalize = (s) => (s || '').trim().toLowerCase()
        .replace(/[^\p{L}\p{N} ]/gu, '').replace(/ +/g, ' ');

      const userAnswer = normalize(req.body.answer);

      // Speaking and reading exercises are always marked as completed
      let isCorrect;
      if (exercise.type === 'speaking' || exercise.type === 'reading') {
        isCorrect = true;
      } else {
        // Split BEFORE normalizing — pipe "|" separates valid answers
        const rawCorrect = (exercise.correct_answer || '');
        const validAnswers = rawCorrect.includes('|')
          ? rawCorrect.split('|').map(a => normalize(a))
          : [normalize(rawCorrect)];
        isCorrect = validAnswers.includes(userAnswer);
      }

      // Record progress
      await UserProgress.upsert(
        userId,
        exercise.id,
        exercise.lesson_id,
        isCorrect
      );

      // Award XP
      const xp = isCorrect ? 15 : 5; // 5 XP just for trying
      await UserStats.addXP(userId, xp);

      // Store feedback data in session for the feedback page
      req.session.exerciseFeedback = {
        exerciseId:   exercise.id,
        isCorrect,
        userAnswer:   req.body.answer || '',
        correctAnswer: exercise.correct_answer,
        proTip:       exercise.pro_tip,
        xpEarned:     xp,
        lessonId:     exercise.lesson_id,
      };

      // PRG: redirect to feedback page
      res.redirect(`/exercises/${exercise.id}/feedback`);

    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /exercises/:id/feedback
   * Full feedback page — NOT a modal.
   * WCAG 2.1.2: No focus trap risk (it's a real page).
   * WCAG 2.4.2: Own <title> so NVDA announces it on load.
   * WCAG 4.1.3: Focus moves to h2 via data-autofocus.
   */
  async feedback(req, res, next) {
    try {
      const fb = req.session.exerciseFeedback;

      if (!fb || fb.exerciseId !== parseInt(req.params.id)) {
        return res.redirect(`/exercises/${req.params.id}`);
      }

      const exercise = await Exercise.findById(fb.exerciseId);
      const lesson   = fb.lessonId ? await Lesson.findById(fb.lessonId) : null;

      // Find next exercise in lesson
      let nextExerciseId = null;
      if (lesson) {
        const exercises = await Exercise.findByLesson(lesson.id);
        const idx = exercises.findIndex(e => e.id === exercise.id);
        if (idx >= 0 && idx < exercises.length - 1) {
          nextExerciseId = exercises[idx + 1].id;
        }
      }

      // Get updated stats for display
      const userStats = await UserStats.findByUser(req.session.user.id);

      // Clear feedback from session (consumed)
      delete req.session.exerciseFeedback;

      // Find comprehension questions if this is a reading exercise
      let comprehensionIds = [];
      if (exercise && exercise.type === 'reading') {
        const children = await Exercise.findByParent(exercise.id);
        comprehensionIds = children.map(c => c.id);
      }

      res.render('exercises/feedback', {
        comprehensionIds,
        pageTitle:      fb.isCorrect ? 'Correct!' : 'Not Quite There',
        currentPage:    'lessons',
        showSidebar:    false,
        centeredLayout: true,
        isCorrect:     fb.isCorrect,
        userAnswer:    fb.userAnswer,
        correctAnswer: fb.correctAnswer,
        proTip:        fb.proTip,
        xpEarned:      fb.xpEarned,
        exercise,
        lesson,
        nextExerciseId,
        userStats,
      });

    } catch (err) {
      next(err);
    }
  },
};

module.exports = exerciseController;
