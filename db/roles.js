const db = require("./connection");
const inquirer = require("inquirer");
async function viewRoles() {
   try{ 
    const role = 
    await db.query(`SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`)
        return role

    } catch (err){
    console.log(err)
    }
}


module.exports = { viewRoles }