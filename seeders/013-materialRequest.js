'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('material_request', [
      {
        material: 1,
        qty: '50',
        site: 1,
        task: 1,
        transfer: 1,
        m_status: 'Pending',
        status: true,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
        e_date:'13-12-2024',
        a_qty:'50',
      },
      {
        material: 2,
        qty: '100',
        site: 2,
        task: 2,
        transfer: 2,
        m_status: 'Approved',
        status: true,
        d: 0,
        created_at: new Date(),
        updated_at: new Date(),
        e_date:'13-12-2024',
        a_qty:'100',
      },
      {
        material: 3,
        qty: '30',
        site: 1,
        task: 3,
        transfer: 3,
        m_status: 'Rejected',
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
    await queryInterface.bulkDelete('material_request', null, {});
  },
};
