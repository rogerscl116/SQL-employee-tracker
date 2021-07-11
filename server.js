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
          console.log('Your department has been added!');
          viewDepts();
          userQuestions();
      })
  })
}

const addRole = () => {
  const query = `SELECT * FROM department`;
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
              choices: () => {
                let deptArry = [];
                for (let i = 0; i < res.length; i++) {
                deptArry.push(res[i].name);
                }
                return deptArry;
            },
          }
      ]).then((answer) => {
        let department_id;
        for (let a = 0; a < res.length; a++) {
            if (res[a].name == answer.dept) {
                department_id = res[a].id;
            }
        }
        db.query(`INSERT INTO role SET ?`,
        {
          title: answer.newName,
          salary: answer.newSalary,
          department_id: department_id
        },
        (err, res) => {
          if(err)throw err;
          console.log('Your role has been added!');
          console.log(viewRoles());
          userQuestions();
        })
      })
  })
}

const addEmployee = () => {
  db.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
        prompt([
              {
                  name: 'firstName',
                  type: 'input', 
                  message: "Enter the employee's first name:",
              },
              {
                  name: 'lastName',
                  type: 'input', 
                  message: "Enter the employee's last name:"
              },
              {
                  name: 'managerID',
                  type: 'input', 
                  message: "Enter the employee's manager ID:"
              },
              {
                  name: 'role', 
                  type: 'list',
                  choices: () => {
                  let roleArray = [];
                  for (let i = 0; i < res.length; i++) {
                      roleArray.push(res[i].title);
                  }
                  return roleArray;
                  },
                  message: "Enter the employee's role:"
              }
              ]).then((answer) => {
                  let role_id;
                  for (let a = 0; a < res.length; a++) {
                      if (res[a].title == answer.role) {
                          role_id = res[a].id;
                      }                  
                  }  
                  db.query(
                  'INSERT INTO employee SET ?',
                  {
                      first_name: answer.firstName,
                      last_name: answer.lastName,
                      manager_id: answer.managerID,
                      role_id: role_id,
                  },
                  (err) => {
                      if (err) throw err;
                      console.log('Your employee has been added!');
                      console.log(viewEmployees());
                      userQuestions();
                  })
              })
      })
};

init();

