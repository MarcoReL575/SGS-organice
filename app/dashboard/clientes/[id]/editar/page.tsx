import { Role } from '@/src/features/auth/lib/session';
import FormEditClient from '@/src/features/clients/components/FormEditClient';
import { clientService } from '@/src/features/clients/services/clientService';
import { requireAuth } from '@/src/lib/session';
import ButtonBack from '@/src/shared/components/ButtonBack';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

interface Props {
  params: Promise<{ id: string }>;
}

async function EditarPageContent({ params }: Props) {

    const { user } = await requireAuth();
    const { id: clienteId } = await params;
    const { success, message, client } = await clientService.getClient(clienteId, user.role as Role);

    if(!client || !user) notFound(); 

  return (
    <section>
        <header className='mb-8'>
            <ButtonBack url='/dashboard/clientes' />
            <h1 className='text-3xl mt-4'>
                Editar datos del cliente
            </h1>
            <p className='text-gray-500'>Revisa con cuidado y edita los datos del cliente, recuerda no dejar ningún campo vacío</p>
        </header>
        <FormEditClient client={client} /> 
    </section>
  )
}

export default async function EditarPage({ params }: Props) {
    return (
        <Suspense fallback={<div>Cargando datos del cliente...</div>}>
            <EditarPageContent params={params} />
        </Suspense>
    )
}
