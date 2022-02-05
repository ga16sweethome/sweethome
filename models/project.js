"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Appointment, {
        foreignkey: "appointmentId",
        as: "appointment",
      });
      Project.belongsTo(models.User, {
        foreignkey: "userId",
        as: "user",
      });
      Project.hasMany(models.ProjectDetail, {
        foreignkey: "projectId",
        as: "projectDetail",
      });
      Project.hasMany(models.Showcase, {
        foreignkey: "projectId",
        as: "showcase",
      });
    }
  }
  Project.init(
    {
      code: DataTypes.STRING,
      appointmentId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      uploadReceipt: DataTypes.STRING,
      noteUploadReceipt: DataTypes.TEXT,
      requestCancel: DataTypes.STRING,
      reasonCancel: DataTypes.TEXT,
      confirmPayment: DataTypes.BOOLEAN,
      status: DataTypes.INTEGER,
      completedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
