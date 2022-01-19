'use strict';

const auth = require('basic-auth');
let   {User}  = require('../models')
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const like= Sequelize.Op.like;




exports.authenticateUser = async( req, res, next) => {
    let message;

    const credential =auth(req)

    if (credential){
        // find the user 
        const user = await User.findOne({ where: {emailAddress: credential.name}  });
        if(user){ // if the user name is found in database then check his password 
            const authenticated = bcrypt.compareSync(credential.pass, user.password);
            if(authenticated ){ // if paswrd match 
                req.currentUser = user;  // store the user object into currentUser 
                res.status(200)//.json(user)
            }else {
                message = `Authentication failure.. user: ${user.emailAddress} not found or wrong password`;
            }

        }else message = `Authentication failure.. user: ${credential.emailAddress} not found or wrong password`;
    }else {
        message = 'Authentication failed';
    }
    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }
};