'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert initial data into the "MaterialCategoryMaster" table
    await queryInterface.bulkInsert('MaterialCategoryMaster', [
      { id: 1, name: 'Electrical Materials', code: 'ELEC001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'Plumbing Materials', code: 'PLUMB001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'Carpentry Materials', code: 'CARP001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 4, name: 'Construction Materials', code: 'CONST001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 5, name: 'Finishing Materials', code: 'FINI001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 6, name: 'Steel Materials', code: 'STEEL001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 7, name: 'Concrete Materials', code: 'CONCR001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 8, name: 'Tiles and Flooring', code: 'TILE001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 9, name: 'Paint Materials', code: 'PAINT001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 10, name: 'Safety Materials', code: 'SAFE001', status: true, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data if we need to revert the seeder
    await queryInterface.bulkDelete('MaterialCategoryMaster', null, {});
  },
};
