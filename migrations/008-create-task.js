'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaskMaster', {
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
        type: Sequelize.STRING(100)
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
      unit:{
        type: Sequelize.INTEGER,
        references: {
          model: 'UnitMaster',
          key: 'id',
        },
 
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
      site: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SiteMaster',
          key: 'id',
        },
      },
      search_tags: {
        type: Sequelize.STRING(50)
      },
      work_category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'WorkCategory',
          key: 'id',
        },
      },
      priority: {
        type: Sequelize.ENUM('High', 'Low', 'Medium'),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.STRING(10)
      },
      end_date: {
        type: Sequelize.STRING(10)
      },
      image: {
        type: Sequelize.STRING
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TaskMaster');
  }
};