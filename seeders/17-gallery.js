'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Galleries', 
      [{
        title : "Main Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133916/sweethome/alr1_rzyojd.jpg",
        showcaseId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        title : "Study Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133916/sweethome/alr2_aannkt.jpg",
        showcaseId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        title : "Rest Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133916/sweethome/alr3_zlnkrq.jpg",
        showcaseId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },    
       {
        title : "Office Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133916/sweethome/alr4_nhof93.jpg",
        showcaseId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        title : "Main Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133917/sweethome/NLR1_aeafq9.jpg",
        showcaseId : 3,
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        title : "Main Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133917/sweethome/NLR2_dco4we.jpg",
        showcaseId : 4,
        createdAt : new Date(),
        updatedAt : new Date()
       },    
       {
        title : "Main Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133916/sweethome/NLR3_tt2yhi.jpg",
        showcaseId : 5,
        createdAt : new Date(),
        updatedAt : new Date()
       },    
       {
        title : "Main Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133916/sweethome/NLR4_dtjwcm.jpg",
        showcaseId : 6,
        createdAt : new Date(),
        updatedAt : new Date()
       },    
       {
        title : "Main Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133917/sweethome/JTL1_sbgvj0.jpg",
        showcaseId : 7,
        createdAt : new Date(),
        updatedAt : new Date()
       },    
       {
        title : "Main Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133917/sweethome/JTL2_kxsewi.jpg",
        showcaseId : 8,
        createdAt : new Date(),
        updatedAt : new Date()
       },    
       {
        title : "Main Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133917/sweethome/JTL3_tgdhmk.jpg",
        showcaseId : 9,
        createdAt : new Date(),
        updatedAt : new Date()
       },    
       {
        title : "Main Area",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644133917/sweethome/JTL4_i3fmae.jpg",
        showcaseId : 10,
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
