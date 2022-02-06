'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Styles', 
      [{
         name : "Modern",
         createdAt : new Date(),
         updatedAt : new Date()
       },
       {
        name : "Contemporary",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Minimalist",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Industrial",
        createdAt : new Date(),
        updatedAt : new Date()
      },  
      {
        name : "Scandinavian",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
       name : "Traditional",
       createdAt : new Date(),
       updatedAt : new Date()
     },
     {
       name : "Natural",
       createdAt : new Date(),
       updatedAt : new Date()
     },
     {
       name : "Rustic",
       createdAt : new Date(),
       updatedAt : new Date()
     },   
     {
      name : "Bohemian",
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
