"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShowcaseType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShowcaseType.hasMany(models.Showcase, {
        foreignkey: "showcaseTypeId",
        as: "showcase",
      });
    }
  }
  ShowcaseType.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ShowcaseType",
    }
  );
  return ShowcaseType;
};
