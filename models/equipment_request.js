'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipmentRequest extends Model {
    static associate(models) {
      // Define a many-to-one relationship
      EquipmentRequest.belongsTo(models.EquipmentMainInventory, {
        foreignKey: 'equipment',
        as: 'EquipmentMainInventory',
      });
    }
  }
  EquipmentRequest.init(
    {
      equipment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      site: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      task: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transfer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      e_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      d: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    },
    {
      sequelize,
      modelName: 'equipment_request',
      tableName: 'equipment_request',
      freezeTableName: true,
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return EquipmentRequest;
};
