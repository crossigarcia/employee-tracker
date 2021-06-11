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
            department.name
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
            role.title,
            role.salary,
            employee.manager_id
         FROM
            employee
         LEFT JOIN
            role ON
            employee.role_id = role.id
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
            title = '?',
            salary = '?',
            department_id = '?'
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
            first_name = '?',
            last_name = '?',
            role_id = '?',
            manager_id = '?'
         `,
         employee
      );
   }

   updateEmployee(employee) {
      return this.connection.query(
         `
         UPDATE 
            employee
         WHERE
            id = '?',
         SET
            role_id = '?'

         `,
         employee
      );
   }
}

module.exports = new DB(connection);