import { db } from "@/src";
import { user } from "@/src/db/schema/auth-schema";
import { LoginType } from "better-auth";
import { and, eq } from "drizzle-orm";
import { UserInsert, UserSelect } from "../types/types";
import { Users } from "lucide-react";


export interface IAuthRepository {
    selectAdmin(): Promise<UserSelect[]>;
    selectAllUsers(): Promise<UserSelect[]>;
    selectUser(email: string): Promise<UserSelect>;
    createUser(user: UserInsert): Promise<UserSelect>;
}
  

class AuthRepository implements IAuthRepository {
    async selectAdmin(): Promise<UserSelect[]> {
        const admins = await db
            .select()
            .from(user)
        return admins as UserSelect[];
    }

    async selectUser(email: string): Promise<UserSelect> {
        const [result] = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
        return result;   
    };

    async createUser(userInfo: UserInsert): Promise<UserSelect> {
        const [result] = await db
            .insert(user)
            .values({
                name: userInfo.name,
                email: userInfo.email,
            })
            .returning()
        return result;
    }

    async selectAllUsers(): Promise<UserSelect[]> {
        const users = await db
            .select()
            .from(user)
        return users
    }
}

export const authRepository = new AuthRepository();