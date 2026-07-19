const helpController = {
  /**
   * GET /help
   * Help and FAQ page — WCAG 3.2.6: consistent help location.
   */
  index(req, res) {
    res.render('help/index', {
      pageTitle:   'Help and FAQ',
      currentPage: 'help',
      showSidebar: false,
    });
  },
};

module.exports = helpController;
