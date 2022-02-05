"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppointmentJunkSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppointmentJunkSection.belongsToMany(models.Appointment, {
        foreignkey: "appointmentId",
        as: "appointment",
      });
      AppointmentJunkSection.belongsToMany(models.Section, {
        foreignkey: "sectionId",
        as: "section",
      });
    }
  }
  AppointmentJunkSection.init(
    {
      appointmentId: DataTypes.INTEGER,
      sectionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AppointmentJunkSection",
    }
  );
  return AppointmentJunkSection;
};
