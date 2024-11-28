'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Data to insert
    const rolesToInsert = [
      {
        name: 'Administrator',
        code: 'ADMIN',
        description: 'System administrator with full access.',
        screens: JSON.stringify({ dashboard: true, settings: true, reports: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Moderator',
        code: 'MODERATOR',
        description: 'Moderator with limited access to user management.',
        screens: JSON.stringify({ dashboard: true, settings: false, reports: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'User',
        code: 'USER',
        description: 'Regular user with basic access.',
        screens: JSON.stringify({ dashboard: true, settings: false, reports: false }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Extract codes from the roles to insert
    const codesToCheck = rolesToInsert.map(role => role.code);

    // Query existing roles based on codes
    const existingRoles = await queryInterface.sequelize.query(
      `SELECT code FROM AuthRole WHERE code IN (${codesToCheck.map(() => '?').join(', ')})`,
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: codesToCheck,
      }
    );

    // Extract existing codes
    const existingCodes = existingRoles.map(role => role.code);

    // Filter out roles that already exist
    const rolesToAdd = rolesToInsert.filter(role => !existingCodes.includes(role.code));

    // Insert roles that are not duplicates
    if (rolesToAdd.length > 0) {
      await queryInterface.bulkInsert('AuthRole', rolesToAdd);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes by deleting the data
    await queryInterface.bulkDelete('AuthRole', null, {});
  }
};
