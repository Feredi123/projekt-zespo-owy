const { json } = require('express');
const pool = require('../config/database')

async function postEmployeeSkill(req, res) {
    try {
        const employee_id = req.user.employee_id;
        const { id, level } = req.params;
        await pool.query('INSERT INTO employee_skill (skills_skills_id, employees_employee_id, level) VALUES (?,?,?);',[id,employee_id,level]);
    
        res.status(201).json();
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

  async function putEmployeeSkill(req, res) {
    try {
        const employee_id = req.user.employee_id;
        const { id, level } = req.params;
        await pool.query('UPDATE employee_skill SET level = ? WHERE employees_employee_id = ? AND skills_skills_id = ?;',[level,employee_id,id]);
    
        res.status(200).json();
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

  async function deleteEmployeeSkill(req, res) {
    try {
        const employee_id = req.user.employee_id;
        const { id } = req.params;
        await pool.query('DELETE FROM employee_skill WHERE employees_employee_id = ? AND skills_skills_id = ?;',[employee_id,id]);
    
        res.status(204).json();
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }
  
  async function getEmployeeSkill(req, res) {
    try {
        const employee_id = req.user.employee_id
        const [result] =  await pool.query('SELECT es.skills_skills_id skill_id, es.level , s.name FROM employee_skill as es JOIN skills as s on s.skills_id = es.skills_skills_id WHERE employees_employee_id = ?;',[employee_id]);

        res.status(200).json(result);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }


module.exports = {
    postEmployeeSkill,
    putEmployeeSkill,
    deleteEmployeeSkill,
    getEmployeeSkill,
}