"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Timeslot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Timeslot.hasMany(models.Appointment, {
        foreignkey: "timeslotId",
        as: "appointment",
      });
    }
  }
  Timeslot.init(
    {
      time: DataTypes.STRING,
      quota: DataTypes.INTEGER,
      serviceTypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Timeslot",
    }
  );
  return Timeslot;
};
