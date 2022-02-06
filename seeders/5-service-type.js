'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ServiceTypes', 
      [{
         name : "Renovation",
         createdAt : new Date(),
         updatedAt : new Date()
       },
       {
        name : "Interior Design",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Building Inspection",
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
