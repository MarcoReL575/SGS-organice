'use client'

import { FormComponent, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'
import { createInvitatioAction } from '../../email/actions/createInvitatioAction';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUser } from '../types/types';
import { createUserSchema } from '../schema/schema';
import { v4 as uuidv4 } from'uuid'
import { Role } from '../lib/session';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
    optionRoles: {
        label: string;
        value: string;
    }[]
}

export default function FormCreateUser({ optionRoles }: Props) {
    const router = useRouter();

    const { formState: { errors }, register, handleSubmit, setValues } = useForm({
        resolver: zodResolver(createUserSchema),
        mode: 'onBlur'
    });

    const handleCreateUser = async(data: CreateUser)=> {
        const invitationData = {
            email: data.email,
            role: data.role as Role,
            name: data.name,
            token: uuidv4(),
            expiresAt:  new Date(Date.now() + 60 * 60 * 1000),
        }
        const { success, message } = await createInvitatioAction(invitationData);
        if(!success) {
            toast.error(message);
        }

        if(success) {
            toast.success(message);
            router.push('/dashboard/usuarios');
        }
    }

  return (
    <FormComponent className='flex flex-col border rounded-lg p-4' onSubmit={handleSubmit(handleCreateUser)}>
        <FormLabel>Nombre de Usuario</FormLabel>
        <FormInput {...register('name')} type='text' placeholder='Juan Perez Fernández' />
        {errors.name && <FormError>{errors.name.message}</FormError>}

        <FormLabel>Email</FormLabel>
        <FormInput {...register('email')} type='email' placeholder='Juan123@sgsorganice.com' />
        {errors.email && <FormError>{errors.email.message}</FormError>}

        <FormLabel>Rol del usuario</FormLabel>
        <select {...register('role')} name="role" id="role"
            className='border p-2 rounded-lg'
        >
            <option value="">--Asigna un rol--</option>
            {
                optionRoles && optionRoles.map((option)=> (
                    <option key={option.value} value={option.value} >
                        {option.label}
                    </option>
                ))
            }
        </select>
        {errors.role && <FormError>{errors.role.message}</FormError>}

        <FormSubmit>
            Crear Nuevo Usuario
        </FormSubmit>
    </FormComponent>
  )
}
