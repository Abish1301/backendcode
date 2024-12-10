'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Site, {
        foreignKey: 'site',
        targetKey: 'id',
        
      });
      Task.belongsTo(models.Unit, {
        foreignKey: 'unit',
        targetKey: 'id',
      });
      Task.belongsTo(models.WorkCategory, {
        foreignKey: 'work_category',
        targetKey: 'id',
      });
    }
  }
  Task.init({
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
    site: DataTypes.INTEGER,
    search_tags: DataTypes.STRING,
    unit: DataTypes.INTEGER,
    work_category: DataTypes.INTEGER,
    priority: 
    {
      type: DataTypes.ENUM('High', 'Low', 'Medium'),
      allowNull: false,
    },
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    attachement: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'TaskMaster', 
    freezeTableName: true,   
    timestamps: false,      
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Task;
};