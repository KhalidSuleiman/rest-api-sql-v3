
'use strict'
const  {User} = require('../models')    
const { authenticateUser } = require('../middleware/userAuthenticate');
// const createError = require('http-errors');
const { asyncHandler } = require('../middleware/asyncHandler');
const express = require('express');
const router = express.Router();

/**
 * GET ../api/Users to retrieve all users available  
 */
router.get('/users', authenticateUser, asyncHandler(async (req,res)=> {
    
    const user = await req.currentUser;
    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
    
    
}));

/**
 * POST ../api/USERS to create a new User 
 */
router.post('/users', asyncHandler(async (req, res)=>{

    try{
        
        const user = await User.create(req.body);
        res.location('/');
        res.status(201);

    }catch(err){
       
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