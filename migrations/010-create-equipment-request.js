'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipment_request', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      equipment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'EquipmentMainInventory',
          key: 'id',
        },
      },
      qty: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      site: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SiteMaster',
          key: 'id',
        },
      },task: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TaskMaster',
          key: 'id',
        },
      },
      transfer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      e_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      d: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('equipment_request');
  },
};
