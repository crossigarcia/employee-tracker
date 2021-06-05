const inquirer = require('inquirer');
const db = require('./db');
require('console.table');

//start inquirer prompts
function startApp() {
   return inquirer.prompt([
      {
         type: 'list',
         name: 'options',
         message: 'What would you like to do?',
         choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            new inquirer.Separator(),
            'Add a department',
            'Add a role',
            'Add an employee',
            new inquirer.Separator(),
            'Update employee information'
         ]
      }
   ])
   .then((res) => {
      switch (res.options) {
         case 'View all departments':
            viewAllDepartments();
            startApp();
         case 'View all roles':
            viewAllRoles();
            startApp();
         case 'View all employees':
            viewAllEmployees();
            startApp();
         case 'Add a department':
            createDepartment();
            startApp();
         case 'Add a role':
            //createRole();
            startApp();
         case 'Add an employee':
            //addEmployee();
            startApp();
         case 'Update employee information':
            //updateEmployee();
            startApp();
      }
   });
};

async function viewAllDepartments() {
   const departments = await db.viewAllDepartments();

   console.table(departments);
}

async function viewAllRoles() {
   const roles = await db.viewAllRoles();

   console.table(roles);
}

async function viewAllEmployees() {
   const employees = await db.viewAllEmployees();

   console.table(employees);
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
}
 
startApp();