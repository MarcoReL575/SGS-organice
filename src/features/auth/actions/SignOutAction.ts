'use server'

import { requireAuth } from "../lib/session"
import { authService } from "../service/authService";

export async function SignOutAction() {
    const session = await requireAuth();
    if (!session.user.id) {
        return { success: false, message: 'Error al cerrar la sesión' }
    }

    try {
        await authService.logout(); 
        return { success: true, message:'' }
    } catch (error) {
        return { success: false, message: 'Error al cerrar sesión' }
    }
}