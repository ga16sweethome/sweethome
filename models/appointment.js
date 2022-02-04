'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
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
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};