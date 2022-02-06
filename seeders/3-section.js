'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Sections', 
      [{
         name : "Living room",
         createdAt : new Date(),
         updatedAt : new Date()
       },
       {
        name : "Dining Room",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Bedroom",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Kitchen",
        createdAt : new Date(),
        updatedAt : new Date()
      }, 
      {
        name : "Bathroom",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
       name : "Study",
       createdAt : new Date(),
       updatedAt : new Date()
     },
     {
       name : "Office",
       createdAt : new Date(),
       updatedAt : new Date()
     },
     {
       name : "Outdoor",
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
