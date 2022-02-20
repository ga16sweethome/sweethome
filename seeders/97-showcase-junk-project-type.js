'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ShowcaseJunkProjectTypes', 
      [{
        showcaseId : 1,
        projectTypeId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 1,
        projectTypeId : 3,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 1,
        projectTypeId : 6,
        createdAt : new Date(),
        updatedAt : new Date()
       },
      {
        showcaseId : 2,
        projectTypeId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 3,
        projectTypeId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 4,
        projectTypeId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 5,
        projectTypeId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 6,
        projectTypeId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 7,
        projectTypeId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 8,
        projectTypeId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 9,
        projectTypeId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 10,
        projectTypeId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },

      
      
      
           
     ], 
     {});
   
 }, 

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
