import { db } from "@/src";
import { ClientInsert, ClientSelect } from "../types/clientsTypes";
import { clients } from "@/src/db";
import { asc, desc, eq } from "drizzle-orm";

export type IClientRepository = {
    insertNewClient(infoClient: ClientInsert): Promise<void>;
    selectClient(clientName: string): Promise<ClientSelect | null>;
    selectAllClients(): Promise<ClientSelect[]>;
}

class ClientRepository implements IClientRepository {

    async selectClient(clientName: string): Promise<ClientSelect | null> {
        const [client] = await db
            .select()
            .from(clients)
            .where(eq(clients.name, clientName))
        return client
    }

    async insertNewClient(infoClient: ClientInsert): Promise<void> {
        const { name, contactName, email, phone } = infoClient;
        await db
            .insert(clients)
            .values({
                name,
                contactName,
                email, 
                phone
            })
    }

    async selectAllClients(): Promise<ClientSelect[]> {
        return await db
            .select()
            .from(clients)
            .orderBy(desc(clients.createdAt))
    }
}

export const clientRepository = new ClientRepository();