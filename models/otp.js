'use strict';
const { Model } = require('sequelize');
 
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    static associate(models) {
      // define association here
    }
  }
 
  Otp.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
 
  }, {
    sequelize,
    modelName: 'Otp',
    tableName: 'Otp',
    freezeTableName: true,
    timestamps: false,
  });
 
  return Otp;
};
 
 