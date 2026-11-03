import { invitations } from "@/src/db/schema/invitations-schema";

export type InvitationSelect = typeof invitations.$inferSelect;
export type InvitationInsert = typeof invitations.$inferInsert;

export type Invitation = {
    email: string;
    role: "supervisor" | "ingeniero" | "admin";
    token: string;
    expiresAt: Date;
    name: string
}