'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ProjectDetails', 
      [{
        projectId : 1,
        sectionId : 1,
        projectTypeId : 3,
        workDuration : 1,
        area: 30,
        price : 17000000,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        projectId : 1,
        sectionId : 4 ,
        projectTypeId : 2,
        workDuration : 2,
        area: 24,
        price : 57000000,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        projectId : 2,
        sectionId : 4 ,
        projectTypeId : 2,
        workDuration : 2,
        area: 24,
        price : 154500000,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        projectId : 3,
        sectionId : 4 ,
        projectTypeId : 2,
        workDuration : 2,
        area: 24,
        price : 154500000,
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
