const { json } = require('express');
const pool = require('../config/database')

async function getMyAbsences(req, res) {
    try {
        const employee_id = req.user.employee_id
        const [result] =  await pool.query('SELECT * FROM absences WHERE employees_employee_id = ?;',[employee_id]);

        res.status(200).json(result);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

  async function postMyAbsences(req, res) {
    try {
        const employee_id = req.user.employee_id;
        const absence_type = req.body.absence_type;
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;
        await pool.query('INSERT INTO absences (employees_employee_id, start_date,end_date, absences_types_absencetype_id) VALUES (?, ?, ?, ?);',[employee_id,`"${start_date}"`, `"${end_date}"`,absence_type]);
    
        res.status(201);
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

module.exports = {
    getMyAbsences,
    postMyAbsences,

}