'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Site extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Site.belongsTo(models.AuthUser, {
        foreignKey: 'incharge',
        as: 'AuthUser',
      });    }
  }
  Site.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
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
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    description: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    location_name: DataTypes.STRING,
    location_description: DataTypes.STRING,
    geo_location: DataTypes.STRING,
    incharge: DataTypes.INTEGER,
    estimation_amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Site',
    tableName: 'SiteMaster', 
    freezeTableName: true,   
    timestamps: false,      
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Site;
};