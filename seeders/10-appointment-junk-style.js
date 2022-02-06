'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'AppointmentJunkStyles', 
      [{
        appointmentId : 1,
        styleId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 1,
        styleId : 9,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 1,
        styleId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 2,
        styleId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 3,
        styleId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 4,
        styleId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 5,
        styleId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 6,
        styleId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 7,
        styleId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 8,
        styleId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 9,
        styleId : 2,
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
