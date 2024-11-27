'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ExpenseMaster', [
      {
        name: 'Office Supplies',
        created_at: new Date(),
        updated_at: new Date(),
        date: '25-11-2024',
        site: '1',
        type: 1,
        amount: '500.00',
        remark: 'Purchased pens and paper',
        attachement: 'path/office_supplies_receipt.pdf',
      },
      {
        name: 'Travel Expenses',
        created_at: new Date(),
        updated_at: new Date(),
        date: '24-11-2024',
        site: '1,2',
        type: 2,
        amount: '1200.00',
        remark: 'Taxi fare for client meeting',
        attachement: 'path/travel_expenses_invoice.pdf',
      },
      {
        name: 'Utility Bill',
        created_at: new Date(),
        updated_at: new Date(),
        date: '20-11-2024',
        site: '1,2,3',
        type: 3,
        amount: '800.00',
        remark: 'Electricity bill for November',
        attachement: 'path/utility_bill_receipt.pdf',
      },
      {
        name: 'Event Sponsorship',
        created_at: new Date(),
        updated_at: new Date(),
        date: '18-11-2024',
        site: '1,2,3,4',
        type: 4,
        amount: '2500.00',
        remark: 'Sponsorship for tech event',
        attachement: 'path/event_sponsorship_agreement.pdf',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ExpenseMaster', null, {});
  }
};
