"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Style extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Style.hasMany(models.AppointmentJunkStyle, {
        foreignkey: "styleId",
        as: "appointmentJunkStyle",
      });
      Style.hasMany(models.ShowcaseJunkStyle, {
        foreignkey: "styleId",
        as: "showcaseJunkStyle",
      });
    }
  }
  Style.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Style",
    }
  );
  return Style;
};
