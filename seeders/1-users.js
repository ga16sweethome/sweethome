'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users', 
      [{
         firstName: 'Justin',
         lastName: 'Junaedi',
         email : 'justin.junaedi@gmail.com',
         password : '$2b$10$rAPXRKguCJXqYegoRHhat.Snq3HLPPNeQ3Tv21ufVV4IcY.WqKZd.', //adminadmin bcrypt(hash10)
         is_admin : true,
         phone : "+62 8123",
         picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644080523/sweethome/Pngtree_user_vector_avatar_4830521_o9tkg4.png",
         createdAt : new Date(),
         updatedAt : new Date()
       },
       {
        firstName: 'Renata',
        lastName: 'Yoga',
        email : 'renata.yoga@gmail.com',
        password : '$2b$10$rAPXRKguCJXqYegoRHhat.Snq3HLPPNeQ3Tv21ufVV4IcY.WqKZd.', //adminadmin
        is_admin : true,
        phone : "+62 8789",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644080523/sweethome/Pngtree_user_vector_avatar_4830521_o9tkg4.png",
        createdAt : new Date(),
        updatedAt : new Date()
       },
       {
        firstName: 'Yedam',
        lastName: 'Mansuri',
        email : 'yedam.mansuri@gmail.com',
        password : '$2b$10$rAPXRKguCJXqYegoRHhat.Snq3HLPPNeQ3Tv21ufVV4IcY.WqKZd.', //adminadmin
        phone : "+62 8111 1111 1111",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644080568/sweethome/apakah_vi5xb9.png",
        is_admin : false,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        firstName: 'Travis',
        lastName: 'Sucipto',
        email : 'travis.sucipto@gmail.com',
        password : '$2b$10$rAPXRKguCJXqYegoRHhat.Snq3HLPPNeQ3Tv21ufVV4IcY.WqKZd.', //adminadmin
        phone : "+62 8111 2222 2222",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644080568/sweethome/apakah_vi5xb9.png",
        is_admin : false,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        firstName: 'Stella',
        lastName: 'Hobart',
        email : 'stella.hobart@gmail.com',
        password : '$2b$10$rAPXRKguCJXqYegoRHhat.Snq3HLPPNeQ3Tv21ufVV4IcY.WqKZd.', //adminadmin
        phone : "+62 8111 3333 3333",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644080568/sweethome/apakah_vi5xb9.png",
        is_admin : false,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        firstName: 'Mullet',
        lastName: 'Subekti',
        email : 'mullet.subekti@gmail.com',
        password : '$2b$10$rAPXRKguCJXqYegoRHhat.Snq3HLPPNeQ3Tv21ufVV4IcY.WqKZd.', //adminadmin
        phone : "+62 8111 4444 4444",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644080568/sweethome/apakah_vi5xb9.png",
        is_admin : false,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        firstName: 'Asashi',
        lastName: 'Muhammad',
        email : 'asashi.muhammad@gmail.com',
        password : '$2b$10$rAPXRKguCJXqYegoRHhat.Snq3HLPPNeQ3Tv21ufVV4IcY.WqKZd.', //adminadmin
        phone : "+62 8111 5555 5555",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644080568/sweethome/apakah_vi5xb9.png",
        is_admin : false,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        firstName: 'Dakyung',
        lastName: 'Kirana Putri',
        email : 'dakyung.kirana.putri@gmail.com',
        password : '$2b$10$rAPXRKguCJXqYegoRHhat.Snq3HLPPNeQ3Tv21ufVV4IcY.WqKZd.', //adminadmin
        phone : "+62 8111 6666 6666",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644080568/sweethome/apakah_vi5xb9.png",
        is_admin : false,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        firstName: 'Jamal',
        lastName: 'Dirgantara',
        email : 'jamal.dirgantara@gmail.com',
        password : '$2b$10$rAPXRKguCJXqYegoRHhat.Snq3HLPPNeQ3Tv21ufVV4IcY.WqKZd.', //adminadmin
        phone : "+62 8111 7777 7777",
        picture : "https://res.cloudinary.com/djeewmcdp/image/upload/v1644080568/sweethome/apakah_vi5xb9.png",
        is_admin : false,
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
