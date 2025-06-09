import { userRepository } from "../repositories/user.repository";
import { Request, Response, RequestHandler} from "express";
import { db } from '../db/db';
import bcrypt from 'bcrypt';
import { users } from '../db/schema/user.schema';
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
        const { id, email, password} = req.body;
        await userRepository.updateUser({ id, email, password});

        res.json({
            message: 'user updated sucessfully.'
        })
    },

    async userLogin( req: Request, res: Response) {
        const { email, password} = req.body;

        const user = await db.select().from(users).where(eq(users.email, email));

        const isMatch = await bcrypt.compare(password, user[0].password!);

        if(!user.length || !isMatch) {
            res.json({message: 'invalid username or password'});
        }

        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h'}
        )
        res.json({ message: 'login sucessful', token });
    }
};