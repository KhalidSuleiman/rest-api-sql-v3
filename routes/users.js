
'use strict'
const  User = require('../models/User').User;    
const { authenticateUser } = require('../middleware/userAuthenticate');
// const createError = require('http-errors');
const { asyncHandler } = require('../middleware/asyncHandler');
const express = require('express');
const router = express.Router();


router.get('/user', authenticateUser, asyncHandler(async (req,res)=> {
    
    const user = await req.currentUser;
    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
    
}));


router.post('/user', asyncHandler(async (req, res)=>{

    try{
        console.log("____________________")
        let User1 = req.body;
        console.log(User1);
        console.log("====================")
        const user = await User.create(req.body);
        res,location('/');
        res.status(201).json(user);

    }catch(err){
       console.log(err); 
       if (
        err.name === 'SequelizeValidationError' ||
        err.name === 'SequelizeUniqueConstraintError'
      ) {
        const errors = err.errors.map((errs) => errs.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }

}));

module.exports = router;