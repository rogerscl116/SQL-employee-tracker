const { prompt } = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const db = require('./db/connection');

function init() {
  // screen at beginning
  figlet('Employee Tracker', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
    console.log('\n');
    userQuestions()
  })
};

// user questions function
const userQuestions = () => {
  prompt([{
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
  }])
  .then((answer) => {
    switch (answer.menu) {
      case 'View All Departments':
        viewDepts();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add A Department':
        addDept();
        break;
      case 'Add A Role':
        addRole();
        break;
      case 'Add An Employee':
        addEmployee();
        break;
      case 'Update An Employee Role':
        updateRole();
        break;
    }
  })
}

const viewDepts = () => {
  db.query(`SELECT * FROM department`, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.table('Departments', res);
      userQuestions();
  })
};

const viewRoles = () => {
  const query = `SELECT role.title, role.id, department.name AS department, role.salary
  FROM employee
  LEFT JOIN role ON (role.id = employee.role_id)
  LEFT JOIN department ON (department.id = role.department_id)
  ORDER BY role.title;`;
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.table('Roles', res);
      userQuestions();
  });
}

const viewEmployees = () => {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN employee manager on manager.id = employee.manager_id
  LEFT JOIN department ON role.department_id = department.id
  ORDER BY employee.id;`;
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.table('Employees', res);
      userQuestions();
  });
}

const addDept = () => {
  const query = `SELECT name AS "Departments" FROM department`;
  db.query(query, (err, res) => {
      if (err) throw err;

      console.log('');
      console.table(res);

      prompt([
          {
              name: 'newDept',
              type: 'input',
              message: 'Enter the name of your new department:',
              validate: newDept => {
                if (newDept) {
                  return true;
                } else {
                  console.log('Please enter a department name!');
                  return false;
                }
              }
          }
      ]).then((answer) => {
          db.query(`INSERT INTO department(name) VALUES(?)`, answer.newDept)
          viewDepts();
          userQuestions();
      })
  })
}

const addRole = () => {
  const query = `SELECT * FROM role`
  db.query(query, (err, res) => {
      if (err) throw err;

      console.log('');
      console.table('Roles', res);

      prompt([
          {
              name: 'newName',
              type: 'input',
              message: 'Enter the new role name:',
              validate: newName => {
                if (newName) {
                  return true;
                } else {
                  console.log('Please enter a role name!');
                  return false;
                }
              }
          },
          {
              name: 'newSalary',
              type: 'input',
              message: 'Enter the salary for the new role:',
              validate: newSalary => {
                if (newSalary) {
                  return true;
                } else {
                  console.log('Please enter a salary for the new role!');
                  return false;
                }
              }
          },
          {
              name: 'dept',
              type: 'list',
              message: 'Select the department for the new role:',
              // choices:
          }
      ]).then((answer) => {
          db.query(
              `INSERT INTO roles(title, salary, department_id) 
              VALUES
              ("${answer.newName}", "${answer.newSalary}", 
              (SELECT id FROM department WHERE department_name = "${answer.dept}"));`
          )
          userQuestions();

      })
  })
}

init();