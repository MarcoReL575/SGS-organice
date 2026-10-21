'use client'

import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { LoginAction } from '../actions/LoginAction';
import { FormComponent, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form';
import { LoginSchema } from '../../schema/schema';
import { LoginType } from '../../types/types';

export default function FormLogin() {

    const router = useRouter();
    const { register, formState: { errors }, handleSubmit, setValues } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
        mode: 'onBlur'
    });

    const handleLogin = async(data: LoginType)=> {
        const { success, message } = await LoginAction(data);

        if(success) {
            toast.success(message);
            router.push('/home');
        }

        if(!success) {
            toast.error(message);
            setValues({
                password: ''
            })
        }
    }

  return (
    <FormComponent
        className='border p-10 rounded-lg flex flex-col'
        onSubmit={handleSubmit(handleLogin)}
    >
        <FormLabel id='email'>Ingresa tu email</FormLabel>
        <FormInput {...register('email')}  type='email'placeholder='m@example.com'/>
        { errors.email && <FormError>{errors.email.message}</FormError> }

        <FormLabel id='password'>Ingresa tu password</FormLabel>
        <FormInput {...register('password')} type='password' />
        { errors.password && <FormError>{errors.password.message}</FormError> }

        <FormSubmit>
            Iniciar sesión 
        </FormSubmit>
    </FormComponent>
  )
}
