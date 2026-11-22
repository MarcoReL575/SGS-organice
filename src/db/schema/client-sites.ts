import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { clients } from "./client-schema";

// Estado de una ubicación o sucursal
export const clientSiteStatusEnum = pgEnum("client_site_status", [
    "active",
    "inactive",
]);

export const clientSites = pgTable("client_sites", {
    id: uuid("id").defaultRandom().primaryKey(),

    clientId: uuid("client_id").notNull().references(() => clients.id, {onDelete: "restrict"}),

    // Nombre identificador de la sucursal o ubicación
    name: varchar("name", { length: 150 }).notNull(),
    affiliationNumber: varchar("affiliation_number", { length: 20 }),

    // Dirección
    street: varchar("street", { length: 150 }).notNull(),
    exteriorNumber: varchar("number", { length: 20 }),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    postalCode: varchar("postal_code", { length: 10 }),

    status: clientSiteStatusEnum("status").notNull().default("active"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updateddAt: timestamp("updated_at").notNull().defaultNow(),
});