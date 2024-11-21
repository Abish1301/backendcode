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
        type: Sequelize.STRING,
        allowNull: false,  // Ensure this is required
      },
      code: {
        type: Sequelize.STRING,
        allowNull: true,  // Adjust based on your requirements
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,  // Adjust based on your requirements
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,  // Status field should not be null
        defaultValue: true,  // Default status is true (active)
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
    });

    // Add a foreign key to the AuthUser table (if it's not already added)
    await queryInterface.addConstraint('AuthUser', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_role_id',
      references: {
        table: 'AuthRole', // Reference the 'AuthRole' table
        field: 'id',
      },
      onDelete: 'SET NULL',  // When the associated role is deleted, set role_id to NULL
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraint before dropping the table
    await queryInterface.removeConstraint('AuthUser', 'fk_role_id');
    
    // Drop the AuthRole table
    await queryInterface.dropTable('AuthRole');
  },
};
