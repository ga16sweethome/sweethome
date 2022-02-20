'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Favorites', 
      [{
        userId : 4,
        showcaseId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        userId : 4,
        showcaseId : 3,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        userId : 6,
        showcaseId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        userId : 7,
        showcaseId : 3,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        userId : 8,
        showcaseId : 4,
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
