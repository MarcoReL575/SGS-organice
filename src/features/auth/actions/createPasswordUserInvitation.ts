'use server'

import { requireAuth } from "../lib/session"
import { authService } from "../service/authService";


export async function createPasswordUserInvitationAction(email: string, password: string) {
    return await authService.insertInvitationPasswordUser(email, password);
}