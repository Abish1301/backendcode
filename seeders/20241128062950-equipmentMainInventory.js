'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EquipmentMainInventory', [
      {
        name: 'Excavator',
        code: 'EX001',
        description: 'Heavy-duty excavator for construction work',
        unit: 1,
        category: 201,
        equipment_image: 'path/excavator.jpg',
        alert_min_stock: '1',
        unit_rent_price: '5000',
        brand_name: 'Caterpillar',
        dimensions: '20ft x 8ft x 10ft',
        weight: '20 tons',
        color: 'Yellow',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bulldozer',
        code: 'BD002',
        description: 'Powerful bulldozer for leveling surfaces',
        unit: 2,
        category: 202,
        equipment_image: 'path/bulldozer.jpg',
        alert_min_stock: '1',
        unit_rent_price: '4500',
        brand_name: 'Komatsu',
        dimensions: '18ft x 9ft x 9ft',
        weight: '18 tons',
        color: 'Blue',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Crane',
        code: 'CR003',
        description: 'Tower crane for lifting heavy materials',
        unit: 3,
        category: 203,
        equipment_image: 'path/crane.jpg',
        alert_min_stock: '1',
        unit_rent_price: '7000',
        brand_name: 'Liebherr',
        dimensions: '50ft height',
        weight: '30 tons',
        color: 'Red',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentMainInventory', null, {});
  },
};
