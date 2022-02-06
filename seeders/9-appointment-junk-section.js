'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'AppointmentJunkSections', 
      [{
        appointmentId : 1,
        sectionId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 1,
        sectionId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 1,
        sectionId : 3,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 2,
        sectionId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 3,
        sectionId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 4,
        sectionId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 5,
        sectionId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 6,
        sectionId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 7,
        sectionId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 8,
        sectionId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        appointmentId : 9,
        sectionId : 4,
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
