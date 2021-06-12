const connection = require('./connection');

class DB {
   constructor(connection) {
      this.connection = connection
   }

   viewAllDepartments() {
      return this.connection.query(
        `
         SELECT 
            department.id,
            department.name
         FROM
	         department
         ORDER BY 
	         department.id
         `
      );
   }

   viewAllRoles() {
      return this.connection.query(
        `
         SELECT 
            role.id,
            role.title,
            role.salary,
            department.name as department_name
         FROM 
            role
         LEFT JOIN
            department ON
            role.department_id = department.id
         ORDER BY
            role.id`
      );

   }

   viewAllEmployees() {
      return this.connection.query(
         `SELECT 
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title as role,
            role.salary,
            department.name as department_name,
            employee.manager_id
         FROM
            employee
         LEFT JOIN
            role ON
            employee.role_id = role.id
         LEFT JOIN
            department ON
            role.department_id = department.id
         `
      );
   }

   createDepartment(department) {
      return this.connection.query(
         `
         INSERT INTO
            department 
         SET
            ?
         `,
         department
      );
   }

   createRole(role) {
      return this.connection.query(
         `
         INSERT INTO
            role 
         SET
            ?
         `,
         role
      );
   }

   addEmployee(employee) {
      return this.connection.query(
         `
         INSERT INTO
            employee
         SET
            ?
         `,
         employee
      );
   }

   updateEmployee(role_id, employee_id) {
      return this.connection.query(
         `
         UPDATE 
            employee
         SET
            role_id = '?'
         WHERE
            id = '?'

         `,
         [role_id, employee_id]
      );
   }
}

module.exports = new DB(connection);