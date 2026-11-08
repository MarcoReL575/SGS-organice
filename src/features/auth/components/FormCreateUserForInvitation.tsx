'use client'

import { FormComponent, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createPasswordUserSchema, LoginSchema } from '../schema/schema';
import { CreatePasswordUserType, LoginType } from '../types/types';
import { InvitationSelect } from '../../email/types/types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPasswordUserInvitationAction } from '../actions/createPasswordUserInvitation';

interface Props {
    token: string;
    invitation: InvitationSelect;
}

export default function FormCreateUserForInvitation({ token, invitation }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { register, formState: { errors }, setValues, handleSubmit } = useForm({
        resolver: zodResolver(createPasswordUserSchema),
        mode: 'onBlur',
    });

    const handleCreatePassword = async(data: CreatePasswordUserType)=> {
        setLoading(true);
        
        const { success, message } = await createPasswordUserInvitationAction(data.email, data.password);

        if(!success) {
            setLoading(false);
            toast.error(message);
            setValues({password:''})
        }

        if(success) {
            setLoading(false);
            toast.success(message);
            router.push('/dashboard/home');
        }
    }

  return (
    <FormComponent 
        className='flex flex-col rounded-lg border p-8'
        onSubmit={handleSubmit(handleCreatePassword)}
    >
        <FormLabel>Correo</FormLabel>
        <FormInput {...register('email')} type='email' value={invitation.email} />
        {errors.email && <FormError>{errors.email.message}</FormError>}

        <FormLabel>Crea una contraseña</FormLabel>
        <FormInput {...register('password')} type='password' placeholder='sgs0rg4n1c3$' />
        {errors.password && <FormError>{errors.password.message}</FormError>}

        <FormLabel>Confirma tu contraseña</FormLabel>
        <FormInput {...register('confirmPassword')} type='password' placeholder='sgs0rg4n1c3$' />
        {errors.confirmPassword && <FormError>{errors.confirmPassword.message}</FormError>}

        <FormSubmit>
            {   loading ? 'Creando password...' : 'Crear mi password'}
            
        </FormSubmit>
    </FormComponent>
  )
}
