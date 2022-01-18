'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}

  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title : {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description : Sequelize.TEXT,
    estimatedTime : Sequelize.STRING,
    materialsNeeded : Sequelize.STRING,
   
  }, {sequelize});
  
  Course.associations = (models) => {
    Course.belongsTo(models.Users, {
      as: 'userInfo', 
      foreignKey: {
          fieldName: 'userId',
          allowNull: false,
          /*validate: {
              notNull: {
                msg: 'A user id is required'
              },
              notEmpty: {
                msg: 'Please provide a user id'
              }
          }*/
      },

    })
  };
  return Course;
};