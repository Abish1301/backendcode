'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ExpenseHead', [
      {
        name: 'Office Expenses',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Travel Expenses',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Employee Welfare',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Miscellaneous',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ExpenseHead', null, {});
  }
};
