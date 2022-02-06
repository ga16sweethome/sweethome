'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'LastActivities', 
      [{
        userId : 4,
        time_login : "2022-01-28 09:00:24.021+07",
        submitted : "2022-01-12 09:24:24.021+07",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        userId : 5,
        time_login : "2022-01-28 09:00:24.021+07",
        submitted : "2022-01-20 09:24:24.021+07",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        userId : 6,
        time_login : "2022-01-28 09:00:24.021+07",
        submitted : "2022-01-17 21:24:24.021+07",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        userId : 7,
        time_login : "2022-01-28 09:00:24.021+07",
        submitted : "2022-01-13 15:24:24.021+07",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        userId : 8,
        time_login : "2022-01-28 09:00:24.021+07",
        submitted : "2022-01-12 15:24:24.021+07",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        userId : 9,
        time_login : "2022-01-28 09:00:24.021+07",
        submitted : "2022-01-01 15:24:24.021+07",
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
