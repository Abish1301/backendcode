'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EquipmentSpend', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      request: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'equipment_request',
          key: 'id',
        },
      },
      qty: {
        type: Sequelize.STRING,
        allowNull: false,
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
      user: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      d: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EquipmentSpend');
  }
};