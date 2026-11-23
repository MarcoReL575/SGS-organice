'use client'

import { FormComponent, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconCheck } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { clientFormSchema } from '../schemas/clientSchemas'
import { ClientInsert } from '../types/clientsTypes'
import { addClientAction } from '../actions/addClientAction'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function FormAddClient() {

    const router = useRouter();
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(clientFormSchema)
    });

    const handleAddClient = async(data: ClientInsert)=> {
        const { success, message } = await addClientAction(data);

        if(!success) {
            toast.error(message);
            reset();
        }

        if(success) {
            toast.success(message);
            reset();
            router.push('/dashboard/clientes');
        }

    }

  return (
    <FormComponent
        className='flex flex-col space-y-4 border rounded-lg p-8'
        onSubmit={handleSubmit(handleAddClient)}
    >
        <FormLabel>Nombre Empresa</FormLabel>
        <FormInput {...register('name')} type='text' placeholder='TechnoLabel'/>
        {errors.name && <FormError>{errors.name.message}</FormError>}

        <FormLabel>Nombre Contacto</FormLabel>
        <FormInput {...register('contactName')} type='text' placeholder='Juan Manuel Perez'/>
        {errors.contactName && <FormError>{errors.contactName.message}</FormError>}

        <FormLabel>Email</FormLabel>
        <FormInput {...register('email')} type='email' placeholder='contact@correo.com'/>
        {errors.email && <FormError>{errors.email.message}</FormError>}

        <FormLabel>Teléfono de contacto</FormLabel>
        <FormInput {...register('phone')} type='number' placeholder='4774856935'/>
        {errors.phone && <FormError>{errors.phone.message}</FormError>}

        <FormSubmit>
            <IconCheck />
            Agregar Cliente
        </FormSubmit>
    </FormComponent>
  )
}
