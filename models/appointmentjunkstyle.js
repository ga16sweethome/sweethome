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
      AppointmentJunkStyle.belongsTo(models.Appointment, {
        foreignKey: "appointmentId",
        as: "appointment",
      });
      AppointmentJunkStyle.belongsTo(models.Style, {
        foreignKey: "styleId",
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
