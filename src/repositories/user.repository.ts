import { db } from '../db/db';
import { user } from '../db/schema/user.schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';


export const userRepository = {
    
    async createUser(users: {email: string; password: string, }) {
        const hashedPassword = await bcrypt.hash(users.password, 10);
        await db.insert(user).values({
            email: users.email,
            password: hashedPassword,
        });
    },

    async getAll() {
        return await db.select().from(user);
    },

    async delete(id: number) {
         await db.delete(user).where(eq(user.id, id));
    },

    async updateUser(users: { id: number; email: string; password: string }) {
        await db.update(user).set({
            email: users.email,
            password: users.password
        }).where(eq(user.id, users.id)) ;
    },
}
