const express    = require('express');
const router     = express.Router();
const assessment = require('../controllers/assessmentController');

router.get('/',          assessment.settings);
router.post('/start',    assessment.start);
router.get('/question',  assessment.question);
router.post('/submit',   assessment.submit);
router.get('/results',   assessment.results);
router.get('/retake',    assessment.retake);

module.exports = router;
