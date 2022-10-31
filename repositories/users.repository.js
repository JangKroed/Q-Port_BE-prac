const { User } = require('../models');
const { Op } = require('sequelize');

class UsersRepository {
  constructor() {
    this.User = User;
  }

  createUser = async (user) => {
    await this.User.create(user);
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

  updateImage = async (userId, avatar) => {
    await this.User.update(
      {
        avatar,
      },
      {
        where: { userId },
      }
    );
    return await this.User.findByPk(userId);
  };
}

module.exports = UsersRepository;
