'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ProjectTypes', 
      [{
         name : "Hacking and Disposal",
         createdAt : new Date(),
         updatedAt : new Date()
       },
       {
        name : "Wallpaper and Painting",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Tilling Works",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Carpentry Works",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Design Services",
        createdAt : new Date(),
        updatedAt : new Date()
      },  
      {
        name : "Electricity and Plumbing",
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
