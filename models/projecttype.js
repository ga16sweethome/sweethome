"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectType.hasMany(models.ProjectDetail, {
        foreignkey: "projectTypeId",
        as: "projectDetail",
      });
      ProjectType.hasMany(models.ShowcaseJunkProjectType, {
        foreignkey: "projectTypeId",
        as: "showcaseJunkProjectType",
      });
    }
  }
  ProjectType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProjectType",
    }
  );
  return ProjectType;
};
