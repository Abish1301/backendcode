'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EquipmentMainInventory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unit: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UnitMaster',
          key: 'id',
        },},
      name: {
        type: Sequelize.STRING(50)
      },
      code: {
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.STRING(100)
      },
      category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MaterialCategoryMaster',
          key: 'id',
        },
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      alert_min_stock: {
        type: Sequelize.STRING(20)
      },
      unit_rent_price: {
        type: Sequelize.STRING(20)
      },
      brand_name: {
        type: Sequelize.STRING(50)
      },
      dimensions: {
        type: Sequelize.STRING(50)
      },
      weight: {
        type: Sequelize.STRING(20)
      },
      color: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EquipmentMainInventory');
  }
};