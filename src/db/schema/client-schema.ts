import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// Estado de un cliente
export const clientStatusEnum = pgEnum("client_status", [
    "active",
    "inactive",
]);

export const clients = pgTable("clients", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    // Datos de contacto generales
    contactName: varchar("contact_name", { length: 150 }),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 30 }),
    status: clientStatusEnum("status").notNull().default("active"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updateddAt: timestamp("updated_at").notNull().defaultNow(),
});