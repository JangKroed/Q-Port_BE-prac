const { User } = require('../models');
const { Op } = require('sequelize');

class UsersRepository {
  constructor() {
    this.User = User;
  }

  createUser = async ({ email, nickname, password }) => {
    await this.User.create({
      email,
      nickname,
      password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  findByUser = async ({ email, nickname }) => {
    const userData = await this.User.findOne({
      where: {
        [Op.or]: [{ email }, { nickname }],
      },
    });

    return userData;
  };

  updateUser = async ({ email, password }) => {
    await this.User.update(
      { password, updatedAt: Date.now() },
      { where: { email } }
    );
  };

  updateImage = (req, res, next) => {};
}

module.exports = UsersRepository;
