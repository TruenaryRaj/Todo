import { Router } from "express";
import {todoController} from '../controllers/todo.controller';

const router = Router();

router.post('/create', todoController.createTodo);
router.get('/get', todoController.getAll);
router.delete('/delete/:id', todoController.deleteTodo);
router.put('/update', todoController.updateTodo);
router.get('/get/:id', todoController.getById);

export default router;
