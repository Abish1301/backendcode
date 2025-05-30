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
        date: '2024-11-25',
        site: 1,
        type: 1,
        task: 1,
        amount: '500.00',
        remark: 'Purchased pens and paper',
        image: 'path/office_supplies_receipt.pdf',
      },
      {
        id: 2,
        name: 'Travel Expenses',
        created_at: new Date(),
        updated_at: new Date(),
        date: '2024-11-24',
        site: 2,
        type: 2,
        task: 2,
        amount: '1200.00',
        remark: 'Taxi fare for client meeting',
        image: 'path/travel_expenses_invoice.pdf',
      },
      {
        id: 3,
        name: 'Utility Bill',
        created_at: new Date(),
        updated_at: new Date(),
        date: '2024-11-20',
        site: 1,
        type: 3,
        task: 3,
        amount: '800.00',
        remark: 'Electricity bill for November',
        image: 'path/utility_bill_receipt.pdf',
      },
      {
        id: 4,
        name: 'Event Sponsorship',
        created_at: new Date(),
        updated_at: new Date(),
        date: '2024-11-18',
        site: 2,
        type: 4,
        task: 3,
        amount: '2500.00',
        remark: 'Sponsorship for tech event',
        image: 'path/event_sponsorship_agreement.pdf',
      },
      {
        id: 5,
        name: 'Employee Welfare',
        created_at: new Date(),
        updated_at: new Date(),
        date: '2024-11-15',
        site: 1,
        type: 5,
        task: 2,
        amount: '1000.00',
        remark: 'Team-building event',
        image: 'path/team_building_receipt.pdf',
      },
      {
        id: 6,
        name: 'Advertising Cost',
        created_at: new Date(),
        updated_at: new Date(),
        date: '2024-11-10',
        site: 2,
        type: 4,
        task: 1,
        amount: '1500.00',
        remark: 'Social media marketing campaign',
        image: 'path/social_media_invoice.pdf',
      },
      {
        id: 7,
        name: 'Software License Renewal',
        created_at: new Date(),
        updated_at: new Date(),
        date: '2024-11-01',
        site: 1,
        type: 6,
        task: 4,
        amount: '1200.00',
        remark: 'Annual renewal for software license',
        image: 'path/software_license_invoice.pdf',
      },
      {
        id: 8,
        name: 'Employee Salaries',
        created_at: new Date(),
        updated_at: new Date(),
        date: '2024-10-30',
        site: 2,
        type: 7,
        task: 3,
        amount: '15000.00',
        remark: 'Monthly salary payment',
        image: 'path/salary_payment_receipt.pdf',
      },
      {
        id: 9,
        name: 'Office Rent',
        created_at: new Date(),
        updated_at: new Date(),
        date: '2024-10-28',
        site: 1,
        type: 8,
        task: 2,
        amount: '5000.00',
        remark: 'Monthly office rent payment',
        image: 'path/office_rent_invoice.pdf',
      },
      {
        id: 10,
        name: 'Training and Development',
        created_at: new Date(),
        updated_at: new Date(),
        date: '2024-10-15',
        site: 1,
        type: 9,
        task: 1,
        amount: '3000.00',
        remark: 'Employee development training program',
        image: 'path/training_receipt.pdf',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ExpenseMaster', null, {});
  }
};