import { clients } from "@/src/db";

export type ClientInsert = typeof clients.$inferInsert;
export type ClientSelect = typeof clients.$inferSelect;