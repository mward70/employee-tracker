import inquirer from 'inquirer';

import { 
    getDepartments, 
    getRoles, 
    getEmployees, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployeeRole 
} from "../db/queries.js";

const startApp = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (choice) {
        case 'View all departments':
            console.table(await getDepartments());
            break;
        case 'View all roles':
            console.table(await getRoles());
            break;
        case 'View all employees':
            console.table(await getEmployees());
            break;
        case 'Add a department':
            const { deptName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'deptName',
                message: 'Enter department name:',
                validate: input => input.trim() !== "" ? true : "Department name cannot be empty!"
            }
        ]);
        case 'Add a role':
            const roleAnswers = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter role title:', validate: input => input.trim() !== "" ? true : "Role title cannot be empty!" },
                { type: 'input', name: 'salary', message: 'Enter salary:', validate: input => isNaN(input) ? "Enter a valid number!" : true },
            ]);
            await addRole({title: roleAnswers.title, salary: roleAnswers.salary});
            console.log('Role added!');
            break;
        case 'Add an employee':
            const empAnswers = await inquirer.prompt([
                { type: 'input', name: 'first_name', message: 'Enter first name:' },
                { type: 'input', name: 'last_name', message: 'Enter last name:' }
            ]);
            await addEmployee(empAnswers.first_name, empAnswers.last_name);
            console.log('Employee added!');
            break;
        case 'Exit':
             console.log("Closing database connection...");
    await pool.end(); // Closes the PostgreSQL connection
    process.exit();
    }
    startApp();
};

// Start the application
startApp();
