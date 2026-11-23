'use server'

import { requireAuth } from "@/src/lib/session"
import { clientService } from "../services/clientService";
import { ClientInsert } from "../types/clientsTypes";
import { Role } from "../../auth/lib/session";

export async function updateInfoClientAction(clientInfo: ClientInsert, clientId: string) {
    const { user } = await requireAuth();
    if(!user.role) return { success: false, message: 'Usuario no autenticado' } 

    return await clientService.updateInfoClient(user.role as Role, clientInfo, clientId)
}