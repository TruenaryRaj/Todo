import mysql from 'mysql2/promise';
import {drizzle} from 'drizzle-orm/mysql2';

 const pool = mysql.createPool({
    host: 'localhost',
    user:'todo_api_user',
    password:'todo_api_pass',
    database:'todo_api'
})

export const db = drizzle(pool);