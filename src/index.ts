import { drizzle } from 'drizzle-orm/neon-http';
import { clientsRelations } from "./db/relations/relations";

export const db = drizzle(process.env.DATABASE_URL!, { relations: clientsRelations });
