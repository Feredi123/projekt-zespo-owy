const { json } = require('express');
const pool = require('../config/database')

const PDFDocument = require('pdfkit');


async function postGrowthSkill(req, res) {
    try {
        const employee_id = req.user.employee_id;
        const skill_id = req.body.skills_id;
        const start_date = req.body.start_date;
        const level = req.body.level;
        const end_date = req.body.end_date;
        await pool.query('INSERT INTO `growth` (`growth_id`, `employees_employee_id`, `skills_skill_id`, `level`, `start_date`, `end_date`) VALUES (NULL, ?, ?, ?, ?, ?);',[employee_id,skill_id,level,start_date,end_date]);
    
        res.status(201).json();
    
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
        
        await pool.query('UPDATE growth SET skills_skill_id = ?, level = ?, start_date = ?, end_date = ? WHERE growth_id = ? AND employees_employee_id = ?;',[skill_id,level,start_date,end_date,id,employee_id]);
    
        res.status(204).json();
    
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
    
        res.status(204).json();
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
  }
  
  async function getGrowthSkill(req, res) {
    try {
        const employee_id = req.user.employee_id
        const [result] =  await pool.query('SELECT g.growth_id, g.employees_employee_id, g.skills_skill_id, g.level, g.start_date, g.end_date, s.name skill_name FROM growth as g join skills as s ON s.skills_id = g.skills_skill_id where employees_employee_id = ?;',[employee_id]);

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

  async function getGrowthRaport(req, res) {
    try {
        const [result] = await pool.query('SELECT s.name AS skill_name, e.first_name, e.second_name, DATE_FORMAT(g.start_date, "%d-%m-%Y") AS start_date, DATE_FORMAT(g.end_date, "%d-%m-%Y") AS end_date, g.level FROM growth AS g JOIN employees AS e ON e.employee_id = g.employees_employee_id JOIN skills AS s ON s.skills_id = g.skills_skill_id; ');

        const aggregatedData = {};
        for (const row of result) {
            const key = row.skill_name;
            if (!aggregatedData[key]) {
                aggregatedData[key] = [];
            }
            aggregatedData[key].push(row);
        }

        const doc = new PDFDocument();

        let isFirstPage = true;
        for (const key in aggregatedData) {
            if (aggregatedData.hasOwnProperty(key)) {
                // Add a page for the skill
                if (!isFirstPage) {
                    doc.addPage();
                } else {
                    isFirstPage = false;
                }

                // Set PDF section properties and content based on the skill's data
                doc.fontSize(18).text(`Skill: ${key}`);
                doc.moveDown();

                // Create table headers
                doc.font('Helvetica-Bold').fontSize(12);
                const y = doc.y;
                doc.text('Employee', 50, y);
                doc.text('Start Date', 200, y);
                doc.text('End Date', 300, y);
                doc.text('Target Level', 400, y);

                // Display employees, start date, end date and target level in a table format
                doc.font('Helvetica').fontSize(12);
                for (const rowData of aggregatedData[key]) {
                    doc.moveDown();
                    const y = doc.y;
                    doc.text(`${rowData.first_name} ${rowData.second_name}`, 50, y);
                    doc.text(rowData.start_date, 200, y);
                    doc.text(rowData.end_date, 300, y);
                    doc.text(rowData.level.toString(), 400, y);
                }
            }
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=Growth Report ${new Date().toLocaleDateString("en-GB")}.pdf`);

        doc.pipe(res);
        doc.end();

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
    getGrowthRaport,
}