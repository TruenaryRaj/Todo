import {mysqlTable, int, varchar} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
    id: int('id').primaryKey().autoincrement(),
    email: varchar('email', {length:100}).unique(),
    password: varchar('password', {length: 100})
})
