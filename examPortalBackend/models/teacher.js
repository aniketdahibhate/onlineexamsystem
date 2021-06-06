var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var schema =mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Teacher= new schema({
  username:{
      type:String,
      default:''
  },
  password:{
      type:String,
      default:''
  }
});
Teacher.plugin(passportLocalMongoose);
module.exports= mongoose.model('Teacher',Teacher);