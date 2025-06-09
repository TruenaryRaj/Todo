import { todos } from '../db/schema/todo.schema';
import { db } from '../db/db';
import { eq } from 'drizzle-orm';

export const TodoRepository = {

  async createTodo(todo: { title: string; description: string; date: Date; user_id: number }) {
    await db.insert(todos).values({
      title: todo.title,
      description: todo.description,
      date: todo.date,
      user_id: todo.user_id
    });
  },

  async getById(id: number) {
    const result = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id));
    return result[0];
  },

  async getAll() {
    return await db.select().from(todos);
  },

  async deleteTodo(id: number) {
    await db.delete(todos).where(eq(todos.id, id));
  },

  async updateTodo(todo: { id: number; title: string; description: string; date: Date }) {
    await db
      .update(todos)
      .set({
        title: todo.title,
        description: todo.description,
        date: todo.date,
      })
      .where(eq(todos.id, todo.id));
  },
};
