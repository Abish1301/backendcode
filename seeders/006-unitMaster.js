'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert initial data into the "UnitMaster" table
    await queryInterface.bulkInsert('UnitMaster', [
      { id: 1, name: 'Piece', code: 'PCS001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'Kilogram', code: 'KG001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'Meter', code: 'MTR001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 4, name: 'Ton', code: 'TON001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 5, name: 'Liter', code: 'LTR001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 6, name: 'Square Meter', code: 'SQM001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 7, name: 'Box', code: 'BOX001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 8, name: 'Bag', code: 'BAG001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 9, name: 'Roll', code: 'ROLL001', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 10, name: 'Foot', code: 'FT001', status: true, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data if we need to revert the seeder
    await queryInterface.bulkDelete('UnitMaster', null, {});
  },
};
