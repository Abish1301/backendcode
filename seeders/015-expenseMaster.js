'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ExpenseMaster', [
      {
        id: 1,
        name: 'Office Supplies',
        created_at: new Date(),
        updated_at: new Date(),
        date: '25-11-2024',
        site: 1,
        type: 1, // Office Expenses (ExpenseHead)
        task: 1,
        amount: '500.00',
        remark: 'Purchased pens and paper',
        attachement: 'path/office_supplies_receipt.pdf',
      },
      {
        id: 2,
        name: 'Travel Expenses',
        created_at: new Date(),
        updated_at: new Date(),
        date: '24-11-2024',
        site: 2,
        type: 2, // Travel Expenses (ExpenseHead)
        task: 2,
        amount: '1200.00',
        remark: 'Taxi fare for client meeting',
        attachement: 'path/travel_expenses_invoice.pdf',
      },
      {
        id: 3,
        name: 'Utility Bill',
        created_at: new Date(),
        updated_at: new Date(),
        date: '20-11-2024',
        site: 1,
        type: 3, // Utility Expenses (ExpenseHead)
        task: 3,
        amount: '800.00',
        remark: 'Electricity bill for November',
        attachement: 'path/utility_bill_receipt.pdf',
      },
      {
        id: 4,
        name: 'Event Sponsorship',
        created_at: new Date(),
        updated_at: new Date(),
        date: '18-11-2024',
        site: 2,
        type: 4, // Advertising and Marketing (ExpenseHead)
        task: 3,
        amount: '2500.00',
        remark: 'Sponsorship for tech event',
        attachement: 'path/event_sponsorship_agreement.pdf',
      },
      {
        id: 5,
        name: 'Employee Welfare',
        created_at: new Date(),
        updated_at: new Date(),
        date: '15-11-2024',
        site: 1,
        type: 5, // Employee Welfare (ExpenseHead)
        task: 2,
        amount: '1000.00',
        remark: 'Team-building event',
        attachement: 'path/team_building_receipt.pdf',
      },
      {
        id: 6,
        name: 'Advertising Cost',
        created_at: new Date(),
        updated_at: new Date(),
        date: '10-11-2024',
        site: 2,
        type: 4, // Advertising and Marketing (ExpenseHead)
        task: 1,
        amount: '1500.00',
        remark: 'Social media marketing campaign',
        attachement: 'path/social_media_invoice.pdf',
      },
      {
        id: 7,
        name: 'Software License Renewal',
        created_at: new Date(),
        updated_at: new Date(),
        date: '01-11-2024',
        site: 1,
        type: 6, // IT and Software Expenses (ExpenseHead)
        task: 4,
        amount: '1200.00',
        remark: 'Annual renewal for software license',
        attachement: 'path/software_license_invoice.pdf',
      },
      {
        id: 8,
        name: 'Employee Salaries',
        created_at: new Date(),
        updated_at: new Date(),
        date: '30-10-2024',
        site: 2,
        type: 7, // Employee Salaries (ExpenseHead)
        task: 3,
        amount: '15000.00',
        remark: 'Monthly salary payment',
        attachement: 'path/salary_payment_receipt.pdf',
      },
      {
        id: 9,
        name: 'Office Rent',
        created_at: new Date(),
        updated_at: new Date(),
        date: '28-10-2024',
        site: 1,
        type: 8, // Rent and Utilities (ExpenseHead)
        task: 2,
        amount: '5000.00',
        remark: 'Monthly office rent payment',
        attachement: 'path/office_rent_invoice.pdf',
      },
      {
        id: 10,
        name: 'Training and Development',
        created_at: new Date(),
        updated_at: new Date(),
        date: '15-10-2024',
        site: 1,
        type: 9, // Training and Development (ExpenseHead)
        task: 1,
        amount: '3000.00',
        remark: 'Employee development training program',
        attachement: 'path/training_receipt.pdf',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ExpenseMaster', null, {});
  }
};
