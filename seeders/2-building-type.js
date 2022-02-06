'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'BuildingTypes', 
      [{
         name : "House",
         createdAt : new Date(),
         updatedAt : new Date()
       },
       {
        name : "Apartment",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "SOHO",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Office",
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
