import * as z from "zod"

export const LoginSchema = z.object({
    email: z.email({ message: 'Debes de ingresar un correo válido' }).min(2, { message: 'El correo no puede ir vacío' }),
    password: z.string().min(5, { message: 'La contraseña debe de teenr al menos 6 caracteres' })
})