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
        type: Sequelize.STRING,
        allowNull: true,  // Adjust based on your requirements
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,  // Adjust based on your requirements
      },
      profile_image: {
        type: Sequelize.STRING,
        allowNull: true,  // Adjust based on your requirements
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,  // Adjust based on your requirements
        unique: true,  // Assuming unique email for each user
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true,  // Adjust based on your requirements
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,  // Adjust based on your requirements
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,  // This will be set to null for 'Admin' or 'Incharge' types
        references: {
          model: 'AuthRole',  // Assuming there's a 'Roles' table in your database
          key: 'id',
        },
        onDelete: 'SET NULL',  // When a Role is deleted, set the role_id to null
      },
      type: {
        type: Sequelize.ENUM('Admin', 'User', 'Incharge'),
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,  // Adjust based on your requirements
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
      auth_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Auth',  // Assuming there's an 'Auth' table in your database
          key: 'id',
        },
        onDelete: 'CASCADE',  // When an Auth record is deleted, cascade delete the associated AuthUser
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AuthUser');
  },
};
