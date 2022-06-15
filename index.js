import mysql from 'mysql2';
import { employeetracker } from './lib/employeetracker.js'

const init = () => {
    const sqlConnect = {
        host: 'localhost',
        user: 'root',
        password: 'August114!',
        database: 'employeetracker_db'
    }

    const db = mysql.createConnection(sqlConnect, console.log(`\n...connected to employee tracker database\n`));
    const employeeTracker = new employeetracker(db);
    employeeTracker.init();
}

init(); 