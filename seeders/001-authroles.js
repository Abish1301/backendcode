'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Data to insert
    const rolesToInsert =  [
      {
        id: 1,
        name: 'Viewer',
        code: 'VWR',
        description: 'Basic viewer role',
        screens: JSON.stringify({ dashboard: true, settings: false, reports: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Editor',
        code: 'EDT',
        description: 'Can edit content',
        screens: JSON.stringify({ dashboard: true, settings: true, reports: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Manager',
        code: 'MGR',
        description: 'Managerial privileges',
        screens: JSON.stringify({ dashboard: true, settings: true, reports: true, admin: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Supervisor',
        code: 'SUP',
        description: 'Supervisory role',
        screens: JSON.stringify({ dashboard: true, settings: false, reports: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'Contributor',
        code: 'CNT',
        description: 'Contributes to projects',
        screens: JSON.stringify({ dashboard: true, settings: true, projects: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: 'Operator',
        code: 'OPR',
        description: 'Operator access',
        screens: JSON.stringify({ dashboard: true, settings: false }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Coordinator',
        code: 'COR',
        description: 'Coordinates tasks',
        screens: JSON.stringify({ dashboard: true, settings: true, tasks: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Analyst',
        code: 'ANL',
        description: 'Performs analysis',
        screens: JSON.stringify({ dashboard: true, settings: true, analysis: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Support',
        code: 'SUPP',
        description: 'Supports operations',
        screens: JSON.stringify({ dashboard: true, settings: false, support: true }),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Tester',
        code: 'TST',
        description: 'Tests functionality',
        screens: JSON.stringify({ dashboard: true, settings: false, test: true }),
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
