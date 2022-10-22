const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authLoginUserMiddleware');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/signup', Auth, usersController.createUser);

router.post('/login', Auth, usersController.login);

module.exports = router;
