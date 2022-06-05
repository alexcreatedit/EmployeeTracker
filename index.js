import mysql from 'mysql2';
// import { EmployeeTracker } from './lib/employeetracker.js'

const init = () => {
    const sqlConnect = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeetracker_db'
    }

    const db = mysql.createConnection(sqlConnect, console.log(`\n...connected to employee tracker database\n`));
    const employeeTracker = new EmployeeTracker(db);
    employeeTracker.init();
}

init();