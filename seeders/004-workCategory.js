'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('WorkCategory', [
      {
        name: 'Electrical Work',
        description: 'Tasks related to electrical wiring, fixtures, and repairs.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type:1
      },
      {
        name: 'Plumbing Work',
        description: 'Work involving water supply, piping, and sanitation systems.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type:1
      },
      {
        name: 'Carpentry Work',
        description: 'Tasks related to woodwork, furniture, and fittings.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type:2
      },
      {
        name: 'Painting',
        description: 'Interior and exterior painting and finishing jobs.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type:2
      },
      {
        name: 'Civil Work',
        description: 'Construction and structural work including masonry.',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        type:1
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WorkCategory', null, {});
  },
};
