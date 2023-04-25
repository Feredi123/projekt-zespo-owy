const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByName, getUserById) {
    const authUser = async (name, password, done) => {
        const user = getUserByName(name)
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

    passport.use(new LocalStrategy({usernameField: 'name'}, authUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => { return done(null, getUserById(id))})
}

module.exports = initialize