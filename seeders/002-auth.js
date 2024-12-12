'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);

    // Create sample data for `Auth` table
    await queryInterface.bulkInsert('Auth', [
      {
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin123', salt),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'user@example.com',
        password: bcrypt.hashSync('user123', salt),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'incharge@example.com',
        password: bcrypt.hashSync('incharge123', salt),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Auth', null, {});
  }
};
