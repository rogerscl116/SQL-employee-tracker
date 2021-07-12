const db = require('../../db/connection');
const cTable = require('console.table');


class Employees {
    async getAllEmployees() {
        try {
            const sql = `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department, m.first_name AS manager_first_name , m.last_name AS manager_last_name
                    FROM employee AS e
                    LEFT JOIN role AS r
                    ON e.role_id = r.id
                    LEFT JOIN department AS d
                    ON r.department_id = d.id
                    LEFT JOIN employee AS m
                    ON e.manager_id = m.id`
    
            const [rows, fields] = await db.promise().query(sql)
            
            console.table(rows)
        } catch (error) {
            console.log('Failed to show all employees.')
        }
    }

    async getDepartmentID(department) {
            const sql = `SELECT id FROM department WHERE name = ?`
            
            const [rows, fields] = await db.promise().query(sql, [department])
                    
            return rows[0].id;  
   
    }

    async getRoleID(role, department) {
            const sql = `SELECT id FROM role WHERE title = ? AND department_id = ?`
            const params = [role, await this.getDepartmentID(department)]

            const [rows, fields] = await db.promise().query(sql, params)

            return rows[0].id;  
    }

    async getManagerID(first_name, last_name) {
        const sql = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`

        const [rows, fields] = await db.promise().query(sql, [first_name, last_name])

        return rows[0].id;
    }

    async addEmployee({first_name, last_name, department, manager_first_name, manager_last_name}, role) {
        const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`
        const role_id = await this.getRoleID(role, department);
        const manager_id = await this.getManagerID(manager_first_name, manager_last_name);
        
        const params = [first_name, last_name, role_id, manager_id]

        await db.promise().query(sql, params)

        console.log('Employee Added!')
    }

    async updateEmployeeRoleinDB(role, name, department) {
        const sql = `UPDATE employee SET role_id = ?
                    WHERE first_name = ? and last_name = ?`
        const params = [await this.getRoleID(role, department), name[0], name[1]]

        await db.promise().query(sql, params);

        console.log('Employee Updated!');       
    }
    
    async getEmployeesNames() {
        const sql = `SELECT first_name, last_name
                    FROM employee`
        
        const [rows, fields] = await db.promise().query(sql);
        
        const employeeList = rows.map(employee => employee.first_name + ' ' + employee.last_name)
        
        return employeeList;
    }
}

module.exports = Employees;