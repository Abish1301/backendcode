'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WorkCategory.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
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
    type:{
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'WorkCategory',
    tableName: 'WorkCategory', 
    freezeTableName: true,   
    timestamps: false,      
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return WorkCategory;
};