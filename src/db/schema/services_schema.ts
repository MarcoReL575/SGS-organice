import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { clients } from "./client-schema";
import { clientSites } from "./client-sites";
import { user } from "./auth-schema";

export const serviceStatusEnum = pgEnum("service_status", [
    "asignado",
    "aceptado",
    "en_transito",
    "en_sitio",
    "pendiente",
    "en_revision",
    "correccion",
    "finalizado",
    "cancelado",
]);

export const services = pgTable("services", {
    id: uuid("id").defaultRandom().primaryKey(),

    // Folio único del servicio (AR)
    folio: varchar("folio", { length: 30 }).notNull(),

    // Relaciones con cliente y ubicación
    clientId: uuid("client_id").notNull().references(() => clients.id, { onDelete: "restrict" }),
    siteId: uuid("site_id").notNull().references(() => clientSites.id, { onDelete: "restrict" }),

    // Tipo de servicio: instalación, mantenimiento, etc.
    serviceType: varchar("service_type", { length: 100 }).notNull(),

    // Programación
    scheduledAt: timestamp("scheduled_at", { withTimezone: true, mode: "date" }).notNull(),

    // Información adicional
    description: text("description"),

    status: serviceStatusEnum("status").notNull().default("asignado"),

    // Usuario que registró el servicio
    createdByUser: text("created_by_user").notNull().references(() => user.id, { onDelete: "restrict" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),

    // Fecha de cancelación, cuando corresponda
    cancelledAt: timestamp("cancelled_at"),
    cancelledByUser: text("cancelled_by_user").references(() => user.id, { onDelete: "restrict"}),
    cancellationReason: text("cancellation_reason"),
});