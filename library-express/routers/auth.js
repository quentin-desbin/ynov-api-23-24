const router = require('express').Router(),
      authController = require('../controllers/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;