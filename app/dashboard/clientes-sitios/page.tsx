import ButtonAddSiteClient from '@/src/features/clients/components/ButtonAddSiteClient'
import CardClients from '@/src/features/clients/components/CardClients';
import { clientService } from '@/src/features/clients/services/clientService'
import { Suspense } from 'react';

async function PageContent() {

  const { success, message, clients: clientsList } = await clientService.getAllClients();

  if(!clientsList.length) return <div>Aún no hay clienets dados de alta</div>

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>  
      {
        clientsList.map((client)=>(
          <CardClients key={client.id} client={client} />
        ))
      }
    </div>
  )
}

export default async function ClientesSitiosPage() {
  return (
    <>
      <section className=' space-y-8'>
        <header>
          <h1 className='text-3xl font-semibold mt-4'>Selecciona un cliente</h1>
          <p className=' text-gray-500'>Selecciona un cliente, para ver los sitios o sucursales que este tiene</p>
        </header>
        <Suspense fallback={<div>Cargando clientes y sitios...</div>}>
          <PageContent />
        </Suspense>
      </section>
    </>
  )
}