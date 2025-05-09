'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaterialRequest extends Model {
    static associate(models) {
      // Define a many-to-one relationship
      MaterialRequest.belongsTo(models.MaterialMainInventory, {
        foreignKey: 'material',
        as: 'MaterialMainInventory',
      });
      MaterialRequest.belongsTo(models.Site, {
        foreignKey: 'site',
        targetKey: 'id',
        
      });
      MaterialRequest.belongsTo(models.Task, {
        foreignKey: 'task',
        targetKey: 'id',
      });
    }
  }
  MaterialRequest.init(
    {
      material: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      a_qty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      e_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      site: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      task: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      transfer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      m_status: {
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
      modelName: 'material_request',
      tableName: 'material_request',
      freezeTableName: true,
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return MaterialRequest;
};
