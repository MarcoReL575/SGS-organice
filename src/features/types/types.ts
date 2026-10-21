import z from "zod";
import { LoginSchema } from "../schema/schema";
import { user } from "@/src/db/schema/auth-schema";

export type LoginType = z.infer<typeof LoginSchema>;

export type UserInsert = typeof user.$inferInsert;
export type UserSelect = typeof user.$inferSelect;