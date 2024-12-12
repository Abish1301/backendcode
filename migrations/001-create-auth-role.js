'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AuthRole', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,  
      },
      code: {
        type: Sequelize.STRING(100),
        allowNull: true,  
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,  
      }, 
      screens: {
        type: Sequelize.JSON,
        allowNull: true,  
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,  
        defaultValue: true,  
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
      d: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default value for `d`
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });


  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('AuthRole');
  },
};
