import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user:'todo_api_user',
    password:'todo_api_pass',
    database:'todo_api'
})
