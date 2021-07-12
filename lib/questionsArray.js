const Departments = require('./Classes/Departments');
const Roles = require('./Classes/Roles');
const Employees = require('./Classes/Employees');

const initialQuestions = [
    {
        type: 'list',
        name: 'viewAddOrUpdate',
        message: 'Select one of the following options',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
    }
]

const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
        validate: name => {
            if(name) {
                return true;
            } else {
                console.log('Please enter a First Name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
        validate: name => {
            if(name) {
                return true;
            } else {
                console.log('Please enter a Last Name!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'department',
        message: 'Enter the department of the new employee:',
        choices: async () => {
            let newDepartment = new Departments();
            return await newDepartment.getDepartmentNames();
        }
    },
    {
        type: 'input',
        name: 'manager_first_name',
        message: "Enter the employee's manager(First Name):"
    },
    {
        type: 'input',
        name: 'manager_last_name',
        message: "Enter the employee's manager(Last Name):"
    }
]

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:',
        validate: name => {
            if(name) {
                return true;
            } else {
                console.log('Please enter a department name!');
                return false;
            }
        }
    }
]

const addRoleQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the new employee role:',
        validate: name => {
            if(name) {
                return true;
            } else {
                console.log('Please enter a role name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:'
    },
    {
        type: 'list',
        name: 'department',
        message: 'Enter the department for the new role:',
        choices: async () => {
            let getDepartments = new Departments();
            return await getDepartments.getDepartmentNames();
        }
    }
]

const listofEmployees = [
    {
        type: 'list',
        name: 'employee',
        message: 'Enter the employee you would like to edit:',
        choices: async () => {
            let getEmployees = new Employees();
            const employeeList = await getEmployees.getEmployeesNames();
            return employeeList
        }
    },
    {
        type: 'list',
        name: 'department',
        message: 'Enter the department the new role is in:',
        choices: async () => {
            let getDepartments = new Departments();
            return await getDepartments.getDepartmentNames();
        }
    }
]

module.exports = {
    initialQuestions,
    addEmployeeQuestions,
    addDepartmentQuestions,
    addRoleQuestions,
    listofEmployees
}