var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose= require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var studentRouter= require('./routes/studentRouter');
var teacherRouter= require('./routes/teacherRouter');
var questionRouter= require('./routes/questionsRouter');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require('passport');
var passportStud = require('passport');
var authenticate = require('./authenticate');
const { Passport } = require('passport');

const url = 'mongodb+srv://aniket:aniket123@cluster0.3eito.mongodb.net/examsystem?retryWrites=true&w=majority';
const connect =mongoose.connect(url);
connect.then((db)=>{
  console.log("connected to a database: ");
},(err) => console.log(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
app.use('/questions',questionRouter);
app.use('*',express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
