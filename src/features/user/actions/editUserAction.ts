'use server'

import { requireAuth } from "@/src/lib/session"
import { UserEditInsert } from "../types/typeUser";
import { authService } from "../../auth/service/authService";

export async function editUserAction(currentEmail: string, userInfo: UserEditInsert, userId: string) {
    const session = await requireAuth();
    if(session.user.role !== 'admin') return { success: false, message: 'El usuario no cuenta con los permisos necesarios' }

    return await authService.updateInfoUser(currentEmail, userInfo, userId);
}