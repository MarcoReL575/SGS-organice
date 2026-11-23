'use server'

import { requireAuth } from "@/src/lib/session"
import { clientService } from "../services/clientService";

export async function deleteClientAction(clientId: string, clientName: string) {
    const { user } = await requireAuth();
    if(user.role !== 'admin') return { success: false, message: 'El usuario no cuenta con los permisos necesarios' }

    return await clientService.deleteClient(clientId, clientName);
}