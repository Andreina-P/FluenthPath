/**
 * setLocals — Inject shared data into every EJS template.
 * Runs on every request before routes.
 */
function setLocals(req, res, next) {
  // Current authenticated user (or null)
  res.locals.user = req.session.user || null;

  // Flash messages: consumed once and cleared
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;

  // Current page identifier for aria-current="page" in nav
  res.locals.currentPage = null;

  // Sidebar visibility (true by default for authenticated pages)
  res.locals.showSidebar = !!req.session.user;

  // Centered layout flag (for login, register, assessment)
  res.locals.centeredLayout = false;

  // Page title (each controller sets this)
  res.locals.pageTitle = '';

  next();
}

module.exports = setLocals;
