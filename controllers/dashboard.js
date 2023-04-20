const { json } = require('express');
const pool = require('../config/database')

async function getDashboard(req, res) {
    try {
      const [tablica_employees] = await pool.query('SELECT * FROM employees');

      const [absent_today] = await pool.query('SELECT employees_employee_id employee_id FROM `absences` WHERE CURRENT_DATE() BETWEEN start_date AND end_date; ');
      const [absent_tomorow] = await pool.query('SELECT employees_employee_id employee_id FROM `absences` WHERE CURRENT_DATE()+1 BETWEEN start_date AND end_date; ');
      const [absent_day_after_tomorow] = await pool.query('SELECT employees_employee_id employee_id FROM `absences` WHERE CURRENT_DATE()+2 BETWEEN start_date AND end_date; ');

      var data = [];

      for (const element of tablica_employees) {

        element.is_absent_today = false;
        element.is_absent_tomorrow = false;
        element.is_absent_day_after_tomorow = false;

        if(absent_today.find(emp => emp.employee_id === element.employee_id )){
          element.is_absent_today = true;
        }

        if(absent_tomorow.find(emp => emp.employee_id === element.employee_id )){
          element.is_absent_tomorrow = true;
        }

        if(absent_day_after_tomorow.find(emp => emp.employee_id === element.employee_id )){
          element.is_absent_day_after_tomorow = true;
        }

        data.push(element);
      }

      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
}

async function getProcesses(req, res) {
  try {
    const [processes] = await pool.query('SELECT process_id, name FROM processes');

    res.status(200).json(processes);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getEmployees(req, res) {
  try {
    const [employees] = await pool.query('SELECT employee_id, first_name, second_name FROM employees');

    res.status(200).json(employees);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    getDashboard,
    getProcesses,
    getEmployees
}