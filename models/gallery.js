"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gallery.belongsTo(models.Showcase, {
        foreignKey: "showcaseId",
        as: "showcase",
      });
    }
  }
  Gallery.init(
    {
      title: DataTypes.STRING,
      picture: DataTypes.STRING,
      showcaseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Gallery",
    }
  );
  return Gallery;
};
