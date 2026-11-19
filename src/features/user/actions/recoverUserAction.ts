'use server'

import { requireAuth } from "@/src/lib/session"
import { authService } from "../../auth/service/authService";

export async function recoverUserAction(userId: string, email: string) {
    const { user } = await requireAuth();
    if(user.role !== 'admin') return { success: false, message: 'El usuario no cuenta con los persmios necesarios' }

    return await authService.recoverUser(userId, email);
}