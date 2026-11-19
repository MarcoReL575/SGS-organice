import z from "zod";

export const UserEditSchema = z.object({
    name: z.string({ message: 'El nombre no puede ir vacío' }).min(2),
    email: z.string().email("Correo electrónico inválido"),
    role: z.enum(["supervisor", "ingeniero", "admin"]),
})
