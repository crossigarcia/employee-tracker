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
}

module.exports = new DB(connection);