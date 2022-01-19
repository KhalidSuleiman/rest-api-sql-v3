
/**
 * Defining Course model structure and its associate 
 */
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
      validate: {
        notEmpty: {
            msg: 'Please enter a Course Title.'
        },
        notNull : {
            msg: 'course title is required '

        }
    }
    },
    description : { 
      type : Sequelize.TEXT,
      allowNull : false,
      validate: {
        notEmpty: {
            msg: 'Please enter a course description'
        },
        notNull : {
            msg: 'Course description is required '

        }
    }
    },
    estimatedTime : Sequelize.STRING,
    materialsNeeded : Sequelize.STRING,
   
  }, {sequelize});
  
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as : 'userInfo' ,
      foreignKey: { fieldName : 'userId',
                    allowNull: false,
                  }
                
    }
    
    )};
  return Course;
};