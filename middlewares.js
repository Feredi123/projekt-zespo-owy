

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      console.log("user is logged in")
      return next()
    }
    console.log("not logged in")
    res.redirect('/login')
}

function checkIfAdmin(req, res, next){

    if(req.isAuthenticated() && req.user.admin_rights == 1) {
        console.log("Admin is logged IN")
        return next()
      }
      console.log("not Admin")
      res.status(401).send('Unauthorized')
}

module.exports = {
    checkAuthenticated,
    checkIfAdmin,
}