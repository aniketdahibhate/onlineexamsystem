var mongoose = require('mongoose');
var schema =mongoose.Schema;

const Questions = new schema({
    
    question: String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    correct_answer: String,
  });

  module.exports= mongoose.model('Questions',Questions);
