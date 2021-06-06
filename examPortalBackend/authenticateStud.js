 
var LocalStrategy = require('passport-local').Strategy;
var Student= require('./models/student');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var passport1 = require('passport');

passport1.use(new LocalStrategy(Student.authenticate()));
passport1.serializeUser(Student.serializeUser());
passport1.deserializeUser(Student.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, '12345-67890-09876-54390',
        {expiresIn: 3600});
};

var opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = '12345-67890-09876-54390';

exports.jwtPassport = passport1.use(new JwtStrategy(opt,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        Student.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
   // exports.verifyUser = passport1.authenticateStud('jwt', {session: false});