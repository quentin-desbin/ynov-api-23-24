const express = require('express'),
      router = express.Router(),
      usersController = require('../controllers/users');

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.addUser);
router.delete('/:id', usersController.deleteUserById);

module.exports = router;