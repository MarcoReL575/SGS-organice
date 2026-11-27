'use server'

import { requireAuth, Role } from "../../auth/lib/session"
import { clientService } from "../services/clientService";
import { SiteInsert } from "../types/clientsTypes";

export async function updateSiteAction(siteInfo: SiteInsert, siteId: string) {
    const { user } = await requireAuth();
    if(!user.id) return { success: false, message: 'Usuario no identificado' }

    return await clientService.updateSite(siteInfo, siteId, user.role as Role)
}