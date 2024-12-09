'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.hasMany(models.AuthUser, { foreignKey: 'role_id', as: 'authuser' });
    }
  }

  Role.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
      screens: DataTypes.JSON,
      d: DataTypes.BOOLEAN,
      user: DataTypes.INTEGER,
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
      modelName: 'Role',
      tableName: 'AuthRole',
      freezeTableName: true,
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',

    }
  );

  return Role;
};
