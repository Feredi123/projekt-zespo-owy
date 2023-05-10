const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const session = require('express-session')
function initialize(passport, getUserByEmail, getUserById) {

    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { mesasge: 'No user found'})
        } 
        try {
            if(await bcrypt.compare(password, user.password)) {
                console.log("zalogowano poprawnie")
                return done(null, user)
            } else {
                return done(null, false, {message: 'incorrect password'})
            }
            } catch (err) {
                return done(err)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id))

    
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
     })

}

module.exports = initialize