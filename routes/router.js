const express = require('express')
const router = express.Router()

const {
  getDashboard, getProcesses,
} = require('../controllers/dashboard')


router.route('/dashboard').get(getDashboard)
router.route('/dashboard/processes').get(getProcesses)
//router.route('/postman').post(createPersonPostman)
//router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router