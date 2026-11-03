import { db } from "@/src";
import { InvitationInsert, InvitationSelect } from "../types/types";
import { invitations } from "@/src/db/schema/invitations-schema";
import { and, eq } from "drizzle-orm";

export interface IEmailRespository {
    selectInvitation(email: string): Promise<InvitationSelect>;
    selectInvitationByToken(token:string): Promise<InvitationSelect>;
    insertInvitation(invitation: InvitationInsert): Promise<InvitationSelect>;
    deleteInvitation(invitationId: string): Promise<void>;
}

class EmailRespository implements IEmailRespository{
    async selectInvitation(email: string): Promise<InvitationSelect> {
        const [invitation] = await db
            .select()
            .from(invitations)
            .where( and(
                eq(invitations.email, email),
                eq(invitations.status, "pending")
            ))
        return invitation;
    }

    async selectInvitationByToken(token: string): Promise<InvitationSelect> {
        const [invitation] = await db
            .select()
            .from(invitations)
            .where(eq(invitations.token, token))
        return invitation
    }

    async insertInvitation(invitation: InvitationInsert): Promise<InvitationSelect> {
        const { email, id, invitedBy, expiresAt, role, token } = invitation
        const [result] = await db 
            .insert(invitations)
            .values({
                email,
                role,
                token,
                invitedBy,
                expiresAt,
                id
            })
            .returning()
        return  result;
    }

    async deleteInvitation(invitationId: string): Promise<void> {
        await db
            .delete(invitations)
            .where(eq(invitations.id, invitationId))
    }
}

export const emailRepository = new EmailRespository();
