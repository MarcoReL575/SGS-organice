import z from "zod";

export const clientFormSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio").max(150),
    contactName: z.string().trim().max(150).min(1, "El contacto de la empresa es obligatorio"),
    email: z.string().trim().email("Email inválido").max(255),
    phone: z.string().trim().max(30).min(5, "El numero del contacto es obligatorio"),
});


export const siteClientSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio").max(150),
    affiliationNumber: z.string().min(1, 'El número de afiliacíon es obligatorio'),
    street: z.string().trim().min(1, "El nombre es obligatorio").max(150),
    exteriorNumber: z.string().min(1, 'El número de la calle es obligatorio'),
    state: z.string().trim().min(1, "El estado es obligatorio").max(150),
    city: z.string().trim().min(1, "La ciudad es obligatoria").max(150),
    postalCode: z.string().min(1, 'El código postal es obligatorio'),
    clientId: z.string().trim().min(1, "El id del cliente es obligatorio").max(150),
});