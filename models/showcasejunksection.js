"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShowcaseJunkSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShowcaseJunkSection.belongsTo(models.Showcase, {
        foreignKey: "showcaseId",
        as: "showcase",
      });
      ShowcaseJunkSection.belongsTo(models.Section, {
        foreignKey: "sectionId",
        as: "section",
      });
    }
  }
  ShowcaseJunkSection.init(
    {
      showcaseId: DataTypes.INTEGER,
      sectionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ShowcaseJunkSection",
    }
  );
  return ShowcaseJunkSection;
};
