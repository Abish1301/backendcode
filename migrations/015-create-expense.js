'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExpenseMaster', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
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
      date: {
        type: Sequelize.STRING(10)
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
      type: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ExpenseHead',
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.STRING(50)
      },
      remark: {
        type: Sequelize.STRING(100)
      },
      attachement: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExpenseMaster');
  }
};