const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewDepartments, addDepartment } = require("./db/departments");
const { viewEmployees, addEmployee } = require("./db/employees");
const { viewRoles } = require("./db/roles");



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
                "Exit"
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
            case "Exit":
                console.log("Goodbye!");
                process.exit();
    }
    start(false);
}

start(true);
