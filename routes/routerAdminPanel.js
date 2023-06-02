const express = require('express')
const routerAdminPanel = express.Router()
const { checkAuthenticated, checkIfAdmin } = require('../middlewares')

const { postSkill, putSkill, getSkillDependency, deleteSkill, deleteProcess, postProcess, putProcess, postUser, getUser, deleteUser, putUser,} = require('../controllers/adminPanel')

routerAdminPanel.route('/skills').post(checkIfAdmin, postSkill) // dodaje skill w request skill_name
routerAdminPanel.route('/skills/:id').put(checkIfAdmin, putSkill) // :id - id atkualizowanego skilla  Aktualizuje skill w request skill_name
routerAdminPanel.route('/skills/:id').delete(checkIfAdmin, deleteSkill) // :id - id skilla  USUSWA skilla
routerAdminPanel.route('/skills/:id/dependency').get(checkIfAdmin, getSkillDependency) // :id - id skilla  Sprawdza procesy i pracowników któży mają tego skilla


routerAdminPanel.route('/process/:id').delete(checkIfAdmin, deleteProcess) // :id - id procesu  usuwa process i usuwa proces z tablicy process_skill
routerAdminPanel.route('/process').post(checkIfAdmin, postProcess) // dodaje process w request process_name
routerAdminPanel.route('/process/:id').put(checkIfAdmin, putProcess) // dodaje process w request process_name i tablica z id skillów dowolna ilość skillów

routerAdminPanel.route('/register').post(checkIfAdmin, postUser) //tworzy użytkownika w register.html jest formularz
routerAdminPanel.route('/user/:id').get(checkIfAdmin, getUser) // zwraca wszystkie dane użytkownika o id :id
routerAdminPanel.route('/user/:id').delete(checkIfAdmin, deleteUser) // usuwa użytkownika o id :id
routerAdminPanel.route('/user/:id').put(checkIfAdmin, putUser) // akutalizuje dane użytkownika o id :id w request np. first_name : 'Jan',
                                                                                                                                    /*last_name : 'Kow',
                                                                                                                                    email : 'jan@kow.com',
                                                                                                                                    phone : '789456132',
                                                                                                                                    admin_right : 0,
                                                                                                                                    manager_id : 5,
                                                                                                                                    change_password : 1,
                                                                                                                                    skills : [
                                                                                                                                    {skills_id : 1,level:1},
                                                                                                                                    {skills_id : 2,level:2},
                                                                                                                                    {skills_id : 3,level:3},
                                                                                                                                    ]
                                                                                                                                    może być dowolna liczba skilów*/

module.exports = routerAdminPanel;