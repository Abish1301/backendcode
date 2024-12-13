'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ExpenseHead', [
      {
        id: 1,
        name: 'Office Expenses',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Travel Expenses',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Employee Welfare',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Miscellaneous',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'Advertising and Marketing',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: 'IT and Software Expenses',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Employee Salaries',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Rent and Utilities',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Training and Development',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Maintenance and Repairs',
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
