/**
 * requireAuth — Protect routes that need an authenticated user.
 * Redirects to /login and stores the intended destination in session
 * so the user lands there after logging in.
 */
function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect('/login');
}

module.exports = requireAuth;
