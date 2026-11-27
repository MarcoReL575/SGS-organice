import FormAddSiteClient from '@/src/features/clients/components/FormAddSiteClient';
import { clientService } from '@/src/features/clients/services/clientService';
import { requireAuth } from '@/src/lib/session';
import ButtonBack from '@/src/shared/components/ButtonBack'
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ slug: string, id: string }>;
}

async function EditClientSitePageContent({ params }: Props) {

  const { user } = await requireAuth();
  if(user.role !== 'supervisor') notFound();

  const { id, slug } = await params;
  const url = `/dashboard/clientes-sitios/${slug}`;
  const { clients } = await clientService.getAllClients();
  const { success, message, site } = await clientService.getSite(id)

  return (
    <section className='flex flex-col space-y-8'>
      <header>
        <ButtonBack url={url} />
        <h1 className='text-2xl font-semibold mt-4'>Editar Sucursal de <span className='text-blue-600'>{slug}</span></h1>
        <p className='text-gray-500'>Edita la información de la sucursal, recuerda llenar todos los datos.</p>
      </header>
      <main>
        <FormAddSiteClient 
          clients={clients} 
          slug={slug} 
          option='editar' 
          site={site} 
          id={id} 
        />
      </main>
    </section>
  )
}


export default async function EditClientSitePage ({ params }: Props) {
  return (
    <Suspense>
      <EditClientSitePageContent params={params} />
    </Suspense>
  )
}