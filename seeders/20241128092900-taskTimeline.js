'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TaskTimeline', [
      {
        site: 1,
        task: 101,
        entry_date: '26-11-2024', 
        percentage: '20%',
        total_work_done: '20',
        skilled_worker: 5,
        unskilled_worker: 10,
        total_working_hours: '40',
        remarks: 'Completed as per schedule',
        attachement1: 'path/foundation_report.pdf',
        // attachement2: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        site: 2,
        task: 102,
        entry_date: '27-11-2024', 
        percentage: '50%',
        total_work_done: '50',
        skilled_worker: 3,
        unskilled_worker: 2,
        total_working_hours: '25',
        remarks: 'Need approval for next phase',
        attachement1: 'path/db_structure.png',
        attachement2: 'path/approval_notes.docx',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        site: 3,
        task: 103,
        entry_date: '28-11-2024', 
        percentage: '10%',
        total_work_done: '10',
        skilled_worker: 2,
        unskilled_worker: 1,
        total_working_hours: '15',
        remarks: 'Delay due to external dependencies',
        // attachement1: null,
        attachement2: 'path/dependency_log.docx',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TaskTimeline', null, {});
  },
};
