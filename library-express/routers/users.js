const express = require('express'),
      router = express.Router(),
      loginController = require('../controllers/login');

router.post('/login', loginController.login);
router.post('/register', loginController.register);

module.exports = router;