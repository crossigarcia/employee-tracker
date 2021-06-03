const inquirer = require('inquirer');
const db = require('./db');
require('console.table');

async function viewAllDepartments() {
   const departments = await db.viewAllDepartments();

   console.table(departments);
}

async function viewAllRoles() {
   const roles = await db.viewAllRoles();

   console.table(roles);
}

async function createDepartment() {
   const department = await inquirer.prompt([
      {
         type: 'input',
         name: 'name',
         message: 'What is the name of the department?'
      }
   ])
   await db.createDepartment(department);

   console.log('New department added!');

   viewAllDepartments();
}
 
createDepartment();
