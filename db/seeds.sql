INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('HR');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 90000, 1),
('Accountant', 70000, 2),
('HR Specialist', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Steve', 'Stevenson', 1, NULL),
('Puxsatawny', 'Phil', 2, 1),
('Jo', 'March', 3, 1);