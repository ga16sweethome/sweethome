'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Projects', 
      [{
        code : "#P-0001",
        appointmentId : 9,
        uploadReceipt : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/180px-ReceiptSwiss.jpg",
        noteUploadReceipt : "bukti transfer",
        userId : 4,
        status : 3,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        code : "#P-0002",
        appointmentId : 7,
        userId : 5,
        status : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        code : "#P-0003",
        appointmentId : 9,
        userId : 5,
        status : -1,
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
