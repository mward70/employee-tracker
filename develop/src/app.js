const { 
    mainMenu, 
    departmentPrompt, 
    rolePrompt, 
    employeePrompt, 
    updateEmployeeRolePrompt 
} = require("./prompts");

const { 
    getDepartments, 
    getRoles, 
    getEmployees, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployeeRole 
} = require("./queries");

const startApp = async () => {
    let running = true;
    while (running) {
        const { action } = await mainMenu();

        switch (action) {
            case "View all departments":
                await getDepartments();
                break;
            case "View all roles":
                await getRoles();
                break;
            case "View all employees":
                await getEmployees();
                break;
            case "Add a department":
                const { name } = await departmentPrompt();
                await addDepartment(name);
                break;
            case "Add a role":
                const departments = await getDepartments(); // Fetches department data
                const roleData = await rolePrompt(departments); // Passes to prompt
                await addRole(roleData);
                break;
            case "Add an employee":
                const roles = await getRoles(); // Fetches role data
                const managers = await getEmployees(); // Fetches manager data
                const employeeData = await employeePrompt(roles, managers); // Passes to prompt
                await addEmployee(employeeData);
                break;
            case "Update an employee role":
                const employees = await getEmployees(); // Fetches employee data
                const roleOptions = await getRoles(); // Fetches role data
                const updateData = await updateEmployeeRolePrompt(employees, roleOptions); // Passes to prompt
                await updateEmployeeRole(updateData);
                break;
            case "Exit":
                running = false;
                console.log("Goodbye!");
                break;
            default:
                console.log("Option not recognized. Please try again.");
        }
    }
};

// Start the application
startApp();
