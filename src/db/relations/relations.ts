import { relations } from "drizzle-orm/_relations";
import { clients } from "../schema/client-schema";
import { clientSites } from "../schema/client-sites";
import { services } from "../schema/services_schema";
import { user } from "../schema/auth-schema";

// Un cliente tiene muchas ubicaciones
export const clientsRelations = relations(clients, ({ many }) => ({
    sites: many(clientSites),
    services: many(services),
}));

// Una ubicación pertenece a un cliente
export const clientSitesRelations = relations(clientSites, ({ one, many }) => ({
    client: one(clients, {
        fields: [clientSites.clientId],
        references: [clients.id],
    }),
    services: many(services),
}));

// Un servicio pertenece a un cliente y a una ubicación
export const servicesRelations = relations(services, ({ one }) => ({
    client: one(clients, {
        fields: [services.clientId],
        references: [clients.id],
    }),

    site: one(clientSites, {
        fields: [services.siteId],
        references: [clientSites.id],
    }),

    createdBy: one(user, {
        fields: [services.createdByUser],
        references: [user.id],
        relationName: "createdServices",
    }),
}));