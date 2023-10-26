const router = require('express').Router()
const usersController = require('../controllers/users')

router.get('/', usersController.findAll)
router.post('/', usersController.addUser)
router.get('/:name', usersController.findByName)

module.exports = router