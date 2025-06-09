import {mysqlTable, serial, varchar} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', {length:50}),
    password: varchar('password', {length: 16})
})
