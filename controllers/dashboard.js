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

async function getDashboardAll(req, res) {
  try {

    const { date } = req.params
    const { employee_id, admin_rights} = req.user;
    console.log(employee_id, admin_rights)

    if(admin_rights == 1) {
      var employeeQuerry = `SELECT e.employee_id, e.first_name, e.second_name FROM employees as e WHERE e.manager_id = ${employee_id};`;//dla managera
    }

    if(admin_rights == 2) {
      var employeeQuerry = 'SELECT e.employee_id, e.first_name, e.second_name FROM employees as e';//dla admina
    }

    const queries = [
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}') BETWEEN start_date AND end_date`,
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}')+1 BETWEEN start_date AND end_date`,
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}')+2 BETWEEN start_date AND end_date`,
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}')+3 BETWEEN start_date AND end_date`,
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}')+4 BETWEEN start_date AND end_date`
    ];
    
    const results = await Promise.all(queries.map(query => pool.query(query)));
    const combinedAbsences = {};
    
    for (const [index, result] of results.entries()) {
      const absentDay = true;
      for (const row of result[0]) {
        const employeeId = row.employee_id;
        if (!combinedAbsences[employeeId]) {
          combinedAbsences[employeeId] = Array(5).fill(false);
        }
        combinedAbsences[employeeId][index] = absentDay;
      }
    }

    const [employeeResults] = await pool.query(employeeQuerry);
    const [skillResults] = await pool.query('SELECT es.skills_skills_id skills_id, es.employees_employee_id employee_id, es.level, s.name skill_name FROM `employee_skill` as es INNER JOIN skills as s ON s.skills_id = es.skills_skills_id');

    const employees = {};

    for (let result of employeeResults) {
      const { employee_id, first_name, second_name } = result;
      
      if (!employees[employee_id]) {
        employees[employee_id] = {
          employee_id,
          first_name,
          second_name,
          skills: [],
          absences: Array(5).fill(false),
        };
      }
    }

    for (let result of skillResults) {
      const { employee_id, skills_id, skill_name } = result;
      
      if (employees[employee_id]) {
        employees[employee_id].skills.push({
          skills_id,
          skill_name,
        });
      }
    }

    for (const employeeId in combinedAbsences) {
      const absences = combinedAbsences[employeeId];
      
      if (employees[employeeId]) {
        employees[employeeId].absences = absences;
      }
    }

    const employeeSkills = Object.values(employees);
    
    res.status(200).json(employeeSkills);

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


async function getProcessesById(req, res) {
  try {
    const {id} = req.params;
    const [process_name] = await pool.query('SELECT name FROM processes where process_id = ?',[id]);
    const [skills] = await pool.query('SELECT s.name skill_name,s.skills_id skill_id FROM processes as p JOIN process_skill as ps on ps.processes_process_id = p.process_id RIGHT JOIN skills as s on s.skills_id = ps.skills_skills_id WHERE p.process_id = ?;',[id]);

    res.status(200).json([process_name,skills]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAbsences(req, res) {
  try {

    const queries = [
      'SELECT employees_employee_id employee_id FROM absences WHERE CURRENT_DATE() BETWEEN start_date AND end_date',
      'SELECT employees_employee_id employee_id FROM absences WHERE CURRENT_DATE()+1 BETWEEN start_date AND end_date',
      'SELECT employees_employee_id employee_id FROM absences WHERE CURRENT_DATE()+2 BETWEEN start_date AND end_date',
      'SELECT employees_employee_id employee_id FROM absences WHERE CURRENT_DATE()+3 BETWEEN start_date AND end_date',
      'SELECT employees_employee_id employee_id FROM absences WHERE CURRENT_DATE()+4 BETWEEN start_date AND end_date'
    ];
    
    const results = await Promise.all(queries.map(query => pool.query(query)));
    const combinedResults = {};
    
    for (const [index, result] of results.entries()) {
      const absentDay = true;
      for (const row of result[0]) {
        const employeeId = row.employee_id;
        if (!combinedResults[employeeId]) {
          combinedResults[employeeId] = [];
        }
        combinedResults[employeeId].push(absentDay);
      }
    }
    
    res.status(200).json(combinedResults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAbsenceTypes(req, res) {
  try {
    const [absenceTypes] = await pool.query('SELECT * FROM absences_types;');

    res.status(200).json(absenceTypes);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getSkills(req, res) {
  try {
    const [skills] = await pool.query('SELECT skills_id skill_id, name FROM skills');

    res.status(200).json(skills);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAbsencesByDate(req, res) {
  try {

    const { date } = req.params


    const queries = [
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}') BETWEEN start_date AND end_date`,
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}')+1 BETWEEN start_date AND end_date`,
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}')+2 BETWEEN start_date AND end_date`,
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}')+3 BETWEEN start_date AND end_date`,
      `SELECT employees_employee_id employee_id FROM absences WHERE DATE('${date}')+4 BETWEEN start_date AND end_date`
    ];
    
    const results = await Promise.all(queries.map(query => pool.query(query)));
    const combinedResults = {};
    
    for (const [index, result] of results.entries()) {
      const absentDay = true;
      for (const row of result[0]) {
        const employeeId = row.employee_id;
        if (!combinedResults[employeeId]) {
          combinedResults[employeeId] = [];
        }
        combinedResults[employeeId].push(absentDay);
      }
    }
    
    res.status(200).json(combinedResults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
    getDashboard,
    getProcesses,
    getAbsences,
    getSkills,
    getAbsencesByDate,
    getDashboardAll,
    getAbsenceTypes,
    getProcessesById,

}