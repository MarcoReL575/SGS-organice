'use client'

import { useRouter } from "next/navigation";
import { FormComponent, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { clientFormSchema } from "../schemas/clientSchemas";
import { ClientInsert, ClientSelect } from "../types/clientsTypes";
import { updateInfoClientAction } from "../actions/updateInfoClientAction";

interface Props {
    client: ClientSelect;
}

export default function FormEditClient({ client }: Props) {

    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            name: client.name,
            contactName: client.contactName,
            email: client.email,
            phone: client.phone 
        },
    });

    const handleEditClient = async(clientInfo: ClientInsert) => {
        const { success, message } = await updateInfoClientAction(clientInfo, client.id);
        if(!success) {
            toast.error(message);
        }

        if(success) {
            reset();
            toast.success(message);
            router.push('/dashboard/clientes');
        }
    }

   
  return (
    <FormComponent
        className='flex flex-col space-y-4 border rounded-lg p-8'
        onSubmit={handleSubmit(handleEditClient)}
    >
        <FormLabel>Nombre Empresa</FormLabel>
        <FormInput {...register('name')} type="text" />
        { errors.name && <FormError>{errors.name.message}</FormError> }

        <FormLabel>Contacto</FormLabel>
        <FormInput {...register('contactName')} type="text" />
        { errors.contactName && <FormError>{errors.contactName?.message}</FormError> }
        
        <FormLabel>Email</FormLabel>
        <FormInput {...register('email')} type="email" />
        { errors.email && <FormError>{errors.email.message}</FormError> }

        <FormLabel>Teléfono </FormLabel>
        <FormInput {...register('phone')} type="" />
        { errors.phone && <FormError>{errors.phone.message}</FormError> }

        <FormSubmit>
            Editar cliente
        </FormSubmit>

    </FormComponent>
  )
}
