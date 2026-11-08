import * as z from "zod"

export const LoginSchema = z.object({
    email: z.email({ message: 'Debes de ingresar un correo válido' }).min(2, { message: 'El correo no puede ir vacío' }),
    password: z.string().min(5, { message: 'La contraseña debe de tener al menos 6 caracteres' })
})

export const createInvitationSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
    role: z.enum(["supervisor", "ingeniero"]),
    expiresInHours: z.number().min(1).max(168).optional().default(48),
});

export const createUserSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
    role: z.enum(["supervisor", "ingeniero", "admin"]),
    name: z.string().min(2, { message: 'El usuario no puede ir vacío' })
});

export const createPasswordUserSchema = z.object({
    email: z.email({ message: 'Debes de ingresar un correo válido' }).min(2, { message: 'El correo no puede ir vacío' }),
    password: z.string().min(5, { message: 'La contraseña debe de tener al menos 6 caracteres' }),
    confirmPassword: z.string()
}).refine((data)=> data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ["confirmPassword"],
})