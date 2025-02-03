const pool = require("./db");

// Fetch all roles
const getRoles = async () => {
    const res = await pool.query(`
        SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role 
        JOIN department ON role.department_id = department.id
    `);
    console.table(res.rows);
    return res.rows; // Return rows for prompt use
};

// Add a new role
const addRole = async ({ title, salary, department_id }) => {
    await pool.query(
        "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
        [title, salary, department_id]
    );
    console.log(`Role "${title}" added successfully!`);
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
