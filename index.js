const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewDepartments, addDepartment, removeDepartment } = require("./db/departments");
const { viewEmployees, addEmployee, updateEmployee, removeEmployee } = require("./db/employees");
const { viewRoles, addRole, removeRole } = require("./db/roles");



const start = async (s) => {
    if (s) console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt([
        {
                type : 'list',
                name : 'choice',
                message : 'What would you like to do?',
                choices : [
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee",
                "Remove an Employee",
                "Delete a Department",
                "Delete a Role",
                "Exit",
                ]
        }
    ])
    console.log(choice)
    switch (choice) {
        case "View all Departments":
            const departments = await viewDepartments()
            console.table(departments)
            break;
        case "View all Roles":
            const roles = await viewRoles()
            console.table(roles)
            break;
        case "View all Employees":
            const employee = await viewEmployees()
            console.table(employee)
            break;
            case "Add an Employee":
                const newEmployees = await addEmployee()
                console.table(newEmployees)
                break;
            case "Add a Department":
                const newDepartment = await addDepartment()
                console.table(newDepartment)
                break;
                case "Add a Role":
                    const newRole = await addRole()
                     console.table(newRole)
                    break;
                case "Update an Employee":
                    const updatedEmployee = await updateEmployee()
                    console.table(updatedEmployee)
                    break;
                case "Remove an Employee":
                     const removedEmployee = await removeEmployee()
                     console.table(removedEmployee)
                     break;
                case "Delete a Department":
                    const removedDepartment = await removeDepartment()
                    console.table(removedDepartment)
                    break;
                    case "Delete a Role":
                        const removedRole = await removeRole()
                        console.table(removedRole)
                        break;
            case "Exit":
                console.log("Goodbye!");
                process.exit();
    }
    start(false);
}

start(true);
