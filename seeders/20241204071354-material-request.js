'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('material_request', [
      {
        material: 1,
        qty: '50',
        site: 101,
        task: 201,
        transfer: 1,
        m_status: 'Pending',
        type: 'Material',
        status: true,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        material: 2,
        qty: '100',
        site: 102,
        task: 202,
        transfer: 2,
        m_status: 'Approved',
        type: 'Material',
        status: true,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        material: 3,
        qty: '30',
        site: 103,
        task: 203,
        transfer: 3,
        m_status: 'Rejected',
        type: 'Material',
        status: false,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('material_request', null, {});
  },
};
