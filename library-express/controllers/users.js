const express = require('express'),
      router = express.Router();

const usersService = require('../services/users');

router.get('/', async (req, res) => {
   const users = await usersService.getUsers();
   res.json({success: true, data: users});
});

router.get('/:id', (req, res) => {
   const user = usersService.getUserById(req.params.id);
   if (user) {
      res.json({success: true, data: user});
   } else {
      res.status(404).json({success: false, message: 'User not found for this id'});
   }
});

router.post('/', (req, res) => {
   try {
      usersService.addUser(req.body.id, req.body.firstName, req.body.lastName);
      res.status(201).json({success: true, message: `User has been added`});
   } catch (e) {
      res.status(400).json({success: false, message: 'User has not been added', error: e.message});
   }
});

router.delete('/:userId', (req, res) => {
   usersService.deleteUserById(req.params.userId);
   res.json({success: true, message: 'User has been deleted'});
});

module.exports = router;