'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskTimeline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TaskTimeline.belongsTo(models.Task, {
        foreignKey: 'task',
        targetKey: 'id',
      });
      TaskTimeline.belongsTo(models.Site, {
        foreignKey: 'site',
        targetKey: 'id',
      });    }
  }
  TaskTimeline.init({
    site: DataTypes.INTEGER,
    task: DataTypes.INTEGER,
    entry_date: DataTypes.STRING,
    percentage: DataTypes.STRING,
    total_work_done: DataTypes.STRING,
    skilled_worker: DataTypes.INTEGER,
    unskilled_worker: DataTypes.INTEGER,
    total_working_hours: DataTypes.STRING,
    remarks: DataTypes.STRING,
    image: DataTypes.STRING,
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
  },
  {
    sequelize,
    modelName: 'TaskTimeline',
    tableName: 'TaskTimeline', 
    freezeTableName: true,   
    timestamps: false,      
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return TaskTimeline;
};