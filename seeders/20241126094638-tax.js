'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert initial data into the "TaxMaster" table
    await queryInterface.bulkInsert('TaxMaster', [
      {
        name: 'Tax 1',
        description: 'Description for Tax1',
        start_date:'2023-01-01',
        end_date:'2024-01-01',
        status:true,
        percentage:18,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tax 2',
        description: 'Description for Tax2',
        start_date:'2024-01-01',
        end_date:'2025-01-01',
        status:true,
        percentage:18.5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tax 3',
        description: 'Description for Tax3',
        start_date:'2025-01-01',
        end_date:'2026-01-01',
        status:true,
        percentage:18.75,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data if we need to revert the seeder
    await queryInterface.bulkDelete('TaxMaster', null, {});
  },
};
