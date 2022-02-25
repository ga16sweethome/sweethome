"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ProjectDetails",
      [
        {
          projectId: 1,
          sectionId: 1,
          projectTypeId: 3,
          workDuration: 1,
          area: 15,
          price: 45000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 1,
          sectionId: 4,
          projectTypeId: 2,
          workDuration: 2,
          area: 15,
          price: 45000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 5,
          sectionId: 4,
          projectTypeId: 2,
          workDuration: 1,
          area: 10,
          price: 60000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 5,
          sectionId: 1,
          projectTypeId: 3,
          workDuration: 1,
          area: 10,
          price: 30000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 6,
          sectionId: 4,
          projectTypeId: 2,
          workDuration: 1,
          area: 10,
          price: 60000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 6,
          sectionId: 1,
          projectTypeId: 3,
          workDuration: 1,
          area: 10,
          price: 30000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 7,
          sectionId: 4,
          projectTypeId: 2,
          workDuration: 1,
          area: 10,
          price: 60000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 7,
          sectionId: 1,
          projectTypeId: 3,
          workDuration: 1,
          area: 10,
          price: 30000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 8,
          sectionId: 4,
          projectTypeId: 2,
          workDuration: 1,
          area: 10,
          price: 60000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 8,
          sectionId: 1,
          projectTypeId: 3,
          workDuration: 1,
          area: 10,
          price: 30000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 9,
          sectionId: 4,
          projectTypeId: 2,
          workDuration: 1,
          area: 10,
          price: 60000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectId: 9,
          sectionId: 1,
          projectTypeId: 3,
          workDuration: 1,
          area: 10,
          price: 30000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
