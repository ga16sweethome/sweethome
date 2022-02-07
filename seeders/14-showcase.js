'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Showcases', 
      [{
        projectId : 1,
        showcaseTypeId : 1,
        createdBy : 1,
        is_shown : true,
        name : "Apartemen Living Room Redesign",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseTypeId : 2,
        createdBy : 1,
        is_shown : false,
        name : "Apartemen Living Room Redesign",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseTypeId : 2,
        createdBy : 1,
        is_shown : true,
        name : "Natural Feel Living Room",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseTypeId : 2,
        createdBy : 1,
        is_shown : true,
        name : "Natural Feel Living Room",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseTypeId : 2,
        createdBy : 1,
        is_shown : true,
        name : "Natural Feel Living Room",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseTypeId : 2,
        createdBy : 1,
        is_shown : true,
        name : "Natural Feel Living Room",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseTypeId : 2,
        createdBy : 2,
        is_shown : true,
        name : "Japenese Traditional Living Room",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseTypeId : 2,
        createdBy : 2,
        is_shown : true,
        name : "Japenese Traditional Living Room",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseTypeId : 2,
        createdBy : 1,
        is_shown : true,
        name : "Japenese Traditional Living Room",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        showcaseTypeId : 2,
        createdBy : 2,
        is_shown : true,
        name : "Japenese Traditional Living Room",
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
