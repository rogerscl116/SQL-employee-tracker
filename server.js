const { prompt } = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

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
        //addRole();
        break;
      case 'Add An Employee':
        //addEmployee();
        break;
      case 'Update An Employee Role':
        //updateRole();
        break;
    }
  })
}

viewDepts = () => {
  db.query(`SELECT * FROM department`, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.table(res);
      return userQuestions();
  })
};

viewRoles = () => {
  const query = `SELECT role.title, role.id, department.name AS department, role.salary
  FROM employee
  LEFT JOIN role ON (role.id = employee.role_id)
  LEFT JOIN department ON (department.id = role.department_id)
  ORDER BY role.title;`;
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.table(res);
      return userQuestions();
  });
}

viewEmployees = () => {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN employee manager on manager.id = employee.manager_id
  INNER JOIN role ON (role.id = employee.role_id)
  INNER JOIN department ON (department.id = role.department_id)
  ORDER BY employee.id;`;
  db.query(query, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.table(res);
      return userQuestions();
  });
}

// addDept = () => {

// }

userQuestions();