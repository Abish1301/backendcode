'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('equipment_request', [
      {
        equipment: 1,
        qty: '50',
        site: 101,
        task: 201,
        transfer: 1,
        e_status: 'Pending',
        status: true,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        equipment: 2,
        qty: '100',
        site: 102,
        task: 202,
        transfer: 2,
        e_status: 'Approved',
        status: true,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        equipment: 3,
        qty: '30',
        site: 103,
        task: 203,
        transfer: 3,
        e_status: 'Rejected',
        status: false,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment_request', null, {});
  },
};
