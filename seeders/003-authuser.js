'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AuthUser',[
      { id: 1, auth_id: 1, code: 'A001', name: 'Admin One', description: 'Admin user with full access', profile_image: 'admin1.jpg', email: 'admin1@company.com', mobile: '1234567890', address: '123 Admin Lane', role_id: null, type: 'Admin', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 2, auth_id: 2, code: 'I001', name: 'Incharge One', description: 'Incharge user', profile_image: 'incharge1.jpg', email: 'incharge1@company.com', mobile: '2345678901', address: '234 Incharge Lane', role_id: null, type: 'Incharge', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 3, auth_id: 3, code: 'U001', name: 'User One', description: 'Standard user with Viewer role', profile_image: 'user1.jpg', email: 'user1@company.com', mobile: '3456789012', address: '345 User Lane', role_id: 1, type: 'User', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 4, auth_id: 4, code: 'A002', name: 'Admin Two', description: 'Admin user with full access', profile_image: 'admin2.jpg', email: 'admin2@company.com', mobile: '4567890123', address: '456 Admin Lane', role_id: null, type: 'Admin', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 5, auth_id: 5, code: 'I002', name: 'Incharge Two', description: 'Incharge user', profile_image: 'incharge2.jpg', email: 'incharge2@company.com', mobile: '5678901234', address: '567 Incharge Lane', role_id: null, type: 'Incharge', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 6, auth_id: 6, code: 'U002', name: 'User Two', description: 'Standard user with Editor role', profile_image: 'user2.jpg', email: 'user2@company.com', mobile: '6789012345', address: '678 User Lane', role_id: 2, type: 'User', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 7, auth_id: 7, code: 'A003', name: 'Admin Three', description: 'Admin user with full access', profile_image: 'admin3.jpg', email: 'admin3@company.com', mobile: '7890123456', address: '789 Admin Lane', role_id: null, type: 'Admin', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 8, auth_id: 8, code: 'I003', name: 'Incharge Three', description: 'Incharge user', profile_image: 'incharge3.jpg', email: 'incharge3@company.com', mobile: '8901234567', address: '890 Incharge Lane', role_id: null, type: 'Incharge', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 9, auth_id: 9, code: 'U003', name: 'User Three', description: 'Standard user with Manager role', profile_image: 'user3.jpg', email: 'user3@company.com', mobile: '9012345678', address: '901 User Lane', role_id: 3, type: 'User', status: true, created_at: new Date(), updated_at: new Date() },
      { id: 10, auth_id: 10, code: 'A004', name: 'Admin Four', description: 'Admin user with full access', profile_image: 'admin4.jpg', email: 'admin4@company.com', mobile: '0123456789', address: '012 Admin Lane', role_id: null, type: 'Admin', status: true, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AuthUser', null, {});
  },
};
