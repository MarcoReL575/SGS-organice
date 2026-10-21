import { db } from "@/src";
import { user } from "@/src/db/schema/auth-schema";
import { LoginType } from "better-auth";
import { and, eq } from "drizzle-orm";
import { UserSelect } from "../../types/types";


export interface IAuthRepository {
    selectAdmin(): Promise<UserSelect[]>;
    selectUser(email: string): Promise<UserSelect>;
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
}

export const authRepository = new AuthRepository();