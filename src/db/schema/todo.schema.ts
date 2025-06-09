import { mysqlTable, int, serial, varchar, text, date } from 'drizzle-orm/mysql-core';
import { users } from '../schema/user.schema';

export const todos = mysqlTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  date: date('date'),
  user_id: int('user_id').notNull().references(() => users.id),
});
