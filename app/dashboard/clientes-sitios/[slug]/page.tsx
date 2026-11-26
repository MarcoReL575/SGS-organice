import ButtonAddSiteClient from "@/src/features/clients/components/ButtonAddSiteClient";
import { clientService } from "@/src/features/clients/services/clientService";
import { requireAuth } from "@/src/lib/session";
import ButtonBack from "@/src/shared/components/ButtonBack";
import { Suspense } from "react"

interface Props {
    params: Promise<{ slug: string }>
}

async function ContentPage({ params }: Props) {
    const { slug } = await params;
    const { user } = await requireAuth();
    if(user.role !== 'supervisor') return <div>El usuario no tiene los permisos necesarios</div>

    const { success, message, sites } = await clientService.getAllSites();
    
    return (
        <section className="flex flex-col space-y-8">
            <header className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <ButtonBack url="/dashboard/clientes-sitios"/>
                    <ButtonAddSiteClient slug={slug} />
                </div>
                <h1 className="text-3xl font-semibold flex">Sitios del cliente 
                    <span className="px-2 text-blue-600 font-bold">{slug}</span>
                </h1>
            </header>
            <main>
                {
                    !success 
                        ?   <div className="text-center font-semibold text-xl text-gray-500">
                                No se encontraron sitios o sucursales para este cliente
                            </div>
                        :   <div></div>
                } 
            </main>
        </section>
    )
}


export default async function ClientSitesPage({ params }: Props) {
    return (
        <Suspense>
            <ContentPage params={params} />
        </Suspense>
    )
}
