import FormAddSiteClient from '@/src/features/clients/components/FormAddSiteClient'
import { clientService } from '@/src/features/clients/services/clientService'
import { requireAuth } from '@/src/lib/session'
import ButtonBack from '@/src/shared/components/ButtonBack'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'


async function PageContent() {
    const { user } = await requireAuth();
    if(user.role !== 'supervisor') return notFound();
    
    const { clients } = await clientService.getAllClients();

    return (
        <main>
            <FormAddSiteClient clients={clients} />
        </main>
    )
}

export default async function AddSiteClientPage() {
  return (
    <Suspense fallback={<div>Cargando lista de clientes...</div>}>
        <section>
            <header>
                <ButtonBack url='/dashboard/clientes-sitios' />
                <h1 className='text-3xl font-semibold '>Agrega un nuevo sitio o sucursal de algún cliente</h1>
                <p className='text-gray-500' >Recurda llenar todos los campos del formulario.</p>
            </header>
        </section>
        <PageContent />
    </Suspense>
  )
}
