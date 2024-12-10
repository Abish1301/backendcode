'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TaskMaster', [
      {
        name: 'Develop Website',
        description: 'Design and develop a corporate website',
        status: true,
        site: 1,
        unit:1,
        search_tags: 'website, development, design',
        work_category: 1,
        priority: 'High',
        start_date: '27-11-2024', 
        end_date: '10-12-2024',   
        attachement: 'path/website_design_doc.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Database Migration',
        description: 'Migrate data from legacy database to the new system',
        status: true,
        site: 1,
        unit:2,
        search_tags: 'migration, database, legacy',
        work_category: 1,
        priority: 'Medium',
        start_date: '28-11-2024', 
        end_date: '05-12-2024',   
        attachement: 'path/migration_plan.docx',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'API Integration',
        description: 'Integrate third-party APIs for payment processing',
        status: true,
        site: 1,
        unit:3,
        search_tags: 'api, integration, payment',
        work_category: 3,
        priority: 'Low',
        start_date: '29-11-2024',
        end_date: '15-12-2024',
        attachement: 'path/api_docs.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TaskMaster', null, {});
  },
};
