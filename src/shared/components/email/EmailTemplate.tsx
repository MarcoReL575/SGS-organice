import React from 'react'

interface Props {
    url: string;
    role: string;
    expiresAt: Date;
}

export default function EmailTemplate({ role, url, expiresAt }: Props) {

    const roleLabels: Record<string, string> = {
        supervisor: "Supervisor",
        ingeniero: "Ingeniero de Campo",
    };

    const year = new Date().getFullYear();

  return (
    <div className="container">
        <div className="header">
        <h1>Sistema de Gestión de Servicios</h1>
        </div>
        <div className="content">
        <h2>Has sido invitado al sistema</h2>
        
        <p>Hola,</p>
        
        <p>Has sido invitado a formar parte del <strong>Sistema de Gestión de Servicios de Telecomunicaciones</strong> con el rol de:</p>
        
        <div className="info-box">
            <strong>{roleLabels[role]}</strong>
        </div>
        
        <p>Para completar tu registro, haz clic en el siguiente botón:</p>
        
        <div className="text-center">
            <a href="${url}" className="button">Completar Registro</a>
        </div>
        
        <p>O copia y pega este enlace en tu navegador:</p>
        <p className="">
            {url}
        </p>
        
        <div className="info-box">
            <p className="margin: 0;"><strong>⏰ Expira:</strong> {expiresAt.toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })}</p>
            <p className="margin: 10px 0 0 0;"><strong>🔒 Este enlace es de un solo uso.</strong></p>
        </div>
        
        <p>Si no esperabas esta invitación, puedes ignorar este correo.</p>
        </div>
        <div className="footer">
        <p>Este es un correo automático, por favor no responder.</p>
        <p>© {year} Sistema de Gestión de Servicios</p>
        </div>
    </div>
  )
}
