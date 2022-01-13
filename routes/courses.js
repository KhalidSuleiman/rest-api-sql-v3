const {authenticateUser} = require('../middleware/userAuthenticate');
const {asyncHandler} = require('../middleware/asyncHandler');
const {Courses} = require('../models/Course');
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/courses', asyncHandler(async (req, rea, next)=>{
    try{
        const courses = await Courses.findAll({
            include:[
                {
                    model: User
                },
            ],
        })
        res.status(200).json(courses);
    }catch(err){

    }
}));


router.get('/courses/:id', asyncHandler((req, res, next)=>{
    
}))

router.post('/courses',authenticateUser, asyncHandler((req, res, next)=>{
    
}))

router.put('/courses/:id',authenticateUser, asyncHandler((req, res, next)=>{
    
}))

router.delete('/courses/:id',authenticateUser, asyncHandler((req, res, next)=>{
    
}))






module.exports = router;






