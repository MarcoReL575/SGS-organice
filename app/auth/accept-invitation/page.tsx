import FormCreateUserForInvitation from '@/src/features/auth/components/FormCreateUserForInvitation';
import { authService } from '@/src/features/auth/service/authService';
import React, { Suspense } from 'react'

interface Props {
  searchParams: Promise<{ token?: string }>;
}

async function InvitationContent({ searchParams }: Props) {
  const params = await searchParams;
  const token = params?.token;
  
  if(!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md rounded-lg bg-white p-6 shadow-md text-center">
          <h1 className="text-xl font-bold text-red-600">Enlace inválido</h1>
          <p className="mt-2 text-gray-600">No se ha proporcionado un token de invitación válido.</p>
        </div>
      </div>
    )
  }

  const { invitation } = await authService.getInvitationByToken(token);

  if(invitation.status === 'used') {
    return (
      <div className='flex flex-col h-dvh items-center justify-center'>
        <h1 className='text-3xl font-semibold'>Lo sentimos, tuvimos un problema al procesar la solicitud</h1>
        <p className='text-xl text-gray-500'>...Esta solicitud ya fue utilizada.</p>
      </div>
    )
  }

  if(invitation.status === 'cancelled') {
    return (
      <div className='container mx-auto py-10 space-y-5 text-center'>
        <h1 className='text-3xl font-semibold'>Lo sentimos, tuvimos un problema al procesar la solicitud</h1>
        <p className='text-xl text-gray-500'>...Esta solicitud fue cancelada.</p>
      </div>
    )
  }

  if(invitation.status === 'expired') {
    return (
      <div className='container mx-auto py-10 space-y-5 text-center'>
        <h1 className='text-3xl font-semibold'>Lo sentimos, tuvimos un problema al procesar la solicitud</h1>
        <p className='text-xl text-gray-500'>...Esta solicitud ya expiró, contacta con la persona que te esta llevando el seguimiento para que genere una nueva solicitud.</p>
      </div>
    )
  }

  return (
    <main className='container mx-auto max-w-3xl mt-10 space-y-5'>
      <h1 className='text-3xl text-center font-semibold text-blue-600'>Completa los siguientes campos para concluir con la creación de tu cuenta</h1>
      <FormCreateUserForInvitation invitation={invitation}  token={token} />
    </main>
  )
}

export default function AcceptInvitationPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div>Cargando invitación...</div>}>
      <InvitationContent searchParams={searchParams} />
    </Suspense>
  )
}
