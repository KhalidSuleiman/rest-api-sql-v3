'use strict';

const auth = require('basic-auth');
let   {User}  = require('../models')
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const like= Sequelize.Op.like;




exports.authenticateUser = async( req, res, next) => {
    let message;

    const credentials = auth(req);
    console.log(credentials)
    if (credentials) {
        
        let user = await User.findOne({ where: {emailAddress :
            {[like] : credentials.name}}});
        if(user === null){
            console.log("\x1b[34m", `User with email address --> ${credentials.name} Not found!`,"\x1b[0m");
            
            
            //res.status(401).json({ message: `User with email address --> ${credentials.name} Not found!` });
        } else {
            if (user) {
                const authenticated = bcrypt.compareSync( credentials.pass,user.password);
                console.log(authenticated)
                if (authenticated) {
                    console.log(`Authentication was successful for email address: ${user.firstName}`);
                    req.currentUser = user;
                } else {
                    message = `Authentication failed for email address: ${user.firstName}`;
                }
            } else {
                message = `User not found with following email address: ${credentials.name}`;
            }
        }
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
    next();
    }
};