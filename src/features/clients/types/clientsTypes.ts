import { clients, clientSites } from "@/src/db";
import { siteClientSchema } from "../schemas/clientSchemas";

export type ClientInsert = typeof clients.$inferInsert;
export type ClientSelect = typeof clients.$inferSelect;

export type SiteInsert = typeof clientSites.$inferInsert;
export type SiteSelect = typeof clientSites.$inferSelect;


export type SiteInfo = {
    id: string;
    name: string;
    createdAt: Date;
    status: "active" | "inactive";
    clientId: string;
    affiliationNumber: string | null;
    street: string;
    exteriorNumber: string | null;
    city: string;
    state: string;
    postalCode: string | null;
    updateddAt: Date;
    client: {
        name: string;
        contactName: string;
        phone: string;
    } | null;
}