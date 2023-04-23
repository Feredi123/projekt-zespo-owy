const express = require('express')
const router = express.Router()

const {
  getDashboard, getProcesses, getAbsences, getSkills, getAbsencesByDate, getDashboardAll,
} = require('../controllers/dashboard')

const {
  getEmployees,
  getEmployeesBySkill,
  getEmployeesByProcess,
} = require('../controllers/employees')


router.route('/dashboard').get(getDashboard)
router.route('/dashboard/all/:date').get(getDashboardAll) //:date - YYYY-MM-DD, zwraca id pracownika imię nazwiko umiejętności i nieobecości od podanej daty
router.route('/processes').get(getProcesses) // zwraca procesy id i nazwa
router.route('/skills').get(getSkills) // zwraca umiejętności id i nazwa

router.route('/absences').get(getAbsences)  // zwraca id pracownika i kiedy ich nie będzie
router.route('/absences/:date').get(getAbsencesByDate)  //:date - YYYY-MM-DD , zwraca id pracowników i kiedy ich nie będzie od podanej daty przez 4 kolejne dni(Łącznie 5 dni)

router.route('/employees').get(getEmployees) // zwraca pracowników id, imię, nazwisko
router.route('/employees/skill/:id').get(getEmployeesBySkill) // :id - id umiejętności, zwraca pracowników id, imię, nazwisko i poziom umiejętności
router.route('/employees/process/:id').get(getEmployeesByProcess) // :id - id procesu, zwraca pracowników id, imię, nazwisko i średni poziom wymaganych umiejętności
//router.route('/postman').post(createPersonPostman)
//router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router