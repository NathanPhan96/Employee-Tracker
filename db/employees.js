const db = require("./connection");
const inquirer = require("inquirer");
const { viewRoles } = require("./roles");
async function viewEmployees() {
   try{ 
    const employee = 
    await db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id")
        return employee
    } catch (err){
    console.log(err)
    }
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
        ...employees.map((e) => {
        return {
            value: e.id,
            name : `${e.first_name} ${e.last_name}`
        };
}),
{
    value : null,
    name : "No manager"
    }
]
}
    ])
    await db.query(`INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${role}", "${manager}") `)
     const newEmployees = await viewEmployees()
     return newEmployees
    }catch (err) {
        console.log (err)
    }
    }
    
    async function updateEmployee() {
        try {
          const currentEmployees = await viewEmployees();
          const employeeRoles = await viewRoles();
          const { employee, newRole } = await inquirer.prompt([
            {
              type: "list",
              name: "employee",
              message: "Select an employee that you would like to update!",
              choices: currentEmployees.map((e) => {
                return {
                  name: `${e.first_name}, ${e.last_name}`,
                  value: e.id,
                };
              }),
            },
            {
              type: "list",
              name: "newRole",
              message: `Select the employee's new role to be updated with`,
              choices: employeeRoles.map((role) => {
                return {
                  name: role.title,
                  value: role.id,
                };
              }),
            },
          ]);
    
          await db.query(
            `UPDATE employee SET role_id = ${newRole} WHERE id = ${employee}`
          );
          const updatedEmployee = await viewEmployees();
          return await updatedEmployee;
        } catch (err) {
          console.log(err);
        }
      }
    
      async function removeEmployee() {
        try{
            const currentEmployees = await viewEmployees();
            const { id } = await inquirer.prompt([
                {
                    type: 'list',
                    message: "Which employee would you like to remove from the database?",
                    name: 'id',
                    choices: currentEmployees.map(employee => {
                        return {
                            name: `${employee.first_name}, ${employee.last_name}`,
                            value : employee.id,
                        };
    
                    }),
                },
            ]);
            await db.query(`DELETE FROM employee WHERE id = ${id}`);
            return await viewEmployees(); 
        } catch (err) {
            console.log(err);
        }
        }
    
    module.exports = { viewEmployees, addEmployee, updateEmployee, removeEmployee }