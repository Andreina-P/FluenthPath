const express    = require('express');
const router     = express.Router();
const lesson     = require('../controllers/lessonController');
const vocabulary = require('../controllers/vocabularyController');

router.get('/',              lesson.index);
router.get('/:id',           lesson.show);
router.get('/:id/vocabulary', vocabulary.index);

module.exports = router;
