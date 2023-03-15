const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewDepartments } = require("./db/departments");
const { viewEmployees } = require("./db/employees");
const { viewRoles } = require("./db/roles");



const start = async () => {
    console.log("Welcome to the Employee Manager!");
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
                "Add a Employee",
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
    }
}

start();
