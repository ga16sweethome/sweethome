'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ShowcaseJunkStyles', 
      [{
        showcaseId : 1,
        styleId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 1,
        styleId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 1,
        styleId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 2,
        styleId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 3,
        styleId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 4,
        styleId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 5,
        styleId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 6,
        styleId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 7,
        styleId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 8,
        styleId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 9,
        styleId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseId : 10,
        styleId : 7,
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
