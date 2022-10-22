const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authLoginUserMiddleware');
const authLogin = require('../middlewares/authMiddleware');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();
const Upload = require('../middlewares/postImageUploadMiddleware');
const upload = new Upload();

router.post('/signup', auth, usersController.createUser);

router.post('/login', auth, usersController.login);

router
  .route('/users')
  .get(authLogin, usersController.getUser)
  .put(authLogin, usersController.updateUser);

router
  .route('/users/image')
//   .put(authLogin, upload.upload.UsersController.updateImage);

module.exports = router;
