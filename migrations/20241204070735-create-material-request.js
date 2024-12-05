'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('material_request', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      material: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MaterialMainInventory',
          key: 'id',
        },
      },
      qty: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      site: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      task: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transfer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      m_status: {
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
    await queryInterface.dropTable('material_request');
  },
};
