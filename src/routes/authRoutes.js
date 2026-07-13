const express = require('express');
const router  = express.Router();
const auth    = require('../controllers/authController');

router.get('/register', auth.showRegister);
router.post('/register', auth.registerValidation, auth.register);

router.get('/login', auth.showLogin);
router.post('/login', auth.loginValidation, auth.login);

router.post('/logout', auth.logout);

module.exports = router;
