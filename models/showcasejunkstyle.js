'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShowcaseJunkStyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShowcaseJunkStyle.init({
    showcaseId: DataTypes.INTEGER,
    styleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShowcaseJunkStyle',
  });
  return ShowcaseJunkStyle;
};