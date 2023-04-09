const pool = require('../config/database')

async function getDashboard(req, res) {
    try {
      const [rows, fields] = await pool.query('SELECT * FROM employees');
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getDashboard,
}