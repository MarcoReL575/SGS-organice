import ButtonAddClient from '@/src/features/clients/components/ButtonAddClient'
import TableClients from '@/src/features/clients/components/TableClients'
import { clientService } from '@/src/features/clients/services/clientService'
import { Suspense } from 'react';

async function ClientsPageContent() {
    const { success, message, clients } = await clientService.getAllClients();
    
    if(!success) return(<div className='text-center font-semibold text-gray-500'>No se pudo caragr la lista de usuarios...</div>)
    
    return (
        <>
            <TableClients data={clients} />
        </>
    )
}

export default async function ClientsPage() {
  return (
    <Suspense fallback={<div>Cargando lista de clientes...</div>}>
        <section className='space-y-8 flex flex-col'>
            <ButtonAddClient />
            <main>
                <ClientsPageContent />
            </main>
        </section>
    </Suspense>
  )
}
