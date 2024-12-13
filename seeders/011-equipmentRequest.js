'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('equipment_request', [
      {
        equipment: 1,
        qty: '50',
        site: 1,
        task: 1,
        transfer: 1,
        e_status: 'Pending',
        status: true,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
        e_date:'13-12-2024',
        a_qty:'50',
      },
      {
        equipment: 2,
        qty: '100',
        site: 2,
        task: 2,
        transfer: 2,
        e_status: 'Approved',
        status: true,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
        e_date:'13-12-2024',
        a_qty:'100',
      },
      {
        equipment: 3,
        qty: '30',
        site: 1,
        task: 3,
        transfer: 3,
        e_status: 'Rejected',
        status: false,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
        e_date:'13-12-2024',
        a_qty:'30',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment_request', null, {});
  },
};
