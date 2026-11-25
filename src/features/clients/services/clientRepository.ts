import { db } from "@/src";
import { ClientInsert, ClientSelect, SiteInsert } from "../types/clientsTypes";
import { clients, clientSites } from "@/src/db";
import { asc, desc, eq } from "drizzle-orm";

export type IClientRepository = {
    insertNewClient(infoClient: ClientInsert): Promise<void>;
    selectClient(clientName: string): Promise<ClientSelect | null>;
    selectClientById(clientId: string): Promise<ClientSelect | null>;
    selectAllClients(): Promise<ClientSelect[]>;
    setDeleteClient(clientId: string): Promise<void>;
    setRecoverClient(clientId: string): Promise<void>;
    updateClient(infoClient:ClientInsert, clientId: string): Promise<void>;
    insertSite(siteInfo: SiteInsert): Promise<void>;
}

class ClientRepository implements IClientRepository {

    async selectClient(clientName: string): Promise<ClientSelect | null> {
        const [client] = await db
            .select()
            .from(clients)
            .where(eq(clients.name, clientName))
        return client
    }

    async selectClientById(clientId: string): Promise<ClientSelect | null> {
        const [client] = await db
            .select()
            .from(clients)
            .where(eq(clients.id, clientId))
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

    async setDeleteClient(clientId: string): Promise<void> {
        await db
            .update(clients)
            .set({
                status: 'inactive'
            })
            .where(eq(clients.id, clientId))
    }

    async setRecoverClient(clientId: string): Promise<void> {
        await db
            .update(clients)
            .set({
                status: 'active'
            })
            .where(eq(clients.id, clientId))
    }

    async updateClient(infoClient: ClientInsert, clientId: string): Promise<void> {
        const { name, contactName, email, phone } = infoClient;
        await db
            .update(clients)
            .set({
                name,
                contactName, 
                email,
                phone,
                updatedAt: new Date()   
            })
            .where(eq(clients.id, clientId))
    }

    async insertSite(siteInfo: SiteInsert): Promise<void> {
        const { name, clientId, city, state, street, affiliationNumber, postalCode, exteriorNumber } = siteInfo;
        await db
            .insert(clientSites)
            .values({
                name, 
                clientId, 
                city, 
                state, 
                street, 
                affiliationNumber, 
                postalCode, 
                exteriorNumber
            })
    }
}

export const clientRepository = new ClientRepository();