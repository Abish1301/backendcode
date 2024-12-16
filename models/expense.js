'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expense.belongsTo(models.Site, {
        foreignKey: 'site',
        targetKey: 'id',
        
      });
      Expense.belongsTo(models.Task, {
        foreignKey: 'task',
        targetKey: 'id',
      });
       Expense.belongsTo(models.ExpenseHead, {
        foreignKey: 'type',
        targetKey: 'id',
      });    }
  }
  Expense.init({
    name: DataTypes.STRING,
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
    date: DataTypes.STRING,
    site: DataTypes.INTEGER,
    task: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    remark: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'ExpenseMaster', 
    freezeTableName: true,   
    timestamps: false,      
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Expense;
};