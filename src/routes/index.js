const express     = require('express');
const router      = express.Router();
const requireAuth = require('../middleware/requireAuth');

/* ── Public routes ───────────────────────────────────── */
const authRoutes = require('./authRoutes');
router.use('/', authRoutes);

/* ── Protected routes ────────────────────────────────── */
const dashboardRoutes   = require('./dashboardRoutes');
const lessonRoutes      = require('./lessonRoutes');
const exerciseRoutes    = require('./exerciseRoutes');
const assessmentRoutes  = require('./assessmentRoutes');
const progressRoutes    = require('./progressRoutes');
const onboardingRoutes  = require('./onboardingRoutes');

router.use('/dashboard',  requireAuth, dashboardRoutes);
router.use('/lessons',    requireAuth, lessonRoutes);
router.use('/exercises',  requireAuth, exerciseRoutes);
router.use('/assessment', requireAuth, assessmentRoutes);
router.use('/progress',   requireAuth, progressRoutes);
router.use('/onboarding', requireAuth, onboardingRoutes);

/* ── Root redirect ───────────────────────────────────── */
router.get('/', (req, res) => {
  if (req.session && req.session.user) {
    // If first login and onboarding not seen, redirect to onboarding
    if (!req.session.onboardingSeen) {
      return res.redirect('/onboarding/1');
    }
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

/* ── 404 fallthrough ─────────────────────────────────── */
router.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

module.exports = router;
