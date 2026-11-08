import { db } from "@/src";
import { account, user } from "@/src/db/schema/auth-schema";
import { and, eq } from "drizzle-orm";
import { UserInsert, UserSelect } from "../types/types";
import { invitations } from "@/src/db/schema/invitations-schema";
import { InvitationSelect } from "../../email/types/types";
import { hashPassword } from 'better-auth/crypto'


export interface IAuthRepository {
    selectAdmin(): Promise<UserSelect[]>;
    selectAllUsers(): Promise<UserSelect[]>;
    selectUser(email: string): Promise<UserSelect>;
    createUser(user: UserInsert): Promise<UserSelect>;
    selectInvitationByToken(token: string): Promise<InvitationSelect>;
    registerPasswordInvitationUser(email: string, password: string, userId: string): Promise<void>;
    setStatuVerifiedEmail(userId: string): Promise<void>;
    setToInvitationUsed(userId: string): Promise<InvitationSelect>;
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

    async selectInvitationByToken(token: string): Promise<InvitationSelect> {
        const [invitation] = await db
            .select()
            .from(invitations)
            .where(eq(invitations.token, token))
        return invitation
    }

    async registerPasswordInvitationUser(email: string, password: string, userId: string): Promise<void> {
        const hashPasswd = await hashPassword(password);
        await db
            .insert(account)
            .values({
                id: crypto.randomUUID(),
                userId: userId,
                accountId: userId,
                providerId: 'credential',
                password: hashPasswd,
            })
    }

    async setStatuVerifiedEmail(userId: string): Promise<void> {
        await db
            .update(user)
            .set({
                emailVerified: true
            })
            .where(eq(user.id, userId))
    }

    async setToInvitationUsed(userId: string): Promise<InvitationSelect> {
        const [invitation] = await db
            .update(invitations)
            .set({
                status: 'used'
            })
            .where(eq(invitations.userId, userId))
            .returning()
        return invitation;
    }
}

export const authRepository = new AuthRepository();