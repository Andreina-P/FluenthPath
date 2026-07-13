/**
 * errorHandler — Centralised Express error handler.
 * Must have 4 arguments for Express to treat it as an error handler.
 */
function errorHandler(err, req, res, next) {  // eslint-disable-line no-unused-vars
  console.error(err.stack);

  const status = err.status || 500;

  // For 404 errors thrown from routes
  if (status === 404) {
    return res.status(404).render('errors/404', {
      pageTitle:      'Page not found',
      centeredLayout: true,
      showSidebar:    false,
    });
  }

  res.status(status).render('errors/500', {
    pageTitle:      'Something went wrong',
    centeredLayout: true,
    showSidebar:    false,
  });
}

module.exports = errorHandler;
