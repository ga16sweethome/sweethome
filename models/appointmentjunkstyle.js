"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppointmentJunkStyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppointmentJunkStyle.belongsToMany(models.Appointment, {
        foreignkey: "appointmentId",
        as: "appointment",
      });
      AppointmentJunkStyle.belongsToMany(models.Style, {
        foreignkey: "styleId",
        as: "style",
      });
    }
  }
  AppointmentJunkStyle.init(
    {
      appointmentId: DataTypes.INTEGER,
      styleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AppointmentJunkStyle",
    }
  );
  return AppointmentJunkStyle;
};
