import pool from './db.js'

// Fetch all departments 
const getDepartments = async () => {
        const res = await pool.query("SELECT * FROM department ORDER BY id");
        return res.rows; 
};

// Fetch all employees
const getEmployees = async () => {
    try {
        const res = await pool.query(`
            SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, 
                   department.name AS department, role.salary, 
                   manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        `);
        return res.rows;
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
};

// Fetch all roles 
const getRoles = async () => {
    try {
        const res = await pool.query(`
            SELECT role.id, role.title, department.name AS department, role.salary 
            FROM role 
            JOIN department ON role.department_id = department.id
        `);
        return res.rows;
    } catch (error) {
        console.error("Error fetching roles:", error);
    }
};

// Add a new department 
const addDepartment = async (name) => {
    try {
        await pool.query("INSERT INTO department (name) VALUES ($1)", [name]);
        console.log(`Department "${name}" added successfully!`);
    } catch (error) {
        console.error("Error adding department:", error);
    }
};

// Add a new role
const addRole = async ({ title, salary, department_id }) => {
    try {
        await pool.query(
            "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
            [title, salary, department_id]
        );
        console.log(`Role "${title}" added successfully!`);
    } catch (error) {
        console.error("Error adding role:", error);
    }
};

// Add a new employee
const addEmployee = async ({ first_name, last_name, role_id, manager_id }) => {
    try {
        await pool.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
            [first_name, last_name, role_id, manager_id]
        );
        console.log(`Employee "${first_name} ${last_name}" added successfully!`);
    } catch (error) {
        console.error("Error adding employee:", error);
    }
};

// Update an employee's role
const updateEmployeeRole = async ({ employee_id, role_id }) => {
    try {
        await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [role_id, employee_id]);
        console.log(`Updated employee ID ${employee_id} to role ID ${role_id}`);
    } catch (error) {
        console.error("Error updating employee role:", error);
    }
};

// Export all functions
export {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
