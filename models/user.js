"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Appointment, {
        foreignKey: "userId",
        as: "appointment",
      });
      User.hasMany(models.Project, {
        foreignKey: "userId",
        as: "project",
      });
      User.hasMany(models.Favorite, {
        foreignKey: "userId",
        as: "favorite",
      });
      User.hasOne(models.LastActivity, {
        foreignKey: "userId",
        as: "lastActivity",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      picture: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
