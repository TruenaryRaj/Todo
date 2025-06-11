import { userRepository } from "../repositories/user.repository";
import { Request, Response, RequestHandler} from "express";
import { db } from '../db/db';
import bcrypt from 'bcrypt';
import { user } from '../db/schema/user.schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken'; 


export const userController = {

    async createUser(req: Request, res: Response) {
        const {email, password} = req.body;
        await userRepository.createUser({email, password});

        res.status(201).json({
            message: 'user created'
        });
    },

    async displayUsers(req: Request, res: Response) {
        const result = await userRepository.getAll();

        res.json(result);
    },

    async deleteUser(req: Request, res: Response) {
        const id= parseInt(req.params.id);
        await userRepository.delete(id);
        
        res.json({
            message: 'user deleted sucessfully.'
        })
    },

    async updateUser( req: Request, res: Response) {
        const {id, email, password} = req.body;
        await userRepository.updateUser({ id, email, password});

        res.json({
            message: 'user updated sucessfully.'
        })
    },

    async userLogin (req: Request, res: Response) {
    const { email, password } = req.body;

    const users = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);

    if (users.length === 0) {
         throw new Error("Invalid email or password");
    }

    const foundUser = users[0];

    const isMatch = await bcrypt.compare(password, foundUser.password!);

    if (!isMatch) {
         res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );

     res.status(200).json({ message: 'Login successful', token });
    }
};