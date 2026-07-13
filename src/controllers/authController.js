const bcrypt = require('bcryptjs');
const { validationResult, body } = require('express-validator');
const User      = require('../models/User');
const UserStats = require('../models/UserStats');

/* ── Validation rules ──────────────────────────────────────── */

/**
 * WCAG 3.3.2: Labels or instructions — validation messages describe
 * the exact problem and how to fix it (WCAG 3.3.3).
 *
 * WCAG 3.3.8: No CAPTCHA or cognitive test — just email + password.
 */
const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must be 100 characters or fewer.'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please enter a valid email address (e.g. name@example.com).'),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
  body('password_confirm')
    .notEmpty().withMessage('Please confirm your password.')
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
];

const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please enter a valid email address.'),
  body('password')
    .notEmpty().withMessage('Password is required.'),
];

/* ── Controllers ───────────────────────────────────────────── */

const authController = {
  /**
   * GET /register — Show registration form.
   */
  showRegister(req, res) {
    if (req.session.user) return res.redirect('/dashboard');

    res.render('auth/register', {
      pageTitle:      'Create your account',
      centeredLayout: true,
      showSidebar:    false,
      errors:         [],
      formData:       {},
    });
  },

  /**
   * Validation middleware array for register.
   */
  registerValidation: registerRules,

  /**
   * POST /register — Process registration.
   * PRG pattern: always redirects, never re-renders on POST success.
   */
  async register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Re-render form with errors and preserved input
      // WCAG 3.3.7: Don't clear fields the user already filled correctly
      return res.status(422).render('auth/register', {
        pageTitle:      'Create your account',
        centeredLayout: true,
        showSidebar:    false,
        errors:         errors.array(),
        formData:       req.body,
      });
    }

    try {
      const { name, email, password } = req.body;

      // Check if email already taken
      const existing = await User.findByEmail(email);
      if (existing) {
        return res.status(422).render('auth/register', {
          pageTitle:      'Create your account',
          centeredLayout: true,
          showSidebar:    false,
          errors:         [{ msg: 'An account with this email already exists. Please log in instead.' }],
          formData:       req.body,
        });
      }

      // Hash password
      const hash = await bcrypt.hash(password, 12);

      // Create user
      const user = await User.create(name, email, hash);

      // Create initial stats row
      await UserStats.create(user.id);

      // Set session
      req.session.user = { id: user.id, name: user.name, email: user.email };

      // Flash success + redirect (PRG)
      req.session.flash = {
        type:    'success',
        message: `Welcome to FluentPath, ${user.name}! Your account has been created.`,
      };

      const returnTo = req.session.returnTo || '/dashboard';
      delete req.session.returnTo;
      res.redirect(returnTo);

    } catch (err) {
      console.error('Register error:', err);
      req.session.flash = { type: 'error', message: 'Something went wrong. Please try again.' };
      res.redirect('/register');
    }
  },

  /**
   * GET /login — Show login form.
   */
  showLogin(req, res) {
    if (req.session.user) return res.redirect('/dashboard');

    res.render('auth/login', {
      pageTitle:      'Log in',
      centeredLayout: true,
      showSidebar:    false,
      errors:         [],
      formData:       {},
    });
  },

  /**
   * Validation middleware array for login.
   */
  loginValidation: loginRules,

  /**
   * POST /login — Process login.
   */
  async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('auth/login', {
        pageTitle:      'Log in',
        centeredLayout: true,
        showSidebar:    false,
        errors:         errors.array(),
        formData:       req.body,
      });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        // Generic message — don't reveal whether the email exists (security)
        // WCAG 3.3.1: Error clearly identified in text
        return res.status(422).render('auth/login', {
          pageTitle:      'Log in',
          centeredLayout: true,
          showSidebar:    false,
          errors:         [{ msg: 'Incorrect email or password. Please try again.' }],
          formData:       { email: req.body.email },
        });
      }

      // Set session
      req.session.user = { id: user.id, name: user.name, email: user.email };

      // Redirect to intended page or dashboard
      const returnTo = req.session.returnTo || '/dashboard';
      delete req.session.returnTo;
      res.redirect(returnTo);

    } catch (err) {
      console.error('Login error:', err);
      req.session.flash = { type: 'error', message: 'Something went wrong. Please try again.' };
      res.redirect('/login');
    }
  },

  /**
   * POST /logout — Destroy session and redirect.
   */
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) console.error('Logout error:', err);
      res.redirect('/login');
    });
  },
};

module.exports = authController;
