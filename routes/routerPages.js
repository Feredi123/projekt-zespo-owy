const express = require('express')
const routerPages = express.Router()
const { checkAuthenticated, checkIfAdmin } = require('../middlewares')

const {getLogin, getGrowth, getIndex, getLoginfail, getManageSkills, getmyAccount, getRecovery, getAdminPage,} = require('../controllers/pages')

routerPages.route('/login').get(getLogin);
routerPages.route('/').get(checkAuthenticated,getIndex);
routerPages.route('/growth').get(checkAuthenticated,getGrowth);
routerPages.route('/loginfail').get(getLoginfail);
routerPages.route('/manage-skills').get(checkAuthenticated,getManageSkills);
routerPages.route('/my-account').get(checkAuthenticated,getmyAccount);
routerPages.route('/recovery').get(getRecovery);
routerPages.route('/admin').get(checkIfAdmin, getAdminPage);

module.exports = routerPages;