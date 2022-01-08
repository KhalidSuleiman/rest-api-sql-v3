'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {}

  Course.init({
    title : DataTypes.STRING,
    description : DataTypes.TEXT,
    estimatedTime : DataTypes.STRING,
    materialsNeeded : DataTypes.STRING,
    userId :  DataTypes.STRING,
  }, {sequelize});
  
  Course.associations = (models) => {
    Course.belongsTo(models.Users)
  };
  return Course;
};