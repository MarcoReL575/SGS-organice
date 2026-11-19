'use server'

import { requireAuth } from "@/src/lib/session"
import { authService } from "../../auth/service/authService";

export async function deleteUserAction(userId: string) {
    const { user } = await requireAuth();
    if(user.role !== 'admin') return { success: false, message: 'El usuario no cuenta con los permisos necesarios' } 

    return await authService.deleteUser(userId);
}