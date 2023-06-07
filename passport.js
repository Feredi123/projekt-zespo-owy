const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const session = require('express-session');
const { use } = require('passport');
const { pool } = require('./config/database');

const customFields={
    usernameField:'email',
    passwordField:'password',
}

function initializePassport(passport, getUserByEmail, getUserById) {

    const authenticateUser = async (email, password, done) => {

        pool.query('SELECT * FROM employees WHERE email = ?', [email], function(error, results, fields) {

            if(error){
                return done(error);
            }
            if(results.length==0){
                return done(null,false);
            }

            bcrypt.compare(password, results[0].password)
                .then((isValid) => {
                    user = { id: results[0].employee_id, email: results[0].email };

                    console.log(isValid);
                    if (isValid) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                    return done(error);
                });

        });
    }

    passport.use(new LocalStrategy(customFields, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id))

    
    passport.deserializeUser(function(userId,done){
        console.log('deserialized user' + userId)
        pool.query('SELECT * FROM employees WHERE employee_id = ?', [userId], function(error, results) {

            done(null,results[0]);
        })
    })
}

module.exports = {
    initializePassport,
}