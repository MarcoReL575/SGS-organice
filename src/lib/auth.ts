import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "..";
import { nextCookies } from "better-auth/next-js";
import * as relations from "../db/relations/relations";
import * as tables from "../db/index";

const schema = {
  ...tables,
  ...relations
};

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema
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