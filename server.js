const inquirer = require('inquirer');
const db = require('./db');
require('console.table');

//start inquirer prompts
function startApp() {
   console.log(`
* * * * * * * * * * * * * * * * *
*  Hogwarts Museum of Fine Arts *
* * * * * * * * * * * * * * * * *
   `);
   return inquirer
     .prompt([
       {
         type: "list",
         name: "mainMenu",
         message: "Select and option to proceed:",
         choices: [
           "View all departments",
           "View all roles",
           "View all employees",
           new inquirer.Separator(),
           "Add a department",
           "Add a role",
           "Add an employee",
           new inquirer.Separator(),
           "Update employee information",
           new inquirer.Separator()
         ],
       },
     ])
     .then((res) => {
       switch (res.mainMenu) {
         case "View all departments":
           viewAllDepartments();
           return;
         case "View all roles":
           viewAllRoles();
           return;
         case "View all employees":
           viewAllEmployees();
           return;
         case "Add a department":
           createDepartment();
           return;
         case "Add a role":
           createRole();
           return;
         case "Add an employee":
            addEmployee();
            return;
         case "Update employee information":
            updateEmployee();
            return;
       }
     });
};

async function viewAllDepartments() {
   const departments = await db.viewAllDepartments();

   console.table(departments);

   startApp();
};

async function viewAllRoles() {
   const roles = await db.viewAllRoles();

   console.table(roles);

   startApp();
};

async function viewAllEmployees() {
   const employees = await db.viewAllEmployees();

   console.table(employees);

   startApp();
};

async function createDepartment() {
   const department = await inquirer.prompt([
      {
         type: 'input',
         name: 'name',
         message: 'What is the name of the new department?'
      }
   ])
   await db.createDepartment(department);

   console.log('New department added!');
   startApp();
};

async function createRole() {
   const departments = await db.viewAllDepartments();
   const listDepartments = departments.map(( {id, name} ) => {})

   const role = await inquirer.prompt([
      {
         type: 'input',
         name: 'title',
         message: 'What is the title of the new role?'
      },
      {
         type: 'input',
         name: 'salary',
         message: 'What is the salary for this role?'
      },
      {
         type: 'list',
         name: 'department_id',
         message: 'What department does this role belong to?',
         choices: listDepartments
      }
   ]);

   console.log('New role added!');
   startApp();
};

async function addEmployee() {
   const roles = await db.viewAllRoles();
   const listRoles = roles.map(({id, title}) => {});

   const employees = await db.viewAllEmployees();
   const listEmployees = employees.map(({id, first_name, last_name}) => {});
   
   const employee = await inquirer.prompt([
      {
         type: 'input',
         name: 'first_name',
         message: 'What is their first name?'
      },
      {
         type: 'input',
         name: 'last_name',
         message: 'What is their last name?'
      },
      {
         type: 'list',
         name: 'role_id',
         message: 'What is their role?',
         choices: listRoles
      },
      {
         type: 'confirm',
         name: 'manager',
         message: 'Do they have a manager?'
      },
      {
         //when manager is true..
         type: 'list',
         name: 'manager_id',
         message: 'Who is their manager?',
         choices: listEmployees
      }
   ]);

   console.log('Added new employee!');
   startApp();
};

async function updateEmployee() {
   const employees = await db.viewAllEmployees();
   const listEmployees = employees.map(({id, first_name, last_name}) => {});

   const roles = await db.viewAllRoles();
   const listRoles = roles.map(({ id, title }) => {});

   const employee = await inquirer.prompt([
      {
         type: 'list',
         name: 'id',
         message: 'Which employee would you like to update?',
         choices: listEmployees
      },
      {
         input: 'list',
         name: 'role_id',
         message: 'What is their new role?',
         choices: listRoles
      }
   ]);

   console.log('Employee role updated!');
   startApp();
}
 
startApp();