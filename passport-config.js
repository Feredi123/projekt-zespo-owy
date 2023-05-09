const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { mesasge: 'No user found'})
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'incorrect password'})
            }
            } catch (e) {
                return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authUser));

    passport.serializeUser(function( user, done) {
        process.nextTick(function() {
            return done(null, {
                email: user.email,
                first_name: user.first_name
            });
        });
    });
    passport.deserializeUser(function(user, done) {
        process.nextTick(function() {
            return done(null, user);
        })
    })
}
module.exports = initialize