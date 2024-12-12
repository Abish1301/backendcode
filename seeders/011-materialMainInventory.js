'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MaterialMainInventory', [
      {
        name: 'Steel Rod',
        code: 'SR001',
        hsn_code: '7308',
        description: 'High-strength steel rod for construction purposes',
        unit: 1,
        category: 1,
        image: 'path/steel_rod.jpg',
        alert_min_stock: '50',
        unit_rent_price: '10',
        brand_name: 'StrongSteel',
        dimensions: '10mm x 3m',
        weight: '5kg',
        color: 'Silver',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cement Bag',
        code: 'CB002',
        description: '50kg bag of premium cement',
        unit: 2,
        category: 2,
        image: 'path/cement_bag.jpg',
        alert_min_stock: '20',
        unit_rent_price: '0',
        brand_name: 'UltraCem',
        dimensions: '50kg',
        weight: '50kg',
        color: 'Gray',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bricks',
        code: 'BR003',
        hsn_code: '',
        description: 'Standard red bricks for building',
        unit: 3,
        category: 3,
        image: 'path/bricks.jpg',
        alert_min_stock: '100',
        unit_rent_price: '0',
        brand_name: 'BrickMaster',
        dimensions: '9in x 4in x 3in',
        weight: '2kg',
        color: 'Red',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MaterialMainInventory', null, {});
  },
};
