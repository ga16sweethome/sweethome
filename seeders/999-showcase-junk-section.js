"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ShowcaseJunkSections",
      [
        {
          showcaseId: 1,
          sectionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 1,
          sectionId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 1,
          sectionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 2,
          sectionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 3,
          sectionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 4,
          sectionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 5,
          sectionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 6,
          sectionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 7,
          sectionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 8,
          sectionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 9,
          sectionId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          showcaseId: 10,
          sectionId: 7,
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
