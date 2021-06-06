var express = require('express');
const bodyparser = require('body-parser');
var Student= require('../models/student');
var studentRouter = express.Router();
var authenticate = require('../authenticateStud');
var passport = require('passport');
const cors = require('./cors');
studentRouter.use(bodyparser.json());

studentRouter.options('*',cors.corsWithOptions,(req,res)=>{
    res.statusMessage = 200;
  });
  
  studentRouter.post('/signup',cors.corsWithOptions, (req, res, next) => {
    Student.register(new Student({username: req.body.username}), 
      req.body.password, (err, student) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else {
        
        student.save((err,student)=>{
          if(err){
                
            //res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, status: 'student already exist!'});
            return;
          }
          passport.authenticate('local',{session:false})(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
          });
        });
      }
    });
  });

  studentRouter.post('/login',cors.corsWithOptions,passport.authenticate('local',{session:false}),(req, res) => {

    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    res.json({success: true, token: token, status: 'You are successfully logged in!',user:req.user.username,id:req.user._id});
  });

studentRouter.get('/logout',cors.corsWithOptions,(req,res,next) =>{
if(req.session){
  req.session.destroy();
  res.clearCookie('session-id');
  res.redirect('/');
}else{
  var err = new Error('Your are not logged in ');
  res.statusCode= 403;
  next(err);
}
});

studentRouter.get('/:studId',cors.corsWithOptions,(req,res,next)=>{
  Student.findById(req.params.studId)
  .then((student)=>{
      
     res.statusCode=200;
     res.setHeader('Content-Type','application/json');
     res.json({user:student.username,id:student._id,marks:student.marks});
  },(err) => next(err))
  .catch((err)=> next(err));
})
studentRouter.put('/:studId',cors.corsWithOptions,(req,res,next)=>{ 
  Student.findByIdAndUpdate(req.params.studId,{
     $set:req.body
  },{new : true}).
  then((student)=>{
     res.statusCode=200;
     res.setHeader('Content-Type','application/json');
     res.json(student);
  },(err) => next(err))
  .catch((err)=> next(err));
})

module.exports= studentRouter;