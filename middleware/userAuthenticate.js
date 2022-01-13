'use strict';

const auth = require('basic-auth');
const User  = require('../models').User;
const bcrypt = require('bcrypt');


exports.authenticateUser = async( req, res, next) => {
    let message;

    const credentials = auth(req);
    console.log(credentials)
    if (credentials) {
        const allUsers = await User.findAll();
        console.log(allUsers)
        const user = await User.findOne({ where: {emailAddress: credentials.name}});
        console.log("popopopo");
        console.log(user)
        if (user) {
            const authenticated = bcrypt.compareSync(user.password, credentials.pass);
            console.log(authenticated)
            if (authenticated) {
                console.log(`Authentication was successful for email address: ${user.firstName}`);
                req.currentUser = user;
            } else {
                message = `Authentication failed for email address: ${user.firstName}`;
            }
        } else {
            message = `User not found with following email address: ${user.name}`;
        }
    } else {
        message = `Auth header not found`;
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
    next();
    }
};