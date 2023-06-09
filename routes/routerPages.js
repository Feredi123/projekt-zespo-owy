const express = require('express')
const routerPages = express.Router()
const { checkAuthenticated, checkIfAdmin, checkFirstLogin, checkIfManager } = require('../middlewares')

const {getLogin, getGrowth, getIndex, getLoginfail, getManageSkills, getmyAccount, getRecovery, getAdminPage, getPassChange} = require('../controllers/pages')

routerPages.route('/login').get(getLogin);
routerPages.route('/').get(checkAuthenticated, checkFirstLogin,checkIfManager, getIndex);
routerPages.route('/Dashboard').get(checkAuthenticated, checkFirstLogin, checkFirstLogin, checkIfManager, getIndex)
routerPages.route('/growth').get(checkAuthenticated, checkFirstLogin,getGrowth);
routerPages.route('/loginfail').get(getLoginfail);
routerPages.route('/manage-skills').get(checkAuthenticated, checkFirstLogin,getManageSkills);
routerPages.route('/my-account').get(checkAuthenticated, checkFirstLogin,getmyAccount);
routerPages.route('/recovery').get(getRecovery);
routerPages.route('/admin').get(checkIfAdmin, getAdminPage);
routerPages.route('/passChange').get(checkAuthenticated, getPassChange);
module.exports = routerPages;