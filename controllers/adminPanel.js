const { json } = require('express');
const pool = require('../config/database')
const bcrypt = require('bcrypt'); // hashowanie haseł
const transporter = require('../config/email')
const crypto = require("crypto");

async function postSkill(req, res) {
    try {
        
        const name = req.body.skill_name;
        await pool.query('INSERT INTO skills (name) VALUES (?);',[name]);
  
        res.status(201).json();
  
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
    
        res.status(200).json();
    
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
    
        res.status(204).json();
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

async function postProcess(req, res) {
  try {
      const nazwa = req.body.process_name;
      await pool.query('INSERT INTO processes (`name`) VALUES (?);',[nazwa]);
      
      res.status(201).json();
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteProcess(req, res) {
    try {
        const { id } = req.params;
        pool.query(`DELETE FROM process_skill WHERE processes_process_id = ${id}`)
          .then(() => {
            return pool.query('DELETE FROM processes WHERE process_id = ?;', [id])
          })
          .then(() => {
            res.sendStatus(204);
          })
        
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

async function putProcess(req, res) {
    try {
        const { id } = req.params;
        const nazwa = req.body.process_name;
        const skills = req.body.skills;

        pool.query('UPDATE processes SET name = ? WHERE process_id = ? ',[nazwa,id]);

        pool.query(`DELETE FROM process_skill WHERE processes_process_id = ${id}`)
          .then(() => {
            skills.forEach(element => {
              if(element != 0){
                pool.query('INSERT INTO process_skill (`skills_skills_id`, `processes_process_id`) VALUES (?,?) ;',[element,id]);
              }
            });
          })
          .then(() => {
            res.status(200).json();
          })

      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

async function postUser  (req, res) {
  try {
    if (req.body.password) {
      passwordGen = req.body.password;
    } else {
      passwordGen = crypto.randomBytes(20).toString('hex');
    }
    const hashedPassword = await bcrypt.hash(passwordGen, 10)
    
      first_name = req.body.first_name;
      last_name = req.body.last_name;
      email = req.body.email;
      phone = req.body.phone;
      password = hashedPassword;
      admin_rights =  req.body.admin_rights;
      change_password =  req.body.password_change;
      manager_id = req.body.manager_id;

    await pool.query('INSERT INTO employees (employee_id, first_name, second_name, email, phone, password, photo, admin_rights, manager_id, change_password) VALUES (NULL, ?, ?, ?, ?, ?, NULL, ?, ?, ?);',[first_name,last_name,email,phone,password,admin_rights,manager_id,change_password]);
    
    res.status(201).json();
    
    var mailOptions = {
      from: 'admintest753421@o2.pl',
      to: email,
      subject: 'ACCOUNT CREATED',
      text: passwordGen,
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUser(req, res) {
  try {
      const {id} = req.params;

      const [employee] = await pool.query('SELECT employee_id , first_name, second_name, email, phone, photo, admin_rights, manager_id, change_password FROM employees WHERE employee_id = ?;',[id]);
      const [skills] = await pool.query('SELECT s.skills_id, s.name skill_name, es.level  From skills as s Join employee_skill as es on es.skills_skills_id = s.skills_id WHERE es.employees_employee_id = ?;',[id]);
      const [absences] = await pool.query('SELECT a.start_date, a.absence_id, a.end_date, at.name type FROM absences as a Join absences_types as at ON at.absencetype_id = a.absences_types_absencetype_id where a.employees_employee_id = ? ORDER BY absence_id DESC LIMIT 5;',[id]);

      const response = {
        employee: employee,
        skills: skills,
        absences: absences,
      };
  
      res.status(200).json(response);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
}

async function getManagers(req, res) {
  try {

      const [managers] = await pool.query('SELECT employee_id , first_name, second_name FROM employees WHERE admin_rights = 1;');
      
      res.status(200).json(managers);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
}


async function deleteUser(req, res) {
  try {
      const { id } = req.params;
      pool.query('DELETE FROM employee_skill WHERE employees_employee_id = ?;',[id])
        .then(() => {
          return pool.query('DELETE FROM absences WHERE employees_employee_id = ?;', [id])
        })
        .then(() => {
          return pool.query('DELETE FROM employees WHERE employee_id = ?;', [id])
        })
        .then(() => {
          res.status(204).json();
        })
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
}

async function putUser(req, res) {
  try {
      const { id } = req.params;

      first_name = req.body.first_name;
      last_name = req.body.last_name;
      email = req.body.email;
      phone = req.body.phone;
      admin_right = req.body.admin_right;
      manager_id = req.body.manager_id;
      change_password = req.body.change_password;

      const skills = req.body.skills;


      if(skills){
        console.log(skills)
        
        pool.query(`DELETE FROM employee_skill WHERE employees_employee_id = ${id};`)
        .then(() => {
          skills.forEach(element => {
            pool.query('INSERT INTO employee_skill (skills_skills_id, employees_employee_id, level) VALUES (?,?,?) ',[element.skills_id,id,element.level]);
          });
        })
        .then(() => {
          res.status(200).json();
        })
      }
      else{
        await pool.query('UPDATE employees SET first_name = ?, second_name = ?, email = ?, phone = ?, admin_rights = ?, manager_id = ?, change_password = ? WHERE employee_id = ?;',[first_name, last_name, email, phone, admin_right, manager_id, change_password, id]);
        res.status(200).json();
      }

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteAbsence(req, res) {
  try {
      const { id, absence } = req.params;

      pool.query('DELETE FROM absences WHERE employees_employee_id = ? AND absence_id = ?',[id,absence])
        .then(() => {
          res.sendStatus(204);
        })
      
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
    postProcess,
    putProcess,

    postUser,
    getUser,
    deleteUser,
    putUser,

    deleteAbsence,
    getManagers,


}