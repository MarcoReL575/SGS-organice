'use server'

import { requireAuth } from "@/src/lib/session"
import { clientService } from "../services/clientService";
import { Role } from "../../auth/lib/session";
import { SiteInsert } from "../types/clientsTypes";

export async function addSiteAction(siteInfo: SiteInsert) {
    const { user } = await requireAuth();
    if(!user.id) return { success: false, message: 'Usuario no identificado' }

    return await clientService.addSite(siteInfo, user.role as Role);
}