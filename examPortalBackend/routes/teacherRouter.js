var express = require('express');
const bodyparser = require('body-parser');
var Teacher= require('../models/teacher');
var teacherRouter = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');
teacherRouter.use(bodyparser.json());

teacherRouter.options('*',cors.corsWithOptions,(req,res)=>{
    res.statusMessage = 200;
  });
  
  // teacherRouter.post('/signup',cors.corsWithOptions, (req, res, next) => {
  //   Teacher.register(new Teacher({username: req.body.username}), 
  //     req.body.password, (err, teacher) => {
  //      if(err) {
  //          res.statusCode = 500;
  //          res.setHeader('Content-Type', 'application/json');
  //          res.json({success: false, status: 'user already exist!'});
  //          console.log("user exist");
  //      }
  //      else{
  //        console.log("new");
  //        res.json({success: true, status: 'Registration Successful!'});
  //      }
  //   });
  // });
  teacherRouter.post('/signup',cors.corsWithOptions,(req,res,next) =>{
    userName=req.body.username;
    passWord=req.body.password;
    console.log(userName);
    console.log(passWord);
    Teacher.find({username:userName,password:passWord},(err,teacher)=>{

      if(teacher == "")
      {
              console.log("new");
              
            Teacher.create(req.body)
            .then((teacher)=>{
              console.log('teacher created ',teacher);
              
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json({success: true, status: 'Registration successfull!'});
          },(err)=> next(err))
          .catch((err)=>next(err));
        
      }
      else{
        
           res.json({success: false, status: 'user already exist!'});
           console.log("user exist");
           
      }
      
    });

  });

  teacherRouter.post('/login',cors.corsWithOptions,(req, res) => {
   
    userName=req.body.username;
    passWord=req.body.password;
    console.log(userName);
    console.log(passWord);
    Teacher.find({username:userName,password:passWord},(err,teacher)=>{

      if(teacher == ""){
        console.log(teacher);
        res.json({success: false,status: 'invalid user!'});
      }
      else{
        console.log(teacher);
        var token = authenticate.getToken({_id: teacher._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, token: token, status: 'You are successfully logged in!',id:teacher._id});
        console.log("valid");
      }
      
    });
 });
  
  
  teacherRouter.get('/logout',cors.corsWithOptions,(req,res,next) =>{
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
  
  
module.exports= teacherRouter;