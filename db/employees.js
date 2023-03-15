const db = require("./connection");
const inquirer = require("inquirer");
const { viewRoles } = require("./roles");
async function viewEmployees() {
   try{ 
    const employee = 
     await db.query("SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id")
        return employee
    } catch (err){
    console.log(err)
    }
}

async function addEmployee(){
    try {
        const roles = await viewRoles();
        const {
        firstName,
        lastName,
        role,
        } = await inquirer.prompt([
    {
        type : "input",
        name: "firstName",
        message: "What is the employee's first name?"
    },
    {
        type : "input",
        name : "lastName",
        message: "What is the employee's last name?"
    },
    {
        type : "list",
        name : "role",
        message: "What role is the employee?",
        choices: roles.map(role => {
            return {
                value: role.id,
                name : role.title
            };
        }),
    
    }
    
    ])
     await db.query(`INSERT into employee (first_name, last_name, role_id) VALUES ( "${firstName}", "${lastName}," "${role}") `)
     const newEmployees = await viewEmployees()
     return `${firstName} ${lastName} ${role}`
    }catch (err) {
        console.log (err)
    }
    }
    
    module.exports = { viewEmployees, addEmployee }