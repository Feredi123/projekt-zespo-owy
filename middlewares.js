

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      console.log("user is logged in")
      return next()
    }
    console.log("not logged in")
    res.redirect('/login')
}

function checkIfAdmin(req, res, next){

    if(req.isAuthenticated() && req.user.admin_rights == 2) {
        console.log("Admin is logged IN")
        return next()
      }
      console.log("not Admin")
      res.status(401).send('Unauthorized')
}
function checkIfManager(req, res, next){

  if(req.isAuthenticated() && req.user.admin_rights > 0) {
      console.log("Manager is logged IN")
      return next()
    }
    console.log("not Manager")
    res.status(401).send('Unauthorized')
}

function checkFirstLogin(req, res, next){
  if(req.isAuthenticated() && req.user.change_password == 0){
    console.log("kolejne logowanie")
    return next()
  }
  console.log("wymagana zmiana hasła")
  req.user.change_password = 0
  res.redirect('/passChange')
}

module.exports = {
    checkAuthenticated,
    checkIfAdmin,
    checkFirstLogin,
    checkIfManager
}