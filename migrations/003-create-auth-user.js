'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AuthUser', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING(100),
        allowNull: true, 
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,  
      },
      profile_image: {
        type: Sequelize.STRING,
        allowNull: true,  
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,  
        unique: true, 
      },
      mobile: {
        type: Sequelize.STRING(20),
        allowNull: true, 
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true, 
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'AuthRole',  
          key: 'id',
        },
        onDelete: 'SET NULL',  
      },
      type: {
        type: Sequelize.ENUM('Admin', 'User', 'Incharge'),
        allowNull: false,
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,  
        defaultValue: true,  
      },
      d: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default value for `d`
      },
      auth_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Auth', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AuthUser');
  },
};
