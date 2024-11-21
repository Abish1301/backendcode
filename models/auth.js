'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    static associate(models) {
      this.hasOne(models.AuthUser, { foreignKey: 'auth_id', as: 'authuser' });
    }
  }

  Auth.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Auth',
      tableName: 'Auth',
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Auth;
};