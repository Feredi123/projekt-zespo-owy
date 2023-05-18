const { json } = require('express');
const pool = require('../config/database')


async function getEmployeeById(req, res) {
  try {
    const {id} = req.params;
    const [employee] = await pool.query('SELECT employee_id, first_name, second_name, photo FROM employees WHERE employee_id=?',[id]);

    res.status(200).json(employee);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getLoggedEmployee(req, res) {
  try {
    employee_id = req.user.employee_id
    const [employee] = await pool.query('SELECT employee_id, first_name, second_name FROM employees WHERE employee_id=?',[employee_id]);

    res.status(200).json(employee);

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

  async function getEmployeesBySkill(req, res) {
    try {

      const {id} = req.params

      const [employees] = await pool.query(`SELECT e.employee_id, e.first_name, e.second_name , es.level FROM employees as e JOIN employee_skill as es WHERE e.employee_id = es.employees_employee_id AND es.skills_skills_id = ${id}`);
  
      res.status(200).json(employees);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async function getEmployeesByProcess(req, res) {
    try {

      const {id} = req.params

      const [employees] = await pool.query(`SELECT e.employee_id, e.first_name, e.second_name, SUM(es.level)/(SELECT COUNT(ps.skills_skills_id)FROM process_skill as ps WHERE ps.processes_process_id = ${2}) average FROM employees as e LEFT JOIN employee_skill as es ON e.employee_id = es.employees_employee_id INNER JOIN process_skill as ps ON ps.skills_skills_id = es.skills_skills_id WHERE ps.processes_process_id = ${2} GROUP by e.employee_id; `);
  
      res.status(200).json(employees);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


module.exports = {
    getEmployeeById,
    getEmployees,
    getLoggedEmployee,
    getEmployeesBySkill,
    getEmployeesByProcess,

}