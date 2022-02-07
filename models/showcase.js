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
        foreignKey :  "projectId",    
        as: "project",
      });
      Showcase.belongsTo(models.ShowcaseType, {
        foreignKey: "showcaseTypeId",
        as: "showcaseType",
      });
      Showcase.hasMany(models.ShowcaseJunkProjectType, {
        foreignKey: "showcaseId",
        as: "showcaseJunkProjectType",
      });
      Showcase.hasMany(models.ShowcaseJunkStyle, {
        foreignKey: "showcaseId",
        as: "showcaseJunkstyle",
      });
      Showcase.hasMany(models.Favorite, {
        foreignKey: "showcaseId",
        as: "favorite",
      });
      Showcase.hasMany(models.Gallery, {
        foreignKey: "showcaseId",
        as: "gallery",
      });
    }
  }
  Showcase.init(
    {
      name: DataTypes.STRING,
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
