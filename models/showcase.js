"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Showcase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Showcase.belongsTo(models.Project, {
        foreignkey: "projectId",
        as: "project",
      });
      Showcase.belongsTo(models.ShowcaseType, {
        foreignkey: "showcaseTypeId",
        as: "showcaseType",
      });
      Showcase.hasMany(models.ShowcaseJunkProjectType, {
        foreignkey: "showcaseId",
        as: "showcaseJunkProjectType",
      });
      Showcase.hasMany(models.ShowcaseJunkStyle, {
        foreignkey: "showcaseId",
        as: "showcaseJunkstyle",
      });
      Showcase.hasMany(models.Favorite, {
        foreignkey: "showcaseId",
        as: "favorite",
      });
      Showcase.hasMany(models.Gallery, {
        foreignkey: "showcaseId",
        as: "gallery",
      });
    }
  }
  Showcase.init(
    {
      code: DataTypes.STRING,
      projectId: DataTypes.INTEGER,
      showcaseTypeId: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      is_shown: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Showcase",
    }
  );
  return Showcase;
};
