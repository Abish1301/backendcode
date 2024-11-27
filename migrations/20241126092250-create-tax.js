'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaxMaster', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.STRING(50)
      },
      start_date: {
        type: Sequelize.STRING(10)
      },
      end_date: {
        type: Sequelize.STRING(10)
      },
      percentage: {
        type: Sequelize.DECIMAL(5, 2),
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      d: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TaxMaster');
  }
};