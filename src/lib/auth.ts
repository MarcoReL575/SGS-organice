import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "..";
import { nextCookies } from "better-auth/next-js";
import * as authSchema from "../db/schema/auth-schema"
import { invitations } from "../db/schema/invitations-schema";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            user: authSchema.user,
            session: authSchema.session,
            account: authSchema.account,
            verification: authSchema.verification,
            invitations: invitations
        }
    }),
    emailAndPassword: {
        enabled: true
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 días
        updateAge: 60 * 60 * 24, // Actualizar cada 24 horas
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "ingeniero",
                required: true,
            },
            isActive: {
                type: "boolean",
                defaultValue: true,
                required: true,
            },
        }
    },
    plugins: [nextCookies()]
});