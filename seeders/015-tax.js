'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert initial data into the "TaxMaster" table
    await queryInterface.bulkInsert('TaxMaster', [
      {
        name: 'Tax 1',
        description: 'Description for Tax1',
        start_date:'01-01-2023',
        end_date:'01-01-2024',
        status:true,
        percentage:18,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tax 2',
        description: 'Description for Tax2',
        start_date:'01-01-2024',
        end_date:'01-01-2025',
        status:true,
        percentage:18.5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tax 3',
        description: 'Description for Tax3',
        start_date:'01-01-2025',
        end_date:'01-01-2026',
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
