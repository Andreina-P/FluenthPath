const express  = require('express');
const router   = express.Router();
const exercise = require('../controllers/exerciseController');

router.get('/:id',          exercise.show);
router.post('/:id/submit',  exercise.submit);
router.get('/:id/feedback', exercise.feedback);

module.exports = router;
