'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TaskMaster', [
      {
        id: 1,
        name: 'Develop Website',
        description: 'Design and develop a corporate website',
        status: true,
        site: 1, // site from SiteMaster table
        unit: 1, // unit from Unit table
        search_tags: 'website, development, design',
        work_category: 6, // work category from WorkCategory table
        priority: 'High',
        start_date: '27-11-2024',
        end_date: '10-12-2024',
        image: 'path/website_design_doc.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Database Migration',
        description: 'Migrate data from legacy database to the new system',
        status: true,
        site: 2, // site from SiteMaster table
        unit: 2, // unit from Unit table
        search_tags: 'migration, database, legacy',
        work_category: 7, // work category from WorkCategory table
        priority: 'Medium',
        start_date: '28-11-2024',
        end_date: '05-12-2024',
        image: 'path/migration_plan.docx',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'API Integration',
        description: 'Integrate third-party APIs for payment processing',
        status: true,
        site: 3, // site from SiteMaster table
        unit: 3, // unit from Unit table
        search_tags: 'api, integration, payment',
        work_category: 8, // work category from WorkCategory table
        priority: 'Low',
        start_date: '29-11-2024',
        end_date: '15-12-2024',
        image: 'path/api_docs.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'SEO Optimization',
        description: 'Optimize website for better search engine rankings',
        status: true,
        site: 4, // site from SiteMaster table
        unit: 4, // unit from Unit table
        search_tags: 'SEO, optimization, website',
        work_category: 9, // work category from WorkCategory table
        priority: 'High',
        start_date: '01-12-2024',
        end_date: '07-12-2024',
        image: 'path/seo_guide.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'User Authentication Setup',
        description: 'Setup user authentication system for the platform',
        status: true,
        site: 5, // site from SiteMaster table
        unit: 5, // unit from Unit table
        search_tags: 'authentication, login, security',
        work_category: 6, // work category from WorkCategory table
        priority: 'Medium',
        start_date: '02-12-2024',
        end_date: '10-12-2024',
        image: 'path/auth_setup.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: 'Payment Gateway Setup',
        description: 'Integrate payment gateways for online transactions',
        status: true,
        site: 6, // site from SiteMaster table
        unit: 6, // unit from Unit table
        search_tags: 'payment, gateway, integration',
        work_category: 7, // work category from WorkCategory table
        priority: 'High',
        start_date: '05-12-2024',
        end_date: '15-12-2024',
        image: 'path/payment_gateway_plan.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Website Security Enhancement',
        description: 'Enhance website security features and data protection',
        status: true,
        site: 7, // site from SiteMaster table
        unit: 7, // unit from Unit table
        search_tags: 'security, website, protection',
        work_category: 8, // work category from WorkCategory table
        priority: 'High',
        start_date: '07-12-2024',
        end_date: '20-12-2024',
        image: 'path/security_enhancement.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Content Management Setup',
        description: 'Implement content management system for website',
        status: true,
        site: 8, // site from SiteMaster table
        unit: 8, // unit from Unit table
        search_tags: 'CMS, content management, website',
        work_category: 9, // work category from WorkCategory table
        priority: 'Medium',
        start_date: '10-12-2024',
        end_date: '20-12-2024',
        image: 'path/cms_setup.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Mobile App Development',
        description: 'Develop mobile app for the corporate website',
        status: true,
        site: 9, // site from SiteMaster table
        unit: 9, // unit from Unit table
        search_tags: 'mobile app, development, website',
        work_category: 10, // work category from WorkCategory table
        priority: 'Low',
        start_date: '12-12-2024',
        end_date: '30-12-2024',
        image: 'path/mobile_app_plan.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Site Analytics Setup',
        description: 'Setup analytics tools to track website performance',
        status: true,
        site: 10, // site from SiteMaster table
        unit: 10, // unit from Unit table
        search_tags: 'analytics, website, performance',
        work_category: 6, // work category from WorkCategory table
        priority: 'Medium',
        start_date: '14-12-2024',
        end_date: '22-12-2024',
        image: 'path/analytics_setup.pdf',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TaskMaster', null, {});
  },
};
