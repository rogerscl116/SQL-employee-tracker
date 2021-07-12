const inquire = require('inquirer');
const figlet = require('figlet');
const Departments = require('./lib/Classes/Departments');
const Roles = require('./lib/Classes/Roles');
const Employees = require('./lib/Classes/Employees');
const {initialQuestions,
    addEmployeeQuestions,
    addDepartmentQuestions,
    addRoleQuestions,
    listofEmployees, getRole} = require('./lib/questionsArray');

let newEmployee = new Employees();
let newRole = new Roles();
let newDepartment = new Departments()

init = () => {
  // screen at beginning
  figlet('Employee Tracker', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
    console.log('\n');
    startApp();
  })
};

const startApp = async () => {
    inquire
    .prompt(initialQuestions)
    .then(data => userQuestions(data))
    .catch(error => console.log(error))
    
}

const userQuestions = async (answer) => {
  switch(answer.viewAddOrUpdate) {
      case 'View all departments':
          await showDepartments();
          break;
      case 'View all roles':
          await showRoles();
          break;
      case 'View all employees':
          await showEmployees();
          break;
      case 'Add a department':
          inquire
          .prompt(addDepartmentQuestions)
          .then(data => addNewDepartment(data))
          .catch(error => error);
          break;
      case 'Add a role':
          inquire
          .prompt(addRoleQuestions)
          .then(data => addNewRole(data))
          .catch(error => error);
          break;
      case 'Add an employee':
          inquire
          .prompt(addEmployeeQuestions)
          .then(data => addNewEmployee(data))
          .catch(error => error)
          break;
      case 'Update employee role':
          await updateEmployeeRole();
  }
}

const showDepartments = async () => {
  try {
      await newDepartment.getAllDepartments();
      setTimeout(startApp, 1000)
  } catch (error) {
      console.log(error)
  }
}

const showRoles = async () => {
  try {
      await newRole.getAllRoles();
      setTimeout(startApp, 1000)
  } catch (error) {
      console.log(error)
  }
}

const showEmployees = async () => {
  try {
      await newEmployee.getAllEmployees();
      setTimeout(startApp, 1000);
      
  } catch (error) {
      console.log(error)
  }
}

const addNewDepartment = async (data) => {
  try {
      await newDepartment.addDepartment(data)

      setTimeout(startApp, 1000)
     
 } catch (error) {
     console.log('Failed to add a new department.')
  }
}

const addNewRole = async (data) => {
  try {  
      await newRole.addRole(data);
  
      setTimeout(startApp, 1000)
      
  } catch (error) {
     console.log('Failed to add a new Role.') 
  }
}

const addNewEmployee = async (data) => {
  try {        
      
      const rolesChoices = await newRole.getRoleNames(data.department)
      
      const {role} = await inquire.prompt([
          {   
              type: 'list',
              name: 'role',
              message: 'Enter the new role of the employee:',
              choices: rolesChoices
          }
      ])
      
      await newEmployee.addEmployee(data, role);
      setTimeout(startApp, 1000)
  } catch (error) {
      console.log('Failed to add a new employee.')
  }
}

const updateEmployeeRole = async () => {
  try {
      const name = await inquire.prompt(listofEmployees)

      let splitName = name.employee.split(' ')
      
      const rolesChoices = await newRole.getRoleNames(name.department)
      
      const {role} = await inquire.prompt([
          {
              type: 'list',
              name: 'role',
              message: "Enter the employee's role:",
              choices: rolesChoices
          }
      ])

      
      await newEmployee.updateEmployeeRoleinDB(role, splitName, name.department)
      
      setTimeout(startApp, 1000);
  } catch (error) {
      console.log('Was unable to update employee role.')
  }
}

init();

