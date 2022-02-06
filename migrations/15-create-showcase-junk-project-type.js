'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShowcaseJunkProjectTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      showcaseId: {
        type: Sequelize.INTEGER,
        allowNull :false,
        references : {
          model : "Showcases",  //mengikuti model migrations name
          key : "id"
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      },
      projectTypeId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShowcaseJunkProjectTypes');
  }
};