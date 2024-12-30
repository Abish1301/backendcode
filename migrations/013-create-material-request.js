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
      a_qty: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      e_date: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      site: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'SiteMaster',
          key: 'id',
        },
      },task: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TaskMaster',
          key: 'id',
        },
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
