'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuthUser extends Model {
    static associate(models) {
      // Define association with Role
      this.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'authrole',
      });
      // Define association with Auth
      this.belongsTo(models.Auth, {
        foreignKey: 'auth_id',  // Assuming auth_id is the foreign key in AuthUser
        as: 'auth',  // This allows you to access the associated Auth model via authUser.auth
      });
    }
  }

  AuthUser.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      profile_image: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      address: DataTypes.TEXT,
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('Admin', 'User', 'Incharge'),
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      auth_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      d: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'AuthUser',
      tableName: 'AuthUser',
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeValidate: (authUser) => {
          // Ensure role_id is NULL for Admin or Incharge types
          if (['Admin', 'Incharge'].includes(authUser.type)) {
            authUser.role_id = null;
          }
        },
      },
    }
  );

  return AuthUser;
};