const inquirer = require("inquirer");

const mainMenu = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit"
            ]
        }
    ]);
};

const departmentPrompt = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the new department name:"
        }
    ]);
};

const rolePrompt = (departments) => {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the new role title:"
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary for this role:"
        },
        {
            type: "list",
            name: "department_id",
            message: "Select the department for this role:",
            choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
        }
    ]);
};

const employeePrompt = (roles, managers) => {
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name:"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name:"
        },
        {
            type: "list",
            name: "role_id",
            message: "Select the employee's role:",
            choices: roles.map(role => ({ name: role.title, value: role.id }))
        },
        {
            type: "list",
            name: "manager_id",
            message: "Select the employee's manager:",
            choices: [
                { name: "None", value: null },
                ...managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }))
            ]
        }
    ]);
};

const updateEmployeeRolePrompt = (employees, roles) => {
    return inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Select the employee to update:",
            choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
        },
        {
            type: "list",
            name: "role_id",
            message: "Select the new role for the employee:",
            choices: roles.map(role => ({ name: role.title, value: role.id }))
        }
    ]);
};

module.exports = {
    mainMenu,
    departmentPrompt,
    rolePrompt,
    employeePrompt,
    updateEmployeeRolePrompt
};
