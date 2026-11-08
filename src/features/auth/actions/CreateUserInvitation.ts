import { authService } from "../service/authService"

export async function createUserInvitationAction(token: string, password: string) {
    const { invitation } = await authService.getInvitationByToken(token);
    
    if(invitation.status === 'used') {
        return { success: false, message: 'El token ya fue utilizado' }
    }

    if(invitation.status === 'expired') {
        return { success: false, message: 'El token ya expiró, contacta a personal de la empresa para que te reenvien una invitación' }
    }

    if(invitation.status === 'cancelled') {
        return { success: false, message: 'El token fue cancelado' }
    }

    if(invitation.status === 'pending') {
        const {  } = await authService.insertInvitationPasswordUser(invitation.email, password);
    }
}