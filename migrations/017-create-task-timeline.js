'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaskTimeline', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      entry_date: {
        type: Sequelize.STRING(10)
      },
      percentage: {
        type: Sequelize.STRING(5)
      },
      total_work_done: {
        type: Sequelize.STRING(20)
      },
      skilled_worker: {
        type: Sequelize.INTEGER
      },
      unskilled_worker: {
        type: Sequelize.INTEGER
      },
      total_working_hours: {
        type: Sequelize.STRING(20)
      },
      remarks: {
        type: Sequelize.STRING(100)
      },
      image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('TaskTimeline');
  }
};