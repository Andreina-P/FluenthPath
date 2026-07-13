const express    = require('express');
const router     = express.Router();
const onboarding = require('../controllers/onboardingController');

router.get('/:step',     onboarding.step);
router.post('/complete', onboarding.complete);

module.exports = router;
