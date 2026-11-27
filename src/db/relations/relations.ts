import { clients } from "../schema/client-schema";
import { clientSites } from "../schema/client-sites";
import { services } from "../schema/services_schema";
import { user } from "../schema/auth-schema";
import { defineRelations } from "drizzle-orm";
import * as schema from "../index";

// Un cliente tiene muchas ubicaciones
export const clientsRelations = defineRelations(schema, (r) => ({
    clients: {
        sites: r.many.clientSites(),
        services: r.many.services(),
    },
    clientSites: {
        client: r.one.clients({
            from: r.clientSites.clientId,
            to: r.clients.id,
        }),
    services: r.many.services(),
    },
    services: {
        client: r.one.clients({
            from: r.services.clientId,
            to: r.clients.id,
        }),
        site: r.one.clientSites({
        from: r.services.siteId,
        to:  r.clientSites.id,
        }),
        createdBy: r.one.user({
            from: r.services.createdByUser,
            to: r.user.id,
        }),
    },
}));