import ButtonBack from "@/src/shared/components/ButtonBack";
import { Suspense } from "react"

interface Props {
    params: Promise<{ slug: string }>
}

async function ContentPage({ params }: Props) {
    const { slug } = await params;
    return (
        <section>
            <header className="">
                <ButtonBack url="/dashboard/clientes-sitios"/>
                <h1 className="text-3xl font-semibold flex mt-4">Sitios del cliente 
                    <span className="px-2 text-blue-600 font-bold">{slug}</span>
                </h1>
            </header>
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
