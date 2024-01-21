const usersService = require('../services/users');

exports.getUsers = (req, res) => {
   const users = usersService.getUsers();
   res.json({success: true, data: users});
};

exports.getUserById = (req, res) => {
   const user = usersService.getUserById(req.params.id);
   if (user) {
      res.json({success: true, data: user});
   } else {
      res.status(404).json({success: false, message: 'User not found for this id'});
   }
};

exports.addUser = (req, res) => {
   try {
      usersService.addUser(req.body.id, req.body.firstName, req.body.lastName);
      res.status(201).json({success: true, message: `User has been added`});
   } catch (e) {
      res.status(400).json({success: false, message: 'User has not been added', error: e.message});
   }
}

exports.deleteUserById = (req, res) => {
   usersService.deleteUserById(req.params.userId);
   res.json({success: true, message: 'User has been deleted'});
};