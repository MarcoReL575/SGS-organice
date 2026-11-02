import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const invitations = pgTable("invitations", {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    role: text("role", { enum: ["supervisor", "ingeniero", "admin"] }).notNull(),
    token: text("token").notNull().unique(),
    status: text("status", { enum: ["pending", "used", "expired", "cancelled"] })
        .notNull()
        .default("pending"),
    invitedBy: text("invited_by").notNull().references(() => user.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    expiresAt: timestamp("expires_at").notNull(),
    usedAt: timestamp("used_at"),
    userId: text("user_id").references(() => user.id),
});