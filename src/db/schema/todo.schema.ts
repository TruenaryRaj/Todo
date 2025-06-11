import { mysqlTable, int, varchar, text, date } from 'drizzle-orm/mysql-core';
import { user } from '../schema/user.schema';

export const todo = mysqlTable('todo', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  date: date('date'),
  user_id: int('user_id').notNull().references(() => user.id),
});
