'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert initial data into the "MaterialCategoryMaster" table
    await queryInterface.bulkInsert('MaterialCategoryMaster', [
      {
        name: 'MaterialCategory 1',
        code: 'MaterialCategory001',
        status:true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'MaterialCategory 2',
        code: 'MaterialCategory002',
        status:true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'MaterialCategory 3',
        code: 'MaterialCategory003',
        status:true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data if we need to revert the seeder
    await queryInterface.bulkDelete('MaterialCategoryMaster', null, {});
  },
};
