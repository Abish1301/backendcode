'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SiteMaster', [
      {
        name: 'Construction Site Alpha',
        description: 'Primary construction site for urban development.',
        profile_image: 'path/alpha_site_profile.jpg',
        location_name: 'Downtown',
        location_description: 'Central city area with high population density.',
        geo_location: 'ST_GeomFromText ,POINT(40.7128 -74.0060)', 
        start_date: '01-11-2024',
        incharge: 3,
        estimation_amount: '500000.00',
        end_date: '31-05-2025',
        created_at: new Date(),
        updated_at: new Date(),
        status:true,
      },
      {
        name: 'Construction Site Beta',
        description: 'Suburban area site for residential projects.',
        profile_image: 'path/beta_site_profile.jpg',
        location_name: 'Suburb Heights',
        location_description: 'Quiet suburban area with scenic views.',
        geo_location: 'ST_GeomFromText , POINT(34.0522 -118.2437)',
        start_date: '01-12-2024',
        incharge: 3,
        estimation_amount: '300000.00',
        end_date: '30-06-2025',
        created_at: new Date(),
        updated_at: new Date(),
        status:true,

      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SiteMaster', null, {});
  },
};
