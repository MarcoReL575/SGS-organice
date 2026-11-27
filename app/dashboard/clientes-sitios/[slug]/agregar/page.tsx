import FormAddSiteClient from '@/src/features/clients/components/FormAddSiteClient'
import { clientService } from '@/src/features/clients/services/clientService'
import { requireAuth } from '@/src/lib/session'
import ButtonBack from '@/src/shared/components/ButtonBack'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
    params: Promise<{ slug: string }>
}

async function PageContent({ params }: Props) {

    const { slug } = await params;
    const { user } = await requireAuth();
    if(user.role !== 'supervisor') return notFound();
    
    const { clients } = await clientService.getAllClients();

    return (
        <section className="flex flex-col space-y-8">
            <header className="flex flex-col space-y-4">
                <ButtonBack url={`/dashboard/clientes-sitios/${slug}`} />
                <div>
                    <h1 className='text-3xl font-semibold '>Agrega un nuevo sitio o sucursal de algún cliente</h1>
                    <p className='text-gray-500' >Recurda llenar todos los campos del formulario.</p>
                </div>
            </header>
            <main>
                <FormAddSiteClient clients={clients} slug={slug} option='agregar' />
            </main>
        </section>
    )
}

export default async function AddSiteClientPage({ params }: Props) {
  return (
    <Suspense fallback={<div>Cargando lista de clientes...</div>}>
        <PageContent params={params} />
    </Suspense>
  )
}
