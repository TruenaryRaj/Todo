import { db } from '../db/db';
import { users } from '../db/schema/user.schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';


export const userRepository = {
    
    async createUser(user: {email: string; password: string, }) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.insert(users).values({
            email: user.email,
            password: hashedPassword,
        });
    },

    async getAll() {
        return await db.select().from(users);
    },

    async delete(id: number) {
         await db.delete(users).where(eq(users.id, id));
    },

    async updateUser(user: { id: number; email: string; password: string }) {
        await db.update(users).set({
            email: user.email,
            password: user.password
        }).where(eq(users.id, user.id)) ;
    },
}
