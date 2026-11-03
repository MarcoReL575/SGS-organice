'use server'

import { requireAuth } from "@/src/lib/session"
import { authService } from "../../auth/service/authService";
import { emailService } from "../services/emailService";
import { Invitation } from "../types/types";

export async function createInvitatioAction(invitation: Invitation) {
    const { user } = await requireAuth();

    if(user.role !== "admin") {
        return { success: false, message: 'El usuario no tiene los permisos requeridos' }
    }

    const infoUser = {
        name: invitation.name,
        email: invitation.email
    }

    // Verificamos si ya existe un usuario con este correo
    const { success: succeessExistUser, message: messageExistUser, user: existUser } = await authService.userExists(invitation.email);
    if(succeessExistUser && existUser.email) {
        return { success: false, message: messageExistUser }
    }

    const { user: newUser, success: successCreateUser, message: messageCreateUser } = await authService.createUser(infoUser);
    if(!successCreateUser || !newUser) {
        return { success: false, message: messageCreateUser }
    }

    // Verificamos si ya existe una invitación pendiente para este usuario
    const { success: succeessInvitation, message: messageInvitation } = await emailService.existInvitation(invitation.email);
    if(!succeessInvitation) {
        return { success: false, message: messageInvitation }
    }

    const { success: successNewInvitation, message: messageNewInvitation, invitation: newInvitation } = await emailService.createInvitation(user.id, invitation);
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