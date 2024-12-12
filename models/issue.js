'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Issue.belongsTo(models.Site, {
        foreignKey: 'site',
        targetKey: 'id',
        
      });
      Issue.belongsTo(models.Task, {
        foreignKey: 'task',
        targetKey: 'id',
      });
    }
  }
  Issue.init({
    name: DataTypes.STRING,
    remarks: DataTypes.STRING,
    site: DataTypes.INTEGER,
    task: DataTypes.INTEGER,
    d: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    modelName: 'Issue',
    tableName: 'IssueMaster', 
    freezeTableName: true,   
    timestamps: false,      
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Issue;
};