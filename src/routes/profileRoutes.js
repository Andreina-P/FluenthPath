const express = require('express');
const router  = express.Router();
const profile = require('../controllers/profileController');

router.get('/',            profile.index);
router.post('/update',     profile.update);
router.post('/password',   profile.changePassword);
router.post('/delete',     profile.deleteAccount);

module.exports = router;
