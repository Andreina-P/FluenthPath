const Exercise  = require('../models/Exercise');
const UserStats = require('../models/UserStats');

const assessmentController = {
  /**
   * GET /assessment
   * Timer settings screen — WCAG 2.2.1: user can disable/adjust timer.
   */
  async settings(req, res, next) {
    try {
      const userStats = await UserStats.findByUser(req.session.user.id);

      // If already assessed AND not retaking, show result instead
      if (userStats && userStats.assessment_level && !req.session.retakingAssessment) {
        return res.redirect('/assessment/results');
      }

      res.render('assessment/settings', {
        pageTitle:      'Level Assessment — Settings',
        currentPage:    null,
        showSidebar:    false,
        centeredLayout: true,
      });

    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /assessment/start
   * Store timer config in session and redirect to first question.
   */
  async start(req, res, next) {
    try {
      const timerOption = req.body.timer || 'none';

      // Load all assessment exercises
      const questions = await Exercise.findAssessment();

      if (questions.length === 0) {
        req.session.flash = { type: 'error', message: 'No assessment questions available.' };
        return res.redirect('/dashboard');
      }

      // Store assessment state in session
      req.session.assessment = {
        timer:       timerOption,     // 'none', 'standard', 'extended'
        questionIds: questions.map(q => q.id),
        currentIdx:  0,
        correct:     0,
        total:       questions.length,
        startedAt:   Date.now(),
      };

      res.redirect('/assessment/question');

    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /assessment/question
   * Render the current assessment question.
   */
  async question(req, res, next) {
    try {
      const state = req.session.assessment;

      if (!state) return res.redirect('/assessment');

      const questionId = state.questionIds[state.currentIdx];
      const exercise   = await Exercise.findById(questionId);

      if (!exercise) return res.redirect('/assessment');

      // Parse options
      if (exercise.options && typeof exercise.options === 'string') {
        exercise.options = JSON.parse(exercise.options);
      }

      // Timer calculation
      let timerSeconds = null;
      if (state.timer === 'standard') {
        timerSeconds = 15 * 60; // 15 minutes
      } else if (state.timer === 'extended') {
        timerSeconds = 30 * 60; // 30 minutes
      }
      // 'none' = null = no timer displayed

      let elapsedSeconds = 0;
      if (timerSeconds) {
        elapsedSeconds = Math.floor((Date.now() - state.startedAt) / 1000);
      }

      const remainingSeconds = timerSeconds ? Math.max(0, timerSeconds - elapsedSeconds) : null;

      res.render('assessment/question', {
        pageTitle:      `Question ${state.currentIdx + 1} of ${state.total}`,
        currentPage:    null,
        showSidebar:    false,
        centeredLayout: false,
        exercise,
        questionNum:    state.currentIdx + 1,
        totalQuestions: state.total,
        remainingSeconds,
        timerEnabled:   state.timer !== 'none',
      });

    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /assessment/submit
   * Evaluate answer, advance to next question or results.
   */
  async submit(req, res, next) {
    try {
      const state = req.session.assessment;

      if (!state) return res.redirect('/assessment');

      const questionId = state.questionIds[state.currentIdx];
      const exercise   = await Exercise.findById(questionId);

      if (!exercise) return res.redirect('/assessment');

      // Check answer
      const userAnswer = (req.body.answer || '').trim().toLowerCase();
      const correct    = exercise.correct_answer.trim().toLowerCase();

      if (userAnswer === correct) {
        state.correct++;
      }

      state.currentIdx++;
      req.session.assessment = state;

      // More questions?
      if (state.currentIdx < state.total) {
        return res.redirect('/assessment/question');
      }

      // Assessment complete — determine level
      const score = state.correct / state.total;
      let level;
      if (score >= 0.8)      level = 'conversational';
      else if (score >= 0.5) level = 'elementary';
      else                   level = 'beginner';

      // Save to database
      await UserStats.setAssessmentLevel(req.session.user.id, level);

      // Store results in session for display
      req.session.assessmentResults = {
        correct: state.correct,
        total:   state.total,
        level,
        score:   Math.round(score * 100),
      };

      // Clean up
      delete req.session.assessment;
      delete req.session.retakingAssessment;

      res.redirect('/assessment/results');

    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /assessment/results
   * Show assigned level.
   */
  async results(req, res, next) {
    try {
      const results   = req.session.assessmentResults || null;
      const userStats = await UserStats.findByUser(req.session.user.id);

      // Clear from session (consumed)
      delete req.session.assessmentResults;

      res.render('assessment/results', {
        pageTitle:      'Assessment Results',
        currentPage:    null,
        showSidebar:    false,
        centeredLayout: true,
        results,
        assessmentLevel: userStats ? userStats.assessment_level : null,
      });

    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /assessment/retake
   * Reset assessment level and redirect to settings.
   */
  async retake(req, res, next) {
    try {
      // Don't delete the level yet — only set a flag.
      // Level is updated only when the user completes the new assessment.
      // If they cancel, their old level stays intact.
      req.session.retakingAssessment = true;
      req.session.flash = { type: 'info', message: 'You can retake the assessment now. Your current level will be kept until you finish.' };
      res.redirect('/assessment');
    } catch (err) {
      next(err);
    }
  },
};

module.exports = assessmentController;
