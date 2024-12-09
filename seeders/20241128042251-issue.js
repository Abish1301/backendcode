'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('IssueMaster', [
      {
        name: 'Electrical Issue',
        remarks: 'Power failure in zone 3',
        site_type: 1,
        created_at: new Date(),
        updated_at: new Date(),
        status:true,
      },
      {
        name: 'Plumbing Issue',
        remarks: 'Pipe leakage near building A',
        site_type: 2,
        created_at: new Date(),
        updated_at: new Date(),
        status:true,

      },
      {
        name: 'Structural Issue',
        remarks: 'Cracks in the wall of conference room',
        site_type: 3,
        created_at: new Date(),
        updated_at: new Date(),
        status:true,

      },
      {
        name: 'HVAC Issue',
        remarks: 'Air conditioning malfunction in floor 4',
        site_type: 4,
        created_at: new Date(),
        updated_at: new Date(),
        status:true,

      },
      {
        name: 'Safety Issue',
        remarks: 'Broken fire alarm in section B',
        site_type: 5,
        created_at: new Date(),
        updated_at: new Date(),
        status:true,

      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('IssueMaster', null, {});
  },
};
