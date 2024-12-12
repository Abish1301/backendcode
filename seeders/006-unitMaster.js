'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert initial data into the "UnitMaster" table
    await queryInterface.bulkInsert('UnitMaster', [
      {
        name: 'Unit 1',
        code: 'Unit001',
        status:true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Unit 2',
        code: 'Unit002',
        status:true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Unit 3',
        code: 'Unit003',
        status:true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data if we need to revert the seeder
    await queryInterface.bulkDelete('UnitMaster', null, {});
  },
};
