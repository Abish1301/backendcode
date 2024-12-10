'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AuthUser', [
      {
        auth_id: 1, 
        code: 'A001',
        name: 'Super Admin', 
        description: 'Administrator with full access',
        profile_image: 'admin_image.jpg',
        email: 'admin@example.com',
        mobile: '1234567890',
        address: '123 Admin St, Admin City',
        role_id: null, 
        type: 'Admin', 
        status:true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        auth_id: 2,
        code: 'U001',
        name: 'Regular User',
        description: 'A regular user with limited access',
        profile_image: 'user_image.jpg',
        email: 'user@example.com',
        mobile: '9876543210',
        address: '456 User St, User City',
        role_id: 2, 
        type: 'User', 
        created_at: new Date(),
        updated_at: new Date(),
        status:true
      },
      {
        auth_id: 3, 
        code: 'I001',
        name: 'Incharge User',
        description: 'Incharge user with specific access',
        profile_image: 'incharge_image.jpg',
        email: 'incharge@example.com',
        mobile: '1122334455',
        address: '789 Incharge St, Incharge City',
        role_id: null, // Incharge should not have a role
        type: 'Incharge', // Incharge type
        created_at: new Date(),
        updated_at: new Date(),
        status:true
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AuthUser', null, {});
  },
};
