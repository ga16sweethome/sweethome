"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Appointment.belongsTo(models.BuildingType, {
        foreignKey: "buildingTypeId",
        as: "buildingType",
        foreignkey: "buildingTypeId",
      });
      Appointment.belongsTo(models.ServiceType, {
        foreignKey: "serviceTypeId",
        as: "serviceType",
      });
      Appointment.belongsTo(models.Timeslot, {
        foreignKey: "timeslotId",
        as: "timeslot",
      });
      Appointment.hasMany(models.AppointmentJunkSection, {
        foreignKey: "appointmentId",
        as: "appointmentJunkSection",
      });
      Appointment.hasMany(models.AppointmentJunkStyle, {
        foreignKey: "appointmentId",
        as: "appointmentJunkStyle",
      });
      Appointment.hasMany(models.Project, {
        foreignKey: "appointmentId",
        as: "project",
      });
    }
  }
  Appointment.init(
    {
      code: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      buildingTypeId: DataTypes.INTEGER,
      serviceTypeId: DataTypes.INTEGER,
      estimateTime: DataTypes.INTEGER,
      budget: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      note: DataTypes.TEXT,
      appointmentDate: DataTypes.DATEONLY,
      timeslotId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      completedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
