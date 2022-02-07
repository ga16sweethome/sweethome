"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceType.hasMany(models.Appointment, {
        foreignkey: "serviceTypeId",
        as: "appointment",
      });
    }
  }
  ServiceType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ServiceType",
    }
  );
  return ServiceType;
};
