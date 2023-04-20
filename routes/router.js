const express = require('express')
const router = express.Router()

const {
  getDashboard, getProcesses, getEmployees,
} = require('../controllers/dashboard')


router.route('/dashboard').get(getDashboard)
router.route('/dashboard/processes').get(getProcesses)
router.route('/dashboard/employees').get(getEmployees)
//router.route('/postman').post(createPersonPostman)
//router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router