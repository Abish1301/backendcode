'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('WorkCategory', [
      // Site Categories (type: 1)
      {
        id: 1,
        name: 'Electrical Work',
        description: 'Tasks related to electrical wiring, fixtures, and repairs on the site.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 1
      },
      {
        id: 2,
        name: 'Plumbing Work',
        description: 'Work involving water supply, piping, and sanitation systems on the site.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 1
      },
      {
        id: 3,
        name: 'Civil Work',
        description: 'Construction and structural work including masonry on the site.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 1
      },
      {
        id: 4,
        name: 'Roofing',
        description: 'Installation and repair of roofs, including waterproofing, on the site.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 1
      },
      {
        id: 5,
        name: 'Excavation',
        description: 'Digging and preparing the site for construction, including soil removal.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 1
      },

      // Task Categories (type: 2)
      {
        id: 6,
        name: 'Carpentry Work',
        description: 'Tasks related to woodwork, furniture, and fittings.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 2
      },
      {
        id: 7,
        name: 'Painting',
        description: 'Interior and exterior painting and finishing jobs.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 2
      },
      {
        id: 8,
        name: 'Tiling Work',
        description: 'Installation of ceramic, porcelain, or stone tiles for floors and walls.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 2
      },
      {
        id: 9,
        name: 'HVAC Installation',
        description: 'Installation of heating, ventilation, and air conditioning systems.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 2
      },
      {
        id: 10,
        name: 'Insulation',
        description: 'Installation of thermal insulation for walls, roofs, and floors.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type: 2
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WorkCategory', null, {});
  },
};
