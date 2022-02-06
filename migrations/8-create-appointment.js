'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        unique: true
      },
      userId: {
        type: Sequelize.INTEGER
      },
      buildingTypeId: {
        type: Sequelize.INTEGER
      },
      serviceTypeId: {
        type: Sequelize.INTEGER
      },
      estimateTime: {
        type: Sequelize.INTEGER
      },
      budget: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.TEXT
      },
      appointmentDate: {
        type: Sequelize.DATEONLY
      },
      timeslotId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      completedAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Appointments');
  }
};