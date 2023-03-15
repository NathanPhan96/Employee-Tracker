const db = require("./connection");
const inquirer = require("inquirer");
const { viewDepartments } = require("./departments");
async function viewRoles() {
   try{ 
    const role = 
    await db.query(`SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`)
        return role

    } catch (err){
    console.log(err)
    }
}

async function addRole(){
    try {
        const departments = await viewDepartments();
        const {

            title, 
            salary,
            department_id
    
        } = await inquirer.prompt([
            {
                type : "input",
                name: "title",
                message: "What is role you would like to add?"
            },
            {
                type : "input",
                name: "salary",
                message: "What is their salary?"
            },
            {
                type : "list",
                name: "department_id",
                message: "What department does this role belong to?",
                choices: departments.map(department => {
                return {
                    value: department.id,
                    name : department.name
                };
                }),
            }
    
        ])
        await db.query(`INSERT into role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`)
        const newRole = await viewRoles()
        return newRole
    }catch (err) {
        console.log (err)
    }
    }
    
    
    module.exports = { viewRoles, addRole }
