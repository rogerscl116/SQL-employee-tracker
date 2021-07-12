const db = require('../../db/connection.js');
const cTable = require('console.table');

class Departments {
    async getAllDepartments() {
        try {
            const sql = `SELECT * FROM department`
    
            const [rows, fields] = await db.promise().query(sql)

            console.table(rows)
            
        } catch (error) {
            
        }
    }

    async addDepartment({name}) {
        const sql = `INSERT INTO department(name) VALUES(?)`

        await db.promise().query(sql, name)
        
        console.log('Department Added!')
    }

    async getDepartmentNames() {
        const sql = `SELECT department.name FROM department`

        const [rows, fields] = await db.promise().query(sql)
        
        return rows.map(department => department.name);
    }
}

module.exports = Departments;