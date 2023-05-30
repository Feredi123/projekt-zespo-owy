const express = require('express')
const routerAdminPanel = express.Router()
const { checkAuthenticated, checkIfAdmin } = require('../middlewares')

const { postSkill, putSkill, getSkillDependency, deleteSkill, deleteProcess, } = require('../controllers/adminPanel')

routerAdminPanel.route('/skills').post(checkIfAdmin, postSkill) // dodaje skill w request skill_name
routerAdminPanel.route('/skills/:id').put(checkIfAdmin, putSkill) // :id - id atkualizowanego skilla  Aktualizuje skill w request skill_name
routerAdminPanel.route('/skills/:id').delete(checkIfAdmin, deleteSkill) // :id - id skilla  USUSWA skilla
routerAdminPanel.route('/skills/:id/dependency').get(checkIfAdmin, getSkillDependency) // :id - id skilla  Sprawdza procesy i pracowników któży mają tego skilla


routerAdminPanel.route('/process/:id').delete(checkIfAdmin, deleteProcess) // :id - id procesu  usuwa process i usuwa proces z tablicy process_skill


module.exports = routerAdminPanel;