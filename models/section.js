"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Section.hasMany(models.AppointmentJunkSection, {
        foreignkey: "sectionId",
        as: "appointmentJunkSection",
      });
      Section.hasMany(models.ProjectDetail, {
        foreignkey: "sectionId",
        as: "projectDetail",
      });
    }
  }
  Section.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Section",
    }
  );
  return Section;
};
