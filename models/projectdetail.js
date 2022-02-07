"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectDetail.belongsTo(models.ProjectType, {
        foreignKey: "projecTypetId",
        as: "projectType",
      });
      ProjectDetail.belongsTo(models.Section, {
        foreignKey: "sectionId",
        as: "section",
      });
      ProjectDetail.belongsTo(models.Project, {
        foreignKey: "projectId",
        as: "project",
      });
    }
  }
  ProjectDetail.init(
    {
      sectionId: DataTypes.INTEGER,
      projectTypeId: DataTypes.INTEGER,
      workDuration: DataTypes.INTEGER,
      area: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProjectDetail",
    }
  );
  return ProjectDetail;
};
