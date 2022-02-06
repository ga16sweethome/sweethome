'use strict';
const moment = require('moment')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Appointments', 
      [{
         code : "#A-0001",
         userId : 3,
         buildingTypeId : 1,
         serviceTypeId : 2,
         estimateTime : 3,
         budget : 1000000000,
         appointmentDate : "2022-02-24",
         address : "Palm Beach, Pakuwon City, Surabaya",
         timeslotId : 9,
         status : 1,
         createdAt : "2022-01-12 09:35:34.194+07",
         updatedAt : new Date()
       },
       {
        code : "#A-0002",
        userId : 4,
        buildingTypeId : 2,
        serviceTypeId : 1,
        estimateTime : 3,
        budget : 500000000,
        appointmentDate : "2022-01-28",
        address : "Pantai Indah Kapuk, Jakarta",
        timeslotId : 1,
        status : 2,
        createdAt : "2022-01-20 09:45:34.194+07",
        updatedAt : new Date()
      },
      {
        code : "#A-0003",
        userId : 5,
        buildingTypeId : 1,
        serviceTypeId : 2,
        estimateTime : 4,
        budget : 200000000,
        appointmentDate : "2022-01-29",
        address : "Town Center Park, Semarang",
        timeslotId : 9,
        status : 2,
        createdAt : "2022-01-20 09:35:34.194+07",
        updatedAt : new Date()
      },
      {
        code : "#A-0004",
        userId : 6,
        buildingTypeId : 4,
        serviceTypeId : 2,
        estimateTime : 4,
        budget : 370000000,
        appointmentDate : "2022-01-27",
        address : "Trade Center, Bogor",
        timeslotId : 9,
        status : -1,
        createdAt : "2022-01-17 09:35:34.194+07",
        updatedAt : new Date()
      },
      {
        code : "#A-0005",
        userId : 7,
        buildingTypeId : 4,
        serviceTypeId : 2,
        estimateTime : 4,
        budget : 370000000,
        appointmentDate : "2022-01-27",
        address : "Grand Indonesia Plaza, Jakarta Pusat",
        timeslotId : 9,
        status : 2,
        createdAt : "2022-01-13 09:35:34.194+07",
        updatedAt : new Date()
      },
      {
        code : "#A-0006",
        userId : 8,
        buildingTypeId : 2,
        serviceTypeId : 2,
        estimateTime : 5,
        budget : 125000000,
        appointmentDate : "2022-02-22",
        address : "Gambir, Jakarta Pusat",
        timeslotId : 9,
        status : 1,
        createdAt : "2022-01-05 09:35:34.194+07",
        updatedAt : new Date()
      },
      {
        code : "#A-0007",
        userId : 5,
        buildingTypeId : 2,
        serviceTypeId : 2,
        estimateTime : 5,
        budget : 154500000,
        appointmentDate : "2022-01-17",
        address : "Senayan City, Jakarta Pusat",
        timeslotId : 9,
        completedAt : "2022-01-17 11:25:34.197+07",
        status : 3,
        createdAt : "2022-01-05 09:35:34.194+07",
        updatedAt : new Date()
      },
      {
        code : "#A-0008",
        userId : 9,
        buildingTypeId : 2,
        serviceTypeId : 2,
        estimateTime : 5,
        budget : 900000000,
        appointmentDate : "2022-01-17",
        address : "Gedung Sate, Bandung",
        timeslotId : 9,
        completedAt : "2022-01-17 11:35:34.197+07",
        status : 3,
        createdAt : "2022-01-01 09:35:34.194+07",
        updatedAt : new Date()
      },
      {
        code : "#A-0009",
        userId : 4,
        buildingTypeId : 2,
        serviceTypeId : 2,
        estimateTime : 1,
        budget : 54500000,
        appointmentDate : "2022-01-16",
        address : "Gedung Baru, Yogya",
        timeslotId : 9,
        completedAt : "2022-01-16 11:35:34.197+07",
        status : 3,
        createdAt : "2022-01-01 09:35:34.194+07",
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
