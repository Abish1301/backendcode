'use strict';
 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Otp', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: false
      },
 
    });
  },
 
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Otp');
  }
};
 
 