var mongoose = require('mongoose');
var schema =mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Student= new schema({
  username:{
      type:String,
      default:''
  },
  password:{
      type:String,
      default:''
  },
  marks:{
    type:String,
    default:''
  }
});
Student.plugin(passportLocalMongoose);
module.exports= mongoose.model('Student',Student);