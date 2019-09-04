const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const user = require('../models/user.model');

passport.use(new LocalStrategy({
    usernameField: user.email,
}, (email, password, done) => {
    user.findOne({email})
        .then(user => {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, {errors: {'email or password': 'is incorrect'} });
            }
            
            return done(null, user);
        })
        .catch(done);
}));

