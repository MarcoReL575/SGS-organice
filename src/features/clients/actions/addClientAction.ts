'use server'

import { requireAuth } from "@/src/lib/session"
import { clientService } from "../services/clientService";
import { ClientInsert } from "../types/clientsTypes";

export async function addClientAction(infoClient: ClientInsert) {
    const { user } = await requireAuth();
    if(user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' }

    return await clientService.addNewClient(infoClient);
}