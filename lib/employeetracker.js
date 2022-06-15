import inquirer from 'inquirer';
import chalk from 'chalk';
import { Query } from './Query.js';

class employeetracker {

     constructor (db) {
          this.db = db;
          this.query = new Query(this.db);
     }

static mainMenuChoices = [
    `View Department`,
    `View Roles`,
    `View Employee`,
    `Add a Department`,
    `Add a Role`,
    `Add an Employee`,
    `Delete a Department`,
    `Delete a Role`,
    `Delete an Employee`,
    `Update an Employee`,
    `Quit`,
    new inquirer.Separator()
];

static mainMenu = [
    {
         type: `list`,
         message: `What would you like to do?`,
         name: `main`,
         choices: employeetracker.mainMenuChoices
    }
];

static departmentMenuChoices = [
    `by IDs`,
    `by Budget Totals`,
    `Go Back`
];

static departmentMenu = [
    {
         type: `list`,
         message: `View:`,
         name: `view`,
         choices: employeetracker.departmentMenuChoices
    }
];

static employeeMenuChoices = [
    `Show all info`,
    `by Manager`,
    `by Department`,
    `Go Back`
];

static employeeMenu = [
    {
         type: `list`,
         message: `View:`,
         name: `view`,
         choices: employeetracker.employeeMenuChoices
    }
];

static addDepartmentPrompt = [
    {
         type: 'input',
         message: 'What is the name of the department?',
         name: 'name',
         validate: val => {

              if (val.length === 0) {
                   console.log('Please input a name')
                   return false;
              }

              return true;
         }
    }
];

static addRolePrompt = [
    {
         type: 'input',
         message: 'What is the title?',
         name: 'name',
         validate: val => {
              
              if (val.length === 0) {
                   console.log('\n\nPlease input a title\n');
              }

              return !(val.length === 0);
         }
    },
    {
         type: 'input',
         message: 'What is the salary?',
         name: 'salary',
         validate: val => {
              
              if (!Number.isInteger(parseInt(val))) {
                   console.log('\n\nPlease input a valid salary\n');
              }

              return Number.isInteger(parseInt(val));
         }
    },
    {
         type: 'list',
         message: 'Which department is this role under?',
         name: 'department'
    },
];

static addEmployeePrompt = [
    {
         type: 'input',
         message: 'What is the employee\'s first name?',
         name: 'first',
         validate: val => {
              
              if (val.length === 0) {
                   console.log('Please input a first name')
                   return false;
              }

              return true;
         }
    },
    {
         type: 'input',
         message: 'What is employee\'s last name?',
         name: 'last',
         validate: val => {
              
              if (val.length === 0) {
                   console.log('Please input a last name')
                   return false;
              }

              return true;
         }
    },
    {
         type: 'list',
         message: 'What is the employee\'s title?',
         name: 'role',
    },
    {
         type: 'list',
         message: 'Who is the employee\'s supervisor?',
         name: 'manager'
    }
];

static deleteDepartmentMenu = [
    {
         type: 'list',
         message: chalk.red('Delete which department?'),
         name: 'del'
    }
];

static deleteRoleMenu = [
    {
         type: 'list',
         message: chalk.red('Delete which role?'),
         name: 'del'
    }
];

static deleteEmployeeMenu = [
    {
         type: 'list',
         message: chalk.red('Delete which employee?'),
         name: 'del'
    }
];

static updateEmployeeMenuChoices = [
    'Role',
    'Manager',
    'Go Back'
];

static updateEmployeeMenu = [
    {
         type: 'list',
         message: 'What would you like to update?',
         name: 'update',
         choices: employeetracker.updateEmployeeMenuChoices
    },
];

static updateEmployeeRoleMenu = [
    {
         type: 'list',
         message: 'Which employee?',
         name: 'employee'
    },
    {
         type: 'list',
         message: 'New role:',
         name: 'role'
    }
];

static updateEmployeeManagerMenu = [
    {
         type: 'list',
         message: 'Which employee?',
         name: 'employee'
    },
    {
         type: 'list',
         message: 'New manager:',
         name: 'manager'
    }
];

quit () {
    this.db.end();
    process.exit(0);
}

displayWelcome () {
    console.log(employeetracker.welcomeMessage);
}

async displayMainMenu () {
    const { main } = await inquirer.prompt(employeetracker.mainMenu);
    
    const [
         viewDep, 
         viewRole, 
         viewEmp, 
         addDep, 
         addRole, 
         addEmp, 
         delDep, 
         delRole, 
         delEmp, 
         updEmp,
         quit
    ] = employeetracker.mainMenuChoices;

    if (main === viewDep) {
         await this.displayDepartmentMenu();
    }

    if (main === viewRole) {
         this.query.displayRoles();
    }

    if (main === viewEmp) {
         await this.displayEmployeeMenu();
    }

    if (main === addDep) {
         await this.addDepartment();
    }

    if (main === addRole) {
         await this.addRole();
    }

    if (main === addEmp) {
         await this.addEmployee()
    }

    if (main === delDep) {
         await this.deleteDepartment();
    }

    if (main === delRole) {
         await this.deleteRole();
    }

    if (main === delEmp) {
         await this.deleteEmployee();
    }

    if (main === updEmp) {
         await this.displayUpdateEmployeeMenu();
    }

    if (main === quit) {
         this.quit();
    } else {
         setTimeout(()=>{
              this.displayMainMenu();
         }, 100);
    }
}

async displayDepartmentMenu () {
    const { view } = await inquirer.prompt(employeetracker.departmentMenu);

    const [
         byID,
         byBudget,
    ] = employeetracker.departmentMenuChoices;

    if (view === byID) {
         this.query.displayDepartment();
    }

    if (view === byBudget) {
         this.query.displayDepartmentByBudget();
    }
}

async displayEmployeeMenu () {
    const { view } = await inquirer.prompt(employeetracker.employeeMenu);

    const [
         showAll,
         byManager,
         byDepartment,
         back
    ] = employeetracker.employeeMenuChoices;

    if (view === showAll) {
         this.query.displayEmployees();
    }

    if (view === byManager) {
         this.query.displayEmployeesByManager();
    }

    if (view === byDepartment) {
         this.query.displayEmployeesByDepartment();
    }
}

async addDepartment () {
    const { name } = await inquirer.prompt(employeetracker.addDepartmentPrompt);
    this.query.addDepartment(name.trim());
}

async addRole () {
    const depts = await this.query.getDepartment();
    depts.forEach(dept => dept.value = dept.id);

    const deptPrompt = employeetracker.addRolePrompt[2];
    deptPrompt.choices = depts;

    const { name, salary, department } = await inquirer.prompt(employeetracker.addRolePrompt);

    this.query.addRole(name.trim(), salary, department);
}

async addEmployee () {

    const roles = await this.query.getRoles();
    roles.forEach(role => {
         role.name = role.title;
         role.value = role.id;
    })
    const rolePrompt = employeetracker.addEmployeePrompt[2];
    rolePrompt.choices = roles;

    const managers = await this.query.getEmployee();
    managers.forEach(manager => {
         manager.name = `${manager.last_name}, ${manager.first_name}`;
         manager.value = manager.id;
    })

    managers.push({
         name: 'None',
         value: null
    })

    const managerPrompt = employeetracker.addEmployeePrompt[3];
    managerPrompt.choices = managers;

    const { first, last, role, manager } = await inquirer.prompt(employeetracker.addEmployeePrompt);
    this.query.addEmployee(first.trim(), last.trim(), role, manager);
}

async deleteDepartment () {
    const depts = await this.query.getDepartment();
    depts.forEach(dept => dept.value = dept.id);
    employeetracker.deleteDepartmentMenu[0].choices = depts;
    const { del } = await inquirer.prompt(employeetracker.deleteDepartmentMenu);
    this.query.deleteDepartment(del);
}

async deleteRole () {
    const roles = await this.query.getRoles();
    roles.forEach(role => {
         role.name = role.title;
         role.value = role.id;
    });
    employeetracker.deleteRoleMenu[0].choices = roles;
    const { del } = await inquirer.prompt(employeetracker.deleteRoleMenu);
    this.query.deleteRole(del);
}

async deleteEmployee () {
    const employee = await this.query.getEmployee();
    employee.forEach(employee => {
         employee.name = `${employee.last_name}, ${employee.first_name}`;
         employee.value = employee.id;
    })
    employeetracker.deleteEmployeeMenu[0].choices = employee;
    const { del } = await inquirer.prompt(employeetracker.deleteEmployeeMenu);
    this.query.deleteEmployee(del);
}

async displayUpdateEmployeeMenu () {
    const [
         role,
         manager
    ] = employeetracker.updateEmployeeMenuChoices

    const { update } = await inquirer.prompt(employeetracker.updateEmployeeMenu);

    if (update === role) {
         await this.updateEmployeeRole();
    }

    if (update === manager) {
         await this.updateEmployeeManager();
    }
}

async updateEmployeeRole () {

    const employees = await this.query.getEmployees();
    employees.forEach(employee => {
         employee.name = `${employee.last_name}, ${employee.first_name}`;
         employee.value = employee.id;
    })

    const roles = await this.query.getRoles();
    roles.forEach(role => {
         role.name = role.title;
         role.value = role.id;
    });

    const employeesPrompt = employeetracker.updateEmployeeRoleMenu[0];
    const rolesPrompt = employeetracker.updateEmployeeRoleMenu[1];
    employeesPrompt.choices = employees;
    rolesPrompt.choices = roles;
    const { employee, role } = await inquirer.prompt(employeetracker.updateEmployeeRoleMenu);
    this.query.updateEmployeeRole(employee, role);
}

async updateEmployeeManager () {

    const employees = await this.query.getEmployees();
    
    employees.forEach(employee => {
         employee.name = `${employee.last_name}, ${employee.first_name}`;
         employee.value = employee.id;
    })

    const managers = await this.query.getEmployees();

    managers.forEach(manager => {
         manager.name = `${manager.last_name}, ${manager.first_name}`;
         manager.value = manager.id;
    });

    managers.push({
         name: 'None',
         value: null
    })

    const employeesPrompt = employeetracker.appupdateEmployeeManagerMenu[0];
    const managerPrompt = employeetracker.updateEmployeeManagerMenu[1];
    employeesPrompt.choices = employees;
    managerPrompt.choices = managers;
    const { employee, manager } = await inquirer.prompt(employeetracker.updateEmployeeManagerMenu);
    this.query.updateEmployeeManager(employee, manager);
}

init () {
    this.displayWelcome();
    this.displayMainMenu();
}
}

export { employeetracker }