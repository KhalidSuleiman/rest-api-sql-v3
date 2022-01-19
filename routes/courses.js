const {authenticateUser} = require('../middleware/userAuthenticate');
const {asyncHandler} = require('../middleware/asyncHandler');
const {Course} = require('../models');
const {User} = require('../models');
const express = require('express');
const { userInfo } = require('os');
const router = express.Router();
const auth = require('basic-auth');

/**
 * GET ../api/Courses to get all courses available in db 
 */
router.get('/courses',  asyncHandler(async (req, res) => {
    
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

/**
 * GET ../api/Courses/:id to get retrieve specific course from db  
 */
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
/**
 * POST ../api/Courses create new Courses and store it into db 
 */
router.post('/courses',authenticateUser, asyncHandler( async (req, res, next)=>{
   
    try{
        
        const course = await Course.create(req.body);
        // res.location(`/courses/${course.id}`);
        // res.location( '/api/courses/' + course.id);
        //res.setHeader('Location', '/api/courses/' + course.id);
        res.status(201)
        res.location(`/api/courses/${course.id}`)
        res.end();
        

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
/**
 * PUT ../api/Courses to update a course data and validate the data and user 
 */
router.put('/courses/:id',authenticateUser, asyncHandler( async (req, res, next)=>{
    // const courseId = req.params.id;
    const course = await Course.findByPk( req.params.id)
    if (req.currentUser.id === course.userId) {
        try{
        
            updatedCourse = await course.update(req.body);
            res.location('/');
            res.status(204).json(updatedCourse );
            // res.status(204);

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
    }else {
        res.status(403).json({
            message: `You do not have permissions to Edit and update course title :  ${course.title}`
        })
    
    }
    
}))
/**
 * DELETE ../api/Courses to delete a course record and validate user 
 */
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next)=>{
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);
    if (req.currentUser.id === course.userId) {
        try {
            if (course) {
                await course.destroy();
                res.status(204)
                res.end();
            } else {
                res.status(404).res.json({
                    message: `Course ${courseId} not found.`
                })
            }
        } catch (error) {
            
                const errors = error.errors.map(err => err.message);
                res.status(400).json({ errors });
           
        }
    } else {
        res.status(403).json({
            message: `You do not have permissions to delete course ${course.title}`
        })
    }
    }))

module.exports = router;






