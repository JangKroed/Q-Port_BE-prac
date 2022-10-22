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
}

module.exports = UsersRepository;
