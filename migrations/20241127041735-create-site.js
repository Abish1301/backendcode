'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SiteMaster', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      d: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      start_date: {
        type: Sequelize.STRING(10)
      },
      end_date: {
        type: Sequelize.STRING(10)
      },
      description: {
        type: Sequelize.STRING(100)
      },
      site_profile_image: {
        type: Sequelize.STRING
      },
      location_name: {
        type: Sequelize.STRING(50)
      },
      location_description: {
        type: Sequelize.STRING(100)
      },
      geo_location: {
        type: Sequelize.STRING(100)
      },
      site_incharge: {
        type: Sequelize.STRING(50)
      },
      estimation_amount: {
        type: Sequelize.STRING(50)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SiteMaster');
  }
};