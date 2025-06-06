import { Request, Response } from 'express';
import { TodoRepository } from '../repositories/todo.repository'; 

export const todoController = {

    async createTodo(req: Request, res: Response) {
        const{title,description,date} = req.body;
        await TodoRepository.createTodo({ title, description, date });
          
         res.status(201).json({
             message: 'Created successfully'
        });
    },

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await TodoRepository.getById(id);

        res.json(result);
    },

    async getAll(req: Request, res:Response) {
        const result = await TodoRepository.getAll();

        res.json(result);
    },

    async deleteTodo(req:Request, res: Response) {
        const id= parseInt(req.params.id);
        await TodoRepository.deleteTodo(id);
        
        res.json({message: id + ' id deleted'});
    },

    async updateTodo(req:Request, res: Response) {
        const {id, title, description, date} = req.body;
        await TodoRepository.updateTodo({id, title, description, date});

        res.json({message: 'updated'});
    }

};
