USE employee_db;

--department--
INSERT INTO department(name) VALUES ("Finance"), ("Legal"), ("Research");

--roles--
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 45000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 199929, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Researcher", 30004, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Business Guy", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("HR", 60000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer" 90000, 3);

--employee--
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Cody", "Jones", 4, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Steve", "Rogers", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Sara", "Woods", 3, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Beth","Kovac", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Seth", "Hopes", 6, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Blake", "Barnes", 5, 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;