const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3000,
    user: 'root',
    password: 'yourRootPassword',
    database: 'employee_DB'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runPrompt();
  });

const runPrompt = () => {
    inquirer.prompt ({
        type: list,
        name: userChoices,
        message: 'What would you like to do?',
        choices: [
            "Add Department",
            "Add Employees",
            "Add Roles",
            "Veiw Departments",
            "View Employees",
            "View Roles",
            "Update Employee Roles",
        ],
    })
    .then((answer) => {
        switch(anser.action) {
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

            default:
                console.log (`Invalid action: ${answer.action}`);
                break;
        }
    });
};

//add department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "addDepartment",
            message: "What department would you like to add",
        }
    ])
    .then((answer) => {
        console.log(answer.addDepartments);
        connection.query("INSERT INTO department (name) VALUES ?" [answer.addDepartment], function (err, res) {
            if (err) throw err;
            console.log(res);
            runPrompt();
        });
    });
}

//add Employee
const addEmployees = () => {
    inquire.prompt([
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
            type: "imput",
            name: "roleID",
            message: "What is the employees role id?",
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the employees manager id?",
        },
    ])
    .then((answer) => {
       connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?" [answer.employeeFirst, answer.employeeLast, answer.roleID, answer.managerID], function (err,res) {
           if (err) throw err;
           console.log(res);
           runPrompt;
       });
    });
}

//add Role
const addRoles = () => {
    inquire.prompt([
        {
            type: "input",
            name: "addRoles",
            message: "What role would you like to add?",
        },
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
        connection.query("INSERT INTO role (title, salary, department_id) VALUES ?" [answer.addRoles, answer.addTitle, answer.addSalary, answer.departmentID], function (err,res) {
            if (err) throw err;
            console.log(res);
            runPrompt;
        });
    });
}

//view departments
function viewDepartments() {
    connection.query("SELECT role.title, department.name FROM role LEFT JOIN department on role.department_id = department.id", function (err, res) {
        if (err) throw err;
        console.table (res);
        runPrompt();
    });
}

//view Roles
function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        runPrompt();
    });
}

function viewEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        runPrompt;
    });
}