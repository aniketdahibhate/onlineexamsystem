var express = require('express');
const bodyparser = require('body-parser');
var Questions= require('../models/questions');
var questionRouter = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');
questionRouter.use(bodyparser.json());

questionRouter.options('*',cors.corsWithOptions,(req,res)=>{
    res.statusMessage = 200;
  });

  questionRouter.post('/add',cors.corsWithOptions,(req,res,next)=>{
    Questions.create(req.body)
     .then((question)=>{
        console.log('Question added ',question);
        
       res.statusCode=200;
       res.setHeader('Content-Type','application/json');
       res.json(question);
     },(err)=> next(err))
     .catch((err)=>next(err));
 })
 

 questionRouter.get('/get',cors.cors,(req, res, next) =>{
  Questions.find({}).
  then((item)=>{
     res.statusCode=200;
     res.setHeader('Content-Type','application/json');
     res.json(item);
  },(err) => next(err))
  .catch((err)=> next(err));
});

 module.exports=questionRouter;