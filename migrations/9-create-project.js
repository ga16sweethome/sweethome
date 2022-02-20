"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
      },
      appointmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      uploadReceipt: {
        type: Sequelize.STRING,
      },
      noteUploadReceipt: {
        type: Sequelize.TEXT,
      },
      requestCancel: {
        type: Sequelize.STRING,
      },
      reasonCancel: {
        type: Sequelize.TEXT,
      },
      confirmPayment: {
        type: Sequelize.BOOLEAN,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalArea: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      completedAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Projects");
  },
};
