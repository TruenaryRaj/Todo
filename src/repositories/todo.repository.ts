import { Todo } from '../models/todo.model';
import { db } from '../db';

export const TodoRepository = {
  
  async createTodo(todo: Todo) {
    const { title, description, date } = todo;
    const [result]: any = await db.execute(
      'INSERT INTO todos (title, description, date) VALUES (?, ?, ?)',
      [title, description, date]
    );
  },

  async getById(id: number) {
    const[result] = await db.execute('select * from todos where id=?', [id]);
    return result;
  },

  async getAll() {
    const[result]: any= await db.execute('select * from todos');
    return result;
  },

  async deleteTodo(id: number) {
    const[result]: any= await db.execute('delete from todos where id=?', [id]);
  },

  async updateTodo(todo:Todo) {
      const{id,title,description,date} = todo;
      const [result] = await db.execute(
        'UPDATE todos SET title = ?, description = ?, date = ? WHERE id = ?',
        [title, description, date, id]
    );

  }
};