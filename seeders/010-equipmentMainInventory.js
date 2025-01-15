'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EquipmentMainInventory', [
      { 
        id: 1, name: 'Excavator', code: 'EXC001', description: 'Excavator for digging and earth-moving', 
        unit: 4, category: 4, image: 'path/excavator.jpg', alert_min_stock: '2', unit_rent_price: '1000', brand_name: 'Caterpillar', 
        dimensions: '15ft x 8ft', weight: '5000kg', color: 'Yellow', status: true, created_at: new Date(), updated_at: new Date()
      },
      { 
        id: 2, name: 'Cement Mixer', code: 'CMX002', description: 'Portable cement mixer for construction projects', 
        unit: 4, category: 4, image: 'path/cement_mixer.jpg', alert_min_stock: '3', unit_rent_price: '1500', brand_name: 'MixerPro', 
        dimensions: '6ft x 4ft', weight: '300kg', color: 'Orange', status: true, created_at: new Date(), updated_at: new Date()
      },
      { 
        id: 3, name: 'Forklift', code: 'FLK003', description: 'Forklift for heavy material lifting', 
        unit: 4, category: 4, image: 'path/forklift.jpg', alert_min_stock: '2', unit_rent_price: '5000', brand_name: 'Toyota', 
        dimensions: '10ft x 6ft', weight: '3000kg', color: 'Red', status: true, created_at: new Date(), updated_at: new Date()
      },
      { 
        id: 4, name: 'Tower Crane', code: 'TC004', description: 'Tower crane for high-rise construction', 
        unit: 4, category: 4, image: 'path/tower_crane.jpg', alert_min_stock: '1', unit_rent_price: '10000', brand_name: 'CraneTech', 
        dimensions: '30ft x 12ft', weight: '8000kg', color: 'Blue', status: true, created_at: new Date(), updated_at: new Date()
      },
      { 
        id: 5, name: 'Bulldozer', code: 'BLD005', description: 'Heavy-duty bulldozer for construction site preparation', 
        unit: 4, category: 4, image: 'path/bulldozer.jpg', alert_min_stock: '2', unit_rent_price: '15000', brand_name: 'Komatsu', 
        dimensions: '20ft x 8ft', weight: '10000kg', color: 'Yellow', status: true, created_at: new Date(), updated_at: new Date()
      },
      { 
        id: 6, name: 'Backhoe Loader', code: 'BHL006', description: 'Backhoe loader for small excavation projects', 
        unit: 4, category: 4, image: 'path/backhoe_loader.jpg', alert_min_stock: '2', unit_rent_price: '2000', brand_name: 'John Deere', 
        dimensions: '8ft x 6ft', weight: '2500kg', color: 'Green', status: true, created_at: new Date(), updated_at: new Date()
      },
      { 
        id: 7, name: 'Concrete Pump', code: 'CP007', description: 'Concrete pump for pouring concrete in foundations', 
        unit: 4, category: 4, image: 'path/concrete_pump.jpg', alert_min_stock: '1', unit_rent_price: '12000', brand_name: 'Putzmeister', 
        dimensions: '18ft x 6ft', weight: '4000kg', color: 'Yellow', status: true, created_at: new Date(), updated_at: new Date()
      },
      { 
        id: 8, name: 'Wheel Loader', code: 'WL008', description: 'Wheel loader for loading materials', 
        unit: 4, category: 4, image: 'path/wheel_loader.jpg', alert_min_stock: '2', unit_rent_price: '2500', brand_name: 'Volvo', 
        dimensions: '15ft x 7ft', weight: '5000kg', color: 'Blue', status: true, created_at: new Date(), updated_at: new Date()
      },
      { 
        id: 9, name: 'Dump Truck', code: 'DT009', description: 'Dump truck for transporting heavy materials', 
        unit: 4, category: 4, image: 'path/dump_truck.jpg', alert_min_stock: '2', unit_rent_price: '3000', brand_name: 'Ford', 
        dimensions: '20ft x 8ft', weight: '8000kg', color: 'White', status: true, created_at: new Date(), updated_at: new Date()
      },
      { 
        id: 10, name: 'Scissor Lift', code: 'SL010', description: 'Scissor lift for reaching higher areas on construction sites', 
        unit: 4, category: 4, image: 'path/scissor_lift.jpg', alert_min_stock: '2', unit_rent_price: '5000', brand_name: 'Skyjack', 
        dimensions: '12ft x 6ft', weight: '1000kg', color: 'Orange', status: true, created_at: new Date(), updated_at: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EquipmentMainInventory', null, {});
  },
};
