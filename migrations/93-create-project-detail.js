"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProjectDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sectionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      projectTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      workDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      area: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Projects", //mengikuti model migrations name
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProjectDetails");
  },
};
