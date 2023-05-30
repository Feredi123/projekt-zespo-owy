const { json } = require('express');
const pool = require('../config/database')


async function postSkill(req, res) {
    try {
        
        const name = req.body.skill_name;
        await pool.query('INSERT INTO skills (name) VALUES (?);',[name]);
  
        res.status(201);
  
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function putSkill(req, res) {
    try {
        const {id} = req.params;
        const name = req.body.skill_name;
        
        await pool.query('UPDATE skills SET name = ? WHERE skills_id = ?;',[name,id]);
    
        res.status(200);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

async function getSkillDependency(req, res) {
    try {
        const {id} = req.params;

        const [employees] = await pool.query('SELECT e.employee_id ,e.first_name, e.second_name FROM employees as e JOIN employee_skill as es on es.employees_employee_id = e.employee_id WHERE es.skills_skills_id = ?;',[id]);
        const [processes] = await pool.query('SELECT p.process_id, p.name FROM process_skill as ps Join processes as p on p.process_id = ps.processes_process_id WHERE ps.skills_skills_id = ?;',[id]);
    
        res.status(200).json({employees, processes});
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

async function deleteSkill(req, res) {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM skills WHERE skills_id = ?;',[id]);
    
        res.status(204);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}






async function deleteProcess(req, res) {
    try {
        const { id } = req.params;
        pool.query('DELETE FROM process_skill WHERE processes_process_id = ?;',[id],function(err, rows) {
            pool.query('DELETE FROM processes WHERE process_id = ?;',[id]);
        });
        
        res.status(204);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}


module.exports = {
    postSkill,
    putSkill,
    getSkillDependency,
    deleteSkill,


    deleteProcess,

}