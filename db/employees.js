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
async function updateEmployee(){

}
async function addEmployee(){
    try {
        const roles = await viewRoles();
        const employees = await viewEmployees();
        const {
        firstName,
        lastName,
        role,
        manager

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
    },  
{ 
    type : "list",
    name : "manager",
    message: "Who is the employee's manager?",
    choices: [
         ...employees.map(employee => {
        return {
            value: employee.id,
            name : `${employee.firstName} ${employee.lastName}`
        };
}),
{
    value : null,
    name : "No manager"
    }
]
}
    ])
    await db.query(`INSERT into employee (first_name, last_name, role_id) VALUES ( "${firstName}", "${lastName}," "${role}", "${manager}") `)
     const newEmployees = await viewEmployees()
     return newEmployees
    }catch (err) {
        console.log (err)
    }
    }
    
    module.exports = { viewEmployees, addEmployee, updateEmployee }