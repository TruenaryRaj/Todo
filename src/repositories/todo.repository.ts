import { todo } from '../db/schema/todo.schema';
import { db } from '../db/db';
import { eq } from 'drizzle-orm';

export const TodoRepository = {

  async createTodo(todos: { title: string; description: string; date: Date; user_id: number }) {
    await db.insert(todo).values({
      title: todos.title,
      description: todos.description,
      date: todos.date,
      user_id: todos.user_id
    });
  },

  async getById(id: number) {
    const result = await db
      .select()
      .from(todo)
      .where(eq(todo.id, id));
    return result[0];
  },

  async getAll() {
    return await db.select().from(todo);
  },

  async deleteTodo(id: number) {
    await db.delete(todo).where(eq(todo.id, id));
  },

  async updateTodo(todos: { id: number; title: string; description: string; date: Date }) {
    await db
      .update(todo)
      .set({
        title: todos.title,
        description: todos.description,
        date: todos.date,
      })
      .where(eq(todo.id, todo.id));
  },
};
