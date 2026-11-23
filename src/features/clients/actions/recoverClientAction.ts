'use server'

import { requireAuth } from "@/src/lib/session"
import { clientService } from "../services/clientService";

export async function recoverClientAction(clientId: string, clientName: string) {
    const { user } = await requireAuth();
    if(user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' }

    return await clientService.recoverClient(clientId, clientName);
}