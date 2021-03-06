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
      // // define association here
      Project.belongsTo(models.Appointment, {
        foreignKey: "appointmentId",
        as: "appointment",
      });
      Project.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Project.hasMany(models.ProjectDetail, {
        foreignKey: "projectId",
        as: "projectDetail",
      });
      Project.hasMany(models.Showcase, {
        foreignKey: "projectId",
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
      totalPrice: DataTypes.INTEGER,
      totalArea: DataTypes.INTEGER,
      totalDuration: DataTypes.INTEGER,

      completedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
