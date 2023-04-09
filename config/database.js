const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'database_name',
  connectionLimit: 10
});

async function testConnection() {
    try {
      const [rows, fields] = await pool.query('SELECT 1 + 1 AS solution');
      console.log(`Connected to database`);
    } catch (err) {
      console.log(`Error: ${err}`);
    } finally {
      //pool.end();
    }
  }
  
testConnection();

module.exports = pool;
