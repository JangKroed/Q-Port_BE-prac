const UsersService = require('../services/users.service');
const bcrypt = require('bcrypt');
require('dotenv').config();

class UsersController {
  usersService = new UsersService();

  createUser = async (req, res, next) => {
    try {
      const { email, nickname, password } = req.body;

      const hashed = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUND)
      );
      const user = Object.create({ email, nickname, password: hashed });

      await this.usersService.createUser(user);

      res
        .status(200)
        .send({ ok: true, message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await this.usersService.login(req, res);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);
      res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
        expires: expires,
      });

      res.status(200).send({ ok: true, token: token });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  getUser = async (req, res, next) => {
    try {
      // const userData = await this.usersService.getUser(req, res);
      res.status(200).json({ data: res.locals.user });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  updateUser = async (req, res, next) => {
    try {
      await this.usersService.updateUser(req, res);
      res
        .status(200)
        .send({ ok: true, message: '회원 정보가 수정되었습니다.' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  updateImage = async (req, res, next) => {
    try {
      res.status(200);
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };
}

module.exports = UsersController;
