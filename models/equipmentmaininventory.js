'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipmentMainInventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EquipmentMainInventory.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    unit: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    in_stock: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0',
    },
    alert_min_stock: DataTypes.STRING,
    unit_rent_price: DataTypes.STRING,
    brand_name: DataTypes.STRING,
    dimensions: DataTypes.STRING,
    weight: DataTypes.STRING,
    color: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    d: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'EquipmentMainInventory',
    tableName: 'EquipmentMainInventory', 
    freezeTableName: true,   
    timestamps: false,      
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return EquipmentMainInventory;
};