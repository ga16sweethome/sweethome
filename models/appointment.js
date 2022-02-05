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
        foreignkey: "userId",
        as: "user",
      });
      Appointment.belongsTo(models.BuildingType, {
        foreignkey: "buildingTypeId",
        as: "buildingType",
      });
      Appointment.belongsTo(models.ServiceType, {
        foreignkey: "servideTypeId",
        as: "servideType",
      });
      Appointment.belongsTo(models.Timeslot, {
        foreignkey: "timeslotId",
        as: "timeslot",
      });
      Appointment.hasMany(models.AppointmentJunkSection, {
        foreignkey: "appointmentId",
        as: "appointmentJunkSection",
      });
      Appointment.hasMany(models.AppointmentJunkStyle, {
        foreignkey: "appointmentId",
        as: "appointmentJunkStyle",
      });
      Appointment.hasMany(models.Project, {
        foreignkey: "appointmentId",
        as: "project",
      });
    }
  }
  Appointment.init(
    {
      code: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      buildingTypeId: DataTypes.INTEGER,
      servideTypeId: DataTypes.INTEGER,
      estimateTime: DataTypes.INTEGER,
      budget: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      note: DataTypes.TEXT,
      appointmentDate: DataTypes.DATE,
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
