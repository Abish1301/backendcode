'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add seed data to AuthRoles table
    await queryInterface.bulkInsert('AuthRole', [
      {
        code: 'USER1',
        name: 'User1',
        description: 'Regular user with limited access',
        status: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'USER2',
        name: 'User2',
        description: 'Regular user with limited access',
        status: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        code: 'USER3',
        name: 'User3',
        description: 'Regular user with limited access',
        status: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes by deleting the data
    await queryInterface.bulkDelete('AuthRole', null, {});
  }
};
