const express = require('express');
const router  = express.Router();
const help    = require('../controllers/helpController');

router.get('/', help.index);

module.exports = router;
