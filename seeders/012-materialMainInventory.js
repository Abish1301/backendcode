'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MaterialMainInventory', [
      {
        id: 1, name: 'Wiring Cable', code: 'WC001', hsn_code: '853690', description: 'High-quality wiring cable for electrical work',
        unit: 1, category: 1, image: 'path/wiring_cable.jpg', alert_min_stock: '50', unit_rent_price: '100', brand_name: 'ABC Cables',
        dimensions: '10m', weight: '2kg', color: 'Black', status: true, created_at: new Date(), updated_at: new Date(), tax: 1
      },
      {
        id: 2, name: 'PVC Pipes', code: 'PVC002', hsn_code: '391723', description: 'Durable PVC pipes for plumbing systems',
        unit: 2, category: 2, image: 'path/pvc_pipes.jpg', alert_min_stock: '100', unit_rent_price: '50', brand_name: 'PlumbPro',
        dimensions: '20ft', weight: '10kg', color: 'White', status: true, created_at: new Date(), updated_at: new Date(), tax: 2
      },
      {
        id: 3, name: 'Wooden Planks', code: 'WP003', hsn_code: '440710', description: 'Quality wooden planks for carpentry',
        unit: 3, category: 3, image: 'path/wooden_planks.jpg', alert_min_stock: '200', unit_rent_price: '200', brand_name: 'WoodWorks',
        dimensions: '8ft x 1ft x 0.5ft', weight: '15kg', color: 'Brown', status: true, created_at: new Date(), updated_at: new Date(), tax: 1
      },
      {
        id: 4, name: 'Cement Bags', code: 'CMT004', hsn_code: '252329', description: 'High-strength cement bags for construction',
        unit: 4, category: 4, image: 'path/cement_bags.jpg', alert_min_stock: '300', unit_rent_price: '150', brand_name: 'UltraCem',
        dimensions: '50kg per bag', weight: '50kg', color: 'Gray', status: true, created_at: new Date(), updated_at: new Date(), tax: 2
      },
      {
        id: 5, name: 'Steel Rods', code: 'SR005', hsn_code: '721420', description: 'High-tensile steel rods for reinforcement',
        unit: 5, category: 6, image: 'path/steel_rods.jpg', alert_min_stock: '100', unit_rent_price: '300', brand_name: 'SteelCo',
        dimensions: '12ft', weight: '40kg', color: 'Silver', status: true, created_at: new Date(), updated_at: new Date(), tax: 2
      },
      {
        id: 6, name: 'Ceramic Tiles', code: 'CT006', hsn_code: '690722', description: 'High-quality ceramic tiles for flooring',
        unit: 6, category: 8, image: 'path/ceramic_tiles.jpg', alert_min_stock: '500', unit_rent_price: '75', brand_name: 'TileMaster',
        dimensions: '1ft x 1ft', weight: '1kg', color: 'Beige', status: true, created_at: new Date(), updated_at: new Date(), tax: 1
      },
      {
        id: 7, name: 'Paint', code: 'PT007', hsn_code: '320810', description: 'Water-based paint for interior and exterior',
        unit: 7, category: 9, image: 'path/paint.jpg', alert_min_stock: '50', unit_rent_price: '500', brand_name: 'PaintPlus',
        dimensions: '1 Liter', weight: '1kg', color: 'White', status: true, created_at: new Date(), updated_at: new Date(), tax: 2
      },
      {
        id: 8, name: 'Safety Helmets', code: 'SH008', hsn_code: '650610', description: 'Safety helmets for workers',
        unit: 8, category: 10, image: 'path/safety_helmets.jpg', alert_min_stock: '50', unit_rent_price: '100', brand_name: 'SafeGuard',
        dimensions: 'One size', weight: '0.5kg', color: 'Yellow', status: true, created_at: new Date(), updated_at: new Date(), tax: 2
      },
      {
        id: 9, name: 'Construction Gloves', code: 'CG009', hsn_code: '611620', description: 'Heavy-duty gloves for construction workers',
        unit: 8, category: 10, image: 'path/construction_gloves.jpg', alert_min_stock: '100', unit_rent_price: '50', brand_name: 'GuardHands',
        dimensions: 'One size', weight: '0.2kg', color: 'Red', status: true, created_at: new Date(), updated_at: new Date(), tax: 1
      },
      {
        id: 10, name: 'Steel Beams', code: 'SB010', hsn_code: '730890', description: 'Heavy-duty steel beams for structural reinforcement',
        unit: 5, category: 6, image: 'path/steel_beams.jpg', alert_min_stock: '30', unit_rent_price: '1000', brand_name: 'BeamTech',
        dimensions: '12ft x 6in', weight: '100kg', color: 'Silver', status: true, created_at: new Date(), updated_at: new Date(), tax: 2
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MaterialMainInventory', null, {});
  },
};
