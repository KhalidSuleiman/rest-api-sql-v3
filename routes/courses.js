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
    
}); 
    // console.log(courses.map(course => course.get({ plain: true })));   
    res.json(courses);
}));


router.get('/courses/:id', asyncHandler( async (req, res, next)=>{
    const courses = await Course.findByPk( req.params.id, {
        include: [
            {
              model: User,
              as: 'userInfo',
              attributes: {exclude: ['password','createdAt','updatedAt']}, 
              
            }
          ],
          attributes: {exclude: ['createdAt','updatedAt']}            
    
});   
res.json(courses);
}))

router.post('/courses',authenticateUser, asyncHandler( async (req, res, next)=>{
   
    try{
        
        const course = await Course.create(req.body);
        res.location('/');
        res.status(201).json(course);

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

router.put('/courses/:id',authenticateUser, asyncHandler( async (req, res, next)=>{
    const course = await Course.findByPk( req.params.id)
    
    try{
        
        await course.update(req.body);
        // res.location('/');
        // res.status(204).json(updatedCourse );
        res.status(204);

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
    
}))

router.delete('/courses/:id',authenticateUser, asyncHandler(async (req, res, next)=>{
    const course = await Course.findByPk( req.params.id)
    
    try{
        
        await course.destroy();
        // res.location('/');
        // res.status(204).json(updatedCourse );
        res.status(204);

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
}))






module.exports = router;






