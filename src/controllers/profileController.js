const bcrypt = require('bcryptjs');
const User   = require('../models/User');

const profileController = {
  /**
   * GET /profile
   * Show profile editing form.
   */
  async index(req, res, next) {
    try {
      const user = await User.findById(req.session.user.id);

      res.render('profile/index', {
        pageTitle:   'Your Profile',
        currentPage: 'profile',
        showSidebar: false,
        centeredLayout: false,
        profileUser: user,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /profile/update
   * Update name and/or email.
   */
  async update(req, res, next) {
    try {
      const userId = req.session.user.id;
      const { name, email } = req.body;

      // Check if email is taken by another user
      if (email) {
        const existing = await User.findByEmail(email);
        if (existing && existing.id !== userId) {
          req.session.flash = { type: 'error', message: 'That email address is already in use by another account.' };
          return res.redirect('/profile');
        }
      }

      await User.update(userId, name, email);

      // Update session data
      req.session.user.name = name;
      req.session.user.email = email;

      req.session.flash = { type: 'success', message: 'Your profile has been updated.' };
      res.redirect('/profile');
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /profile/password
   * Change password.
   */
  async changePassword(req, res, next) {
    try {
      const userId = req.session.user.id;
      const { currentPassword, newPassword, confirmPassword } = req.body;

      // Validate
      if (!currentPassword || !newPassword || !confirmPassword) {
        req.session.flash = { type: 'error', message: 'All password fields are required.' };
        return res.redirect('/profile');
      }

      if (newPassword.length < 8) {
        req.session.flash = { type: 'error', message: 'New password must be at least 8 characters.' };
        return res.redirect('/profile');
      }

      if (newPassword !== confirmPassword) {
        req.session.flash = { type: 'error', message: 'New password and confirmation do not match.' };
        return res.redirect('/profile');
      }

      // Verify current password
      // Uses findByIdWithPassword (not findById) because this is the one
      // legitimate case in the app that needs the password_hash.
      const user = await User.findByIdWithPassword(userId);
      const valid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!valid) {
        req.session.flash = { type: 'error', message: 'Current password is incorrect.' };
        return res.redirect('/profile');
      }

      // Hash and save new password
      const hash = await bcrypt.hash(newPassword, 10);
      await User.updatePassword(userId, hash);

      req.session.flash = { type: 'success', message: 'Your password has been changed.' };
      res.redirect('/profile');
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /profile/delete
   * Delete account permanently.
   */
  async deleteAccount(req, res, next) {
    try {
      const userId = req.session.user.id;
      const { confirmDelete } = req.body;

      if (confirmDelete !== 'DELETE') {
        req.session.flash = { type: 'error', message: 'Please type DELETE to confirm account deletion.' };
        return res.redirect('/profile');
      }

      await User.deleteById(userId);

      req.session.destroy(() => {
        res.redirect('/login');
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = profileController;
