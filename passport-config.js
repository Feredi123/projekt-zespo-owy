const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByLogin) {
    const authUser = async (login, password, done) => {
const user = getUserByLogin(login)
if (user == null) {
    return done(null, false, { mesasge: 'No user found'})
}

try {
    if(await bcrypt.compare(password, user.passport)) {
        return done(null, user)
    } else {
        return done(null, false, {message: 'incorrect password'})
    }
} catch (e) {
    return done(e)
}
}

    passport.use(new LocalStrategy({usernameField: 'login'}, authUser))
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((user, done) => { })
}

module.exports = initialize