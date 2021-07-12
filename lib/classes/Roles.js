const db = require('../../db/connection');
const cTable = require('console.table');

class Roles {
    async getAllRoles() {
        try {
            const sql = `SELECT role.id, role.title, role.salary, department.name
                    AS department
                    FROM role
                    LEFT JOIN department
                    ON role.department_id = department.id`
    
            const [rows, fields] = await db.promise().query(sql)

            console.table(rows);
            
        } catch (error) {
            console.log('Failed to get all roles.')
        }
    }

    async getDepartmentID(department) {
        const sql = `SELECT id FROM department WHERE name = ?`
        
        const [rows, fields] = await db.promise().query(sql, department)

        return rows[0].id;
    }

    async addRole({name, salary, department}) {

            const sql = `INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`
            const params = [name, salary, await this.getDepartmentID(department)]
    
            await db.promise().query(sql, params)
    
            console.log('Role Added!')
    }

    async getRoleNames(department) {
        const sql = `SELECT role.title FROM role
                    WHERE department_id = ?`
        const params = [await this.getDepartmentID(department)]

        const [rows, fields] = await db.promise().query(sql, params)
        
        return rows.map(role => role.title);
    }

    async getAllRoleNames() {
        const sql = `SELECT role.title FROM role`

        const [rows, fields] = await db.promise().query(sql, params)
        
        return rows.map(role => role.title);
    }
}

module.exports = Roles;