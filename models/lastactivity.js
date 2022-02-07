"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LastActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LastActivity.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  LastActivity.init(
    {
      userId: DataTypes.INTEGER,
      submmitted : DataTypes.DATE,
      time_login: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LastActivity",
    }
  );
  return LastActivity;
};
