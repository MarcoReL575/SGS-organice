import { authService } from '@/src/features/auth/service/authService';
import FormEditUser from '@/src/features/user/components/FormEditUser';
import ButtonBack from '@/src/shared/components/ButtonBack';
import React, { Suspense } from 'react'

interface Props {
  searchParams: Promise<{ usuario?: string }>;
}

async function UsuarioPageContent({ searchParams }: Props) {
    const { usuario: userId } = await searchParams;
    if(!userId) return (
        <div className='flex items-center justify-center w-full text-2xl font-semibold'>
            Usuario no encontrado
        </div>
    )
    
    const { user } = await authService.getUserById(userId);
    return (
        <FormEditUser user={user} key={userId} />
    )
}

export default function EditarUsuarioPage({ searchParams }: Props) {
  return (
    <Suspense fallback={ <div>Cargando usuario...</div> }>
        <section className=' space-y-8'>
            <div>
                <ButtonBack url='/dashboard/usuarios' />
            </div>
            <h1 className='text-3xl font-semibold text-center'>Sección para editar la información del usuario</h1>
            <UsuarioPageContent searchParams={searchParams} />
        </section>
    </Suspense>
  )
}
