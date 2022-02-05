"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShowcaseJunkProjectType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShowcaseJunkProjectType.belongsToMany(models.Showcase, {
        foreignkey: "showcaseId",
        as: "showcase",
      });
      ShowcaseJunkProjectType.belongsToMany(models.ProjectType, {
        foreignkey: "projectTypeId",
        as: "projectType",
      });
    }
  }
  ShowcaseJunkProjectType.init(
    {
      showcaseId: DataTypes.INTEGER,
      projectTypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ShowcaseJunkProjectType",
    }
  );
  return ShowcaseJunkProjectType;
};
