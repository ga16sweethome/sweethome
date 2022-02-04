'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showcase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Showcase.init({
    code: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    showcaseTypeId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    is_shown: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Showcase',
  });
  return Showcase;
};