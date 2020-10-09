const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const userController = require('../controllers/user');

router.post('/users', userController.createUser);
router.post('/users/login', userController.login);
router.post('/users/logout', auth, userController.logout);

module.exports = router; 