const onboardingController = {
  /**
   * GET /onboarding/:step
   * Render onboarding step 1, 2, or 3.
   * Shown once after first registration — controlled by session flag.
   */
  step(req, res, next) {
    const stepNum = parseInt(req.params.step);

    if (isNaN(stepNum) || stepNum < 1 || stepNum > 5) {
      return res.redirect('/onboarding/1');
    }

    res.render(`onboarding/step-${stepNum}`, {
      pageTitle:      `Welcome to FluentPath — Step ${stepNum} of 5`,
      currentPage:    null,
      showSidebar:    false,
      centeredLayout: true,
      stepNum,
    });
  },

  /**
   * POST /onboarding/complete
   * Mark onboarding as seen and redirect to dashboard.
   */
  complete(req, res) {
    req.session.onboardingSeen = true;
    res.redirect('/dashboard');
  },
};

module.exports = onboardingController;
