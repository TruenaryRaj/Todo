import { Router } from "express";
import {todoController} from '../controllers/todo.controller';
import { userController } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

//todo_routes
router.post('/todo/create', authenticateToken, todoController.createTodo);
router.get('/todo/get', authenticateToken, todoController.getAll);
router.delete('/todo/delete/:id', authenticateToken, todoController.deleteTodo);
router.put('/todo/update', authenticateToken, todoController.updateTodo);
router.get('/todo/get/:id', authenticateToken, todoController.getById);

//user_routes
router.post('/user/create', userController.createUser);
router.get('/user/get', userController.displayUsers);
router.put('/user/update', userController.updateUser);
router.delete('/user/delete/:id', userController.deleteUser);
router.post('/user/login', userController.userLogin);

export default router;
