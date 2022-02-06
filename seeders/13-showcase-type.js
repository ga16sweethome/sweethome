'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ShowcaseTypes', 
      [{
        type : "Completed Project",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        type : "Portfolio",
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
