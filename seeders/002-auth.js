'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);

    // Create sample data for `Auth` table
    await queryInterface.bulkInsert('Auth', [
      { id: 1, email: 'admin1@company.com', password: bcrypt.hashSync('admin123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: 2, email: 'incharge1@company.com', password: bcrypt.hashSync('incharge123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: 3, email: 'user1@company.com', password: bcrypt.hashSync('user123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: 4, email: 'admin2@company.com', password: bcrypt.hashSync('admin123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: 5, email: 'incharge2@company.com', password: bcrypt.hashSync('incharge123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: 6, email: 'user2@company.com', password: bcrypt.hashSync('user123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: 7, email: 'admin3@company.com', password: bcrypt.hashSync('admin123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: 8, email: 'incharge3@company.com', password: bcrypt.hashSync('incharge123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: 9, email: 'user3@company.com', password: bcrypt.hashSync('user123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
      { id: 10, email: 'admin4@company.com', password: bcrypt.hashSync('admin123', salt), is_active: true, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Auth', null, {});
  }
};
