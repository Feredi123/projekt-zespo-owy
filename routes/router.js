const express = require('express')
const router = express.Router()
const { checkAuthenticated, checkIfManager } = require('../middlewares')
const {
  getDashboard, getProcesses, getAbsences, getSkills, getAbsencesByDate, getDashboardAll, getAbsenceTypes, getProcessesById,
} = require('../controllers/dashboard')

const {
  getEmployeeById, getEmployees, getLoggedEmployee, getEmployeesBySkill, getEmployeesByProcess, getEmployeeType,
} = require('../controllers/employees')

const {
    postEmployeeSkill, putEmployeeSkill, deleteEmployeeSkill, getEmployeeSkill,
} = require('../controllers/employeeSkill')

const {
    postGrowthSkill, putGrowthSkill, deleteGrowthSkill, getGrowthSkill, getGrowthSkillById, getGrowthRaport,
} = require('../controllers/growth')

const {
  getMyAbsences, postMyAbsences,
} = require('../controllers/myAccount')


router.route('/dashboard').get(getDashboard)
router.route('/dashboard/all/:date').get(getDashboardAll) //:date - YYYY-MM-DD, zwraca id pracownika imię nazwiko umiejętności i nieobecości od podanej daty
router.route('/processes').get(getProcesses) // zwraca procesy id i nazwa
router.route('/process/:id').get(getProcessesById) // :id -id procesu zwraca nazwę procesu i umiejętności w tym procesie

router.route('/skills').get(getSkills) // zwraca umiejętności id i nazwa

router.route('/absences').get(getAbsences)  // zwraca id pracownika i kiedy ich nie będzie
router.route('/absence-types').get(getAbsenceTypes)  // zwraca rodzaje nieobecności
router.route('/absences/:date').get(getAbsencesByDate)  //:date - YYYY-MM-DD , zwraca id pracowników i kiedy ich nie będzie od podanej daty przez 5 kolejnych dni
router.route('/my-absences').get(getMyAbsences)  // zwraca wszystkie nieobecności zalogowanego pracownika
router.route('/my-absences').post(postMyAbsences)  // dodaj nieobecność w request start_date: end_date: absence_type: [1,2,3]

router.route('/employee-skill/:id/:level').post(postEmployeeSkill) // :id - id umiejętności, :level - poziom umiejętności dodaje umiejętność z poziomem zalogowanemu użytkownikowi
router.route('/employee-skill/:id/:level').put(putEmployeeSkill) // :id - id umiejętności, :level - poziom umiejętności zmienia poziom wybranej umiejętności zalogowanego użytkownika
router.route('/employee-skill/:id').delete(deleteEmployeeSkill) // :id - id umiejętności usuwa umiejętność zalogowanego użytkownika
router.route('/employee-skill').get(getEmployeeSkill) // zwraca id umiejętności i ich poziom zalogowanego użytkownika

router.route('/growth-skill').post(postGrowthSkill) // tworzy growth w request skill_id: start_date: end_date: level:
router.route('/growth-skill/:id').put(putGrowthSkill) // :id - growth_id aktualizuje growth w request skill_id: start_date: end_date: level:
router.route('/growth-skill/:id').delete(deleteGrowthSkill) // :id - growth_id usuwa growth o id = :id obecnie zalogwanemu użytkownikowi
router.route('/growth-skill').get(getGrowthSkill) // zwraca growth_id,	id pracownika, id umiejętności, datę początkową i końcową wszystkich growth zalogowanego pracownika
router.route('/growth-skill/:id').get(getGrowthSkillById) // zwraca growth_id,	id pracownika, id umiejętności, datę początkową i końcową wszystkich wybranego growth zalogowanego pracownika

router.route('/employees').get(getEmployees) // zwraca pracowników id, imię, nazwisko
router.route('/employee-type').get(getEmployeeType) // zwraca typ zalogowanego użytkownika
router.route('/employee/:id').get(getEmployeeById) // :id - id pracownika,  zwraca pracownika id, imię
router.route('/employee').get(getLoggedEmployee) // zwraca pracownika id, imię, nazwisko, email zalogowanegho pracownika
router.route('/employees/skill/:id').get(getEmployeesBySkill) // :id - id umiejętności, zwraca pracowników id, imię, nazwisko i poziom umiejętności
router.route('/employees/process/:id').get(getEmployeesByProcess) // :id - id procesu, zwraca pracowników id, imię, nazwisko i średni poziom wymaganych umiejętności


router.route('/growth-raport').get(checkIfManager,getGrowthRaport) // :id - id procesu, zwraca pracowników id, imię, nazwisko i średni poziom wymaganych umiejętności

module.exports = router