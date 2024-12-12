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
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW

      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW

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
      profile_image: {
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
      incharge: {
        type: Sequelize.INTEGER,
        references: {
          model: 'AuthUser',
          key: 'id',
        },
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