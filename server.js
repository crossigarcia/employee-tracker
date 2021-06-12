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
           return viewAllDepartments();
         case "View all roles":
           return viewAllRoles();
         case "View all employees":
           return viewAllEmployees();
         case "Add a department":
           return createDepartment();
         case "Add a role":
           return createRole();
         case "Add an employee":
            return addEmployee();
         case "Update employee information":
            return updateEmployee();  
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
   const listDepartments = departments.map(( {id, name} ) => ({
      name: name,
      value: id
   }));

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

   await db.createRole(role);
   console.log('New role added!');
   startApp();
};

async function addEmployee() {
   const roles = await db.viewAllRoles();
   const listRoles = roles.map(({id, title}) => ({
      name: title,
      value: id
   }));

   const employees = await db.viewAllEmployees();
   const listEmployees = employees.map(({id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id
   }));
   
   listEmployees.unshift({ name: 'None', value: null});

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
         type: 'list',
         name: 'manager_id',
         message: 'Who is their manager?',
         choices: listEmployees
      }
   ]);

   await db.addEmployee(employee);
   console.log('Added new employee!');
   startApp();
};

async function updateEmployee() {
   const employees = await db.viewAllEmployees();
   const listEmployees = employees.map(({id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id
   }));

   const { employee_id } = await inquirer.prompt([
      {
         type: 'list',
         name: 'employee_id',
         message: 'Which employee would you like to update?',
         choices: listEmployees
      }
   ]);

   const roles = await db.viewAllRoles();
   const listRoles = roles.map(({ id, title }) => ({
     name: title,
     value: id,
   }));

   const { role_id } = await inquirer.prompt([
     {
       type: 'list',
       name: 'role_id',
       message: 'What is their new role?',
       choices: listRoles,
     }
   ]);

   await db.updateEmployee(role_id, employee_id);
   console.log('Employee role updated!');
   startApp();
}
 
startApp();