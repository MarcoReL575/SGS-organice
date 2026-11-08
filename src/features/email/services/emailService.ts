import { emailRepository, IEmailRespository } from "./emailRepository";
import { Invitation, InvitationSelect } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { sendInvitationEmail } from "@/src/lib/email";
import { boolean } from "zod";

class EmailService {
    constructor(
        private  emailRespository: IEmailRespository,
    ) {}

    async getInvitation(token: string) {
        try {
            const seletcInvitation = await this.emailRespository.selectInvitationByToken(token);
            if(!seletcInvitation) {
                return { success: false, message: 'Invitación no encontrada', invitation: {} as InvitationSelect }
            }
            // Verificamos el estado de la invitación
            if(seletcInvitation.status === 'used') {
                return { success: false, message: 'La invitación ya fue utilizada', invitation: {} as InvitationSelect }
            }

            if(seletcInvitation.status === 'cancelled') {
                return { success: false, message: 'Esta invitación fue cancelada', invitation: {} as InvitationSelect }
            }

            if(seletcInvitation.status === 'expired') {
               return { success: false, message: 'La invitación ya expiró', invitation: {} as InvitationSelect }
            }

            return {
                success: true, message: '', invitation: seletcInvitation
            }
        } catch (error) {
            return { success: false, message: 'Invitación no encontrada', invitation: {} as InvitationSelect }
        }
    }

    async existInvitation(email: string) {
        try {
            const existsInvitation = await this.emailRespository.selectInvitation(email);
            if(existsInvitation) {
                return { success: false, message: 'Ya existe una invitación pendiente para este correo' }
            }
            return { success: true, message: 'Invitación enviada' }
        } catch (error) {
            console.error({error});
            return { success: false, message: 'Error al generar la invitación' }
        }
    };

    async createInvitation(adminId: string, invitation: Invitation, newUserId: string) {
        const InvitationInsert = {
            id: uuidv4(),
            email: invitation.email,
            role: invitation.role,
            token: invitation.token,
            invitedBy: adminId,
            expiresAt: invitation.expiresAt,
            userId: newUserId
        }

        try {
            const newInvitation = await this.emailRespository.insertInvitation(InvitationInsert);
            if(!newInvitation.id) {
                return { success: false, message: 'No se pudo crear la invitación', invitation: {} as InvitationSelect }
            }
            return { success: true, message: 'Se ha creado la invitación ', invitation:  newInvitation}
        } catch (error) {
            return { success: false, message: 'No se pudo crear la invitación', invitation: {} as InvitationSelect }
        }
    };

    async sendEmailInvitation(invitation: InvitationSelect) {
        try {
            await sendInvitationEmail({
                to: invitation.email,
                token: invitation.token,
                role: invitation.role,
                expiresAt: invitation.expiresAt
            });
            
            return { success: true, message: 'Invitación enviada', status: true }
        } catch (error) {
            console.error({error});
            // Si falla el correo, eliminar la invitación
            await this.emailRespository.deleteInvitation(invitation.id);
            return { success: false, message: 'Error al enviar la invitación', status: false }
        }
    } 
}

export const emailService = new EmailService(emailRepository);