const UsersRepository = require('../repositories/users.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UsersService {
  usersRepository = new UsersRepository();

  createUser = async (user) => {
    const { email, nickname, password } = user;

    const existUser = await this.usersRepository.findByUser({
      email,
      nickname,
    });

    if (existUser) throw new Error('이메일 또는 닉네임이 중복됩니다..');
    const num = (Math.ceil(Math.random() * 12) + '').padStart(2, '0');

    await this.usersRepository.createUser({
      email,
      nickname,
      password,
      avatar: `http://spartacodingclub.shop/static/images/rtans/SpartaIcon${num}.png`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;
    const nickname = null;
    const userData = await this.usersRepository.findByUser({ email, nickname });
    if (!userData) throw new Error('이메일 또는 패스워드를 확인해주세요.');
    const isEqualPw = await bcrypt.compare(password, userData.password);
    if (!isEqualPw) throw new Error('이메일 또는 패스워드를 확인해주세요');

    const token = jwt.sign(
      { userId: userData.userId, nickname: userData.nickname },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    return token;
  };

  // getUser = async (req, res, next) => {
  //   const { email } = res.locals.user;
  //   const nickname = null;
  //   const userData = await this.usersRepository.findByUser({ email, nickname });

  //   return userData;
  // };

  updateUser = async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;
    const nickname = null;
    const userData = await this.usersRepository.findByUser({ email, nickname });

    const isEqualPw = await bcrypt.compare(oldPassword, userData.password);
    if (isEqualPw) throw new Error('이전 비밀번호가 동일합니다.');

    const password = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT_ROUND)
    );

    await this.usersRepository.updateUser({ email, password });
  };

  updateImage = async (userId, imageFileName) => {
    if (!imageFileName) throw new Error('게시물 이미지가 빈 값');

    const updateImageData = await this.usersRepository.updateImage(
      userId,
      process.env.S3_STORAGE_URL + imageFileName
    );

    return updateImageData;
  };
}

module.exports = UsersService;
