const { json } = require('express');
const pool = require('../config/database')

async function postGrowthSkill(req, res) {
    try {
        const employee_id = req.user.employee_id;
        const skill_id = req.body.skills_id;
        const start_date = req.body.start_date;
        const level = req.body.level;
        const end_date = req.body.end_date;
        await pool.query('INSERT INTO `growth` (`growth_id`, `employees_employee_id`, `skills_skill_id`, `level`, `start_date`, `end_date`) VALUES (NULL, ?, ?, ?, ?, ?);',[employee_id,skill_id,level,`"${start_date}"`,`"${end_date}"`]);
    
        res.status(201);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

  async function putGrowthSkill(req, res) {
    try {
        const employee_id = req.user.employee_id;
        const { id } = req.params;
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;
        const level = req.body.level;
        const skill_id = req.body.skills_id;
        
        await pool.query('UPDATE growth SET skills_skill_id = ?, level = ?, start_date = ?, end_date = ? WHERE growth_id = ? AND employees_employee_id = ?;',[skill_id,level,`"${start_date}"`,`"${end_date}"`,id,employee_id]);
    
        res.status(200);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

  async function deleteGrowthSkill(req, res) {
    try {
        const employee_id = req.user.employee_id;
        const { id } = req.params;
        await pool.query('DELETE FROM growth WHERE employees_employee_id = ? AND growth_id = ?;',[employee_id,id]);
    
        res.status(204);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }
  
  async function getGrowthSkill(req, res) {
    try {
        const employee_id = req.user.employee_id
        const [result] =  await pool.query('SELECT * FROM growth where employees_employee_id = ?;',[employee_id]);

        res.status(200).json(result);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

  async function getGrowthSkillById(req, res) {
    try {
        const employee_id = req.user.employee_id;
        const { id } = req.params;
        const [result] =  await pool.query('SELECT * FROM growth where employees_employee_id = ? and growth_id =?;',[employee_id,id]);

        res.status(200).json(result);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }


module.exports = {
    postGrowthSkill,
    putGrowthSkill,
    deleteGrowthSkill,
    getGrowthSkill,
    getGrowthSkillById,
}