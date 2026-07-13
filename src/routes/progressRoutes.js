const express  = require('express');
const router   = express.Router();
const progress = require('../controllers/progressController');

router.get('/', progress.index);

module.exports = router;
