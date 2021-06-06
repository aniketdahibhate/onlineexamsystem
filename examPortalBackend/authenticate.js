 
var LocalStrategy = require('passport-local').Strategy;
var Teacher= require('./models/teacher');
var Student= require('./models/student');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var passport = require('passport');
var passportStud = require('passport');



passport.use(new LocalStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, '12345-67890-09876-54321',
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '12345-67890-09876-54321';

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        Teacher.findOne({_id: jwt_payload._id}, (err, user) => {
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


    // exports.jwtPassport = passport.use(new JwtStrategy(opts,
    //     (jwt_payload, done) => {
    //         console.log("JWT payload: ", jwt_payload);
    //         Student.findOne({_id: jwt_payload._id}, (err, user) => {
    //             if (err) {
    //                 return done(err, false);
    //             }
    //             else if (user) {
    //                 return done(null, user);
    //             }
    //             else {
    //                 return done(null, false);
    //             }
    //         });
    //     }));
    

    //exports.verifyUser = passportStud.authenticate('jwt', {session: false});