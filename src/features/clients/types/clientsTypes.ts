import { clients, clientSites } from "@/src/db";
import { siteClientSchema } from "../schemas/clientSchemas";

export type ClientInsert = typeof clients.$inferInsert;
export type ClientSelect = typeof clients.$inferSelect;

export type SiteInsert = typeof clientSites.$inferInsert;
export type SiteSelect = typeof clientSites.$inferSelect;