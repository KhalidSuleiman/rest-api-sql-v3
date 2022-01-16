'use strict';

//users model
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {
        static associate(models) {
            User.hasMany(models.Course, {
                foreignKey: {
                    fieldName: 'userId',
                    allowNull: false,
                    validate: {
                        notNull: {
                            msg: 'A user ID is required.'
                        },
                        notEmpty: {
                            msg: 'Please provide a user ID'
                        }
                    }
                },
            }) 
         }
    }

        User.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please enter a valid firstName.'
                    },
                    notNull : {
                        msg: 'First Name is required '

                    }
                }
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Please enter a valid lastName.'
                    },
                    notNull : {
                        msg: 'Last Name is required '

                    }
                }
            },
            emailAddress: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Email address cannot be empty.'
                    },
                    isEmail: {
                        msg: 'Please enter a valid email address.'
                    }
                },
                unique: {
                    args: true,
                    msg: 'Email address is already in use.'
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                set(val) { // custom set value
                    const hashedPassword = bcrypt.hashSync(val, 10);
                    this.setDataValue('password', hashedPassword); // replace with the hashed password
                },
                validate: {
                    notEmpty: {
                        msg: 'Please enter a password.'
                    },
                    notNull : {
                        msg: 'Email is required '

                    }
                }
            }
        }, { sequelize });
        
         
    return User;
};