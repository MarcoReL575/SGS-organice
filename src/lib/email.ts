import { Resend } from "resend";
import EmailTemplate from "../shared/components/email/EmailTemplate";

interface SendInvitationEmailParams {
    to: string;
    token: string;
    role: string;
    expiresAt: Date;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvitationEmail({ to, token, role, expiresAt }: SendInvitationEmailParams) {
    const url = process.env.NEXT_PUBLIC_APP_URL ?? 'localhost:3000'
    const invitationLink = `${url}/auth/accept-invitation?token=${token}`;
    const recipientEmail = process.env.NODE_ENV === 'development' ? process.env.EMAIL_TO! : to;


    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: recipientEmail,
            subject: "Invitación al Sistema de Gestión de Servicios",
            react: EmailTemplate({ 
                role, 
                url: invitationLink,
                expiresAt 
            })
        });

        if (error) {
            console.error("Error sending email:", error);
           return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error inesperado al enviar correo:", error);
        return { success: false, error };
    }
}