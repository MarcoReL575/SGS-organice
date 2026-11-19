'use client'

import { FormComponent, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'
import { optionRoles } from '@/src/shared/db/optionRoles'
import { IconCheck } from '@tabler/icons-react'
import { UserSelect } from '../../auth/types/types'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserEditSchema } from '../schema/schemaUser';
import { UserEditInsert } from '../types/typeUser';
import { editUserAction } from '../actions/editUserAction'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Props {
    user: UserSelect;
}

export default function FormEditUser({ user }: Props) {

    const router = useRouter();
    const currentEmail = user.email;

    const { register, formState: { errors }, reset, handleSubmit } = useForm<UserEditInsert>({
        mode: 'onBlur',
        resolver: zodResolver(UserEditSchema),
        defaultValues: {
            email: user.email,
            name: user.name,
            role: user.role
        }
    });

    const handleEditUser = async(userInfo: UserEditInsert) => {
        const { success, message } = await editUserAction(currentEmail, userInfo, user.id);
        if(!success) {
            toast.error(message);
        }

        if(success) {
            toast.success(message);
            reset();
            router.push('/dashboard/usuarios');
            router.refresh();
        }
    }

  return (
    <FormComponent
        className='flex flex-col gap-y-2 border rounded-lg p-8'
        onSubmit={handleSubmit(handleEditUser)}
    >
        <FormLabel>Nombre de Usuario</FormLabel>
        <FormInput {...register('name')} type='text'/>
        {errors.name && <FormError>{errors.name.message}</FormError>}

        <FormLabel>Email</FormLabel>
        <FormInput {...register('email')} type='email' />
        {errors.email && <FormError>{errors.email.message}</FormError>}

        <FormLabel>Rol del usuario</FormLabel>
        <select {...register('role')} className='border p-2 rounded-lg'>
            {
                optionRoles && optionRoles.map((optionRole)=> (
                    <option key={optionRole.value}  value={optionRole.value}>
                        {optionRole.label}
                    </option>
                ))
            }
        </select>
        {errors.role && <FormError>{errors.role.message}</FormError>}

        <FormSubmit className='flex items-center justify-center space-x-2'>
            <IconCheck />
            Editar Usuario
        </FormSubmit>
    </FormComponent>
  )
}
