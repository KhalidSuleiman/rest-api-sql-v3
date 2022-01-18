const {authenticateUser} = require('../middleware/userAuthenticate');
const {asyncHandler} = require('../middleware/asyncHandler');
const {Course} = require('../models');
const {User} = require('../models');
const express = require('express');
const { userInfo } = require('os');
const router = express.Router();

router.get('/courses', asyncHandler(async (req, res) => {
    
    const courses = await Course.findAll( {
        include: [
            {
              model: User,
              as: 'userInfo',
              attributes: {exclude: ['password','createdAt','updatedAt']}, 
              
            }
          ],
          attributes: {exclude: ['createdAt','updatedAt']}            
    
}
   
        //{ 
       // include: [{ model: User, 
                   // as: 'userInfo',
                    //attributes: {exclude: ['password,createdAt','updatedAt']} 
                //}] 
                //}
                ); 
    console.log(courses.map(course => course.get({ plain: true })));   
    res.json(courses);
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






