'use server'
import { v4 as uuidv4 } from'uuid'

import { requireAuth, requireRole } from "@/src/lib/session"
import { authService } from "../../auth/service/authService";
import { createInvitatioAction } from './createInvitatioAction';
import { emailService } from '../services/emailService';

export async function resendInvitationAction (email:string) {
    const { user } = await requireAuth();
    if(user.role !== 'admin') return { success: false, message: 'El usuario no cuenta con los permisos necesarios' }

    const { user: currentUser } = await authService.userExists(email);
    const { success, message, invitation: currentInvitation } = await authService.getInvitationsByUser(email);

    // Si ya existe una invitación pendiente, no se puede enviar una nueva
    if(currentInvitation?.status === 'pending') {
        return { success: false, message: 'El usuario ya tiene una invitación pendiente, no se pude reenviar una nueva' }
    }

    // Si la petición expiró, o se se usó pero el usuario no pudo crear su usuario
    // o si hubo un error y no se creo una invitación cuando se creo al usuario enviamos una invitación
    const invitationData = {
        email: currentUser.email,
        role: currentUser.role,
        token: uuidv4(),
        expiresAt:  new Date(Date.now() + 60 * 60 * 1000),
        name: currentUser.name
    }
    const { success: successNewInvitation, message: messageNewInvitation, invitation: newInvitation } = await emailService.createInvitation(user.id, invitationData, currentUser.id);
    if(!successNewInvitation || !newInvitation) {
        return { success: false, message: messageNewInvitation }
    }

    // Enviar correo al usuario 
    const { success: successSendEmail, message: messageSendEmail, status } = await emailService.sendEmailInvitation(newInvitation);
    console.log(status)
    if(!successSendEmail) {
        return { success: false, message: messageSendEmail }
    }
    return { success: true, message: 'Usuario creado, invitación enviada' }
}