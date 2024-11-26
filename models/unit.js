const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    static associate(models) {
      // define association here
    }
  }
  Unit.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: 'Unit',
      tableName: 'UnitMaster', 
      freezeTableName: true,   
      timestamps: false,      
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Unit;
};
