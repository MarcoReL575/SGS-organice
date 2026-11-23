import z from "zod";

export const clientFormSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio").max(150),
    contactName: z.string().trim().max(150).min(1, "El contacto de la empresa es obligatorio"),
    email: z.string().trim().email("Email inválido").max(255),
    phone: z.string().trim().max(30).min(5, "El numero del contacto es obligatorio"),
});