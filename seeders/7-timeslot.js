'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Timeslots', 
      [{
         time : "08:00 AM - 09:00 AM",
         quota : 3,
         serviceTypeId : 1,
         createdAt : new Date(),
         updatedAt : new Date()
       },
       {
        time : "09:00 AM - 10:00 AM",
        quota : 3,
        serviceTypeId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        time : "10:00 AM - 11:00 AM",
        quota : 2,
        serviceTypeId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        time : "11:00 AM - 12:00 PM",
        quota : 1,
        serviceTypeId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        time : "13:00 PM - 14:00 PM",
        quota : 3,
        serviceTypeId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        time : "14:00 PM - 15:00 AM",
        quota : 3,
        serviceTypeId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        time : "08:00 AM - 09:00 AM",
        quota : 3,
        serviceTypeId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
       time : "09:00 AM - 10:00 AM",
       quota : 3,
       serviceTypeId : 2,
       createdAt : new Date(),
       updatedAt : new Date()
     },
     {
       time : "10:00 AM - 11:00 AM",
       quota : 2,
       serviceTypeId : 2,
       createdAt : new Date(),
       updatedAt : new Date()
     },
     {
      time : "08:00 AM - 09:00 AM",
      quota : 3,
      serviceTypeId : 3,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
     time : "09:00 AM - 10:00 AM",
     quota : 3,
     serviceTypeId : 3,
     createdAt : new Date(),
     updatedAt : new Date()
   },
   {
     time : "10:00 AM - 11:00 AM",
     quota : 2,
     serviceTypeId : 3,
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
