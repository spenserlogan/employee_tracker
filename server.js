const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'yourRootPassword',
    database: 'employee_DB'
})

//add department
const addDepartment = () => {
    // connection.query("SELECT * FROM department", function (err, res) {
    //     const depart = res.map((i) => {
    //         return { id: i.id, name: i.name }
    //     })
    // })
    inquirer.prompt([
        {
            type: 'input',
            name: "addDepartment",
            message: "What department would you like to add",
        }
    ])
        .then((answer) => {
            console.log(answer.addDepartments);
            const department = {}
            connection.query("INSERT INTO department (name) VALUES (?)", [answer.addDepartment], function (err, res) {
                if (err) throw err;
                console.log(res);
                runPrompt();
            });
        });
}

//add Employee
const addEmployees = () => {
    console.log("Employees add")
    connection.query("SELECT * FROM role", function (err, res) {
        //const fruits = [{ name: "apple", price: 10} ,{name: "banana", price: 15}]
        //one object to another object association 
        //const namesOfFruits = fruits.
        const roles = res.map((i) => {
            return { id: i.id, title: i.title }
        })

        connection.query("SELECT * FROM employee", function (err, res) {
            //const fruits = [{ name: "apple", price: 10} ,{name: "banana", price: 15}]
            //one object to another object association 
            //const namesOfFruits = fruits.
            const employees = res.map((i) => {
                return { id: i.id, name: i.first_name + " " + i.last_name }
            })
            console.log(roles);
            inquirer.prompt([
                {
                    type: "input",
                    name: "employeeFirst",
                    message: "What is the first name of the employee?",
                },
                {
                    type: "input",
                    name: "employeeLast",
                    message: "What is the last name of the employee",
                },
                {
                    type: "list",
                    name: "roleID",
                    message: "What is the employees role id?",
                    choices: roles.map((i) => { return { name: i.title, value: i.id } })
                },
                {
                    type: "list",
                    name: "managerID",
                    message: "What is the employees manager id?",
                    choices: employees.map((i) => { return { name: i.name, value: i.id } })
                },
            ])
                .then((answer) => {
                    console.log(answer)
                    const employee = {first_name: answer.employeeFirst, last_name: answer.employeeLast, role_id: answer.roleID, manager_id:answer.managerID}
                    connection.query("INSERT INTO employee SET ?", employee, function (err, res) {
                        if (err) throw err;
                        console.log(res);
                        runPrompt();
                    });
                });
        })
    })

}

//add Role
const addRoles = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addTitle",
            message: "What is the title of this role?",
        },
        {
            type: "input",
            name: "addSalary",
            message: "What is the salary of this role?",
        },
        {
            type: "input",
            name: "departmentID",
            message: "What is the department id?",
        },
    ])
        .then((answer) => {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.addTitle, answer.addSalary, answer.departmentID], function (err, res) {
                if (err) throw err;
                console.log(res);
                runPrompt();
            });
        });
}

//Update Employee
const updateEmployee = () => {
    connection.query("SELECT * FROM role", function (err, res){
        const roles = res.map((i) => {
            return { id: i.id, title: i.title }
        })
        connection.query("SELECT * FROM employee", function (err, res) {
            const employees = res.map((i) => {
                return { id: i.id, name: i.first_name + " " + i.last_name}
            })
            inquirer.prompt([
                {
                    type: "input",
                    name: "employeeFirst",
                    message: "What is the employees first name?"
                },
                {
                    type: "input",
                    name: "employeeLast",
                    message: "What is the employees last name?"
                },
                {
                    type: "list",
                    name: "roleID",
                    message: "What is the employees role id?",
                    choices: roles.map((i) => { return { name: i.title, value: i.id } })
                },
                {
                    type: "list",
                    name: "managerID",
                    message: "What is the employees manager id?",
                    choices: employees.map((i) => { return { name: i.name, value: i.id } })
                }
            ])
            .then((answer) => {
                console.log(answer)
                const employee = {first_name: answer.employeeFirst, last_name: answer.employeeLast, role_id: answer.roleID, manager_id:answer.managerID}
                connection.query("INSERT INTO employee SET ?", employee, function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    runPrompt();
                });
            });
        });
    });
    
}

//view departments
function viewDepartments() {
    connection.query("SELECT name FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        runPrompt();
    });
}

//view Roles
function viewRoles() {
    connection.query("SELECT role.title, role.salary, department.name FROM role LEFT JOIN department on role.department_id = department.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        runPrompt();
    });
}

function viewEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        runPrompt();
    });
}

const runPrompt = () => {
    inquirer.prompt({
        type: "list",
        name: "userChoices",
        message: 'What would you like to do?',
        choices: [
            "Add Department",
            "Add Employees",
            "Add Roles",
            "View Departments",
            "View Employees",
            "View Roles",
            "Update Employee",
        ]
    })
        .then((answer) => {
            switch (answer.userChoices) {
                case 'Add Department':
                    addDepartment();
                    break;

                case 'Add Employees':
                    addEmployees()
                    break;

                case 'Add Roles':
                    addRoles();
                    break;

                case 'View Departments':
                    viewDepartments();
                    break;

                case 'View Employees':
                    viewEmployees();
                    break;

                case 'View Roles':
                    viewRoles();
                    break;

                case 'Update Employee':
                    updateEmployee();
                    break;

                // default:
                //     console.log (`Invalid action: ${answer.action}`);
                //     break;
            }
        });
};

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runPrompt();
});