// app/dashboard/not-found.tsx
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <h2 className="text-2xl">Cliente no encontrado</h2>
            <p>El recurso que estas buscando no existe o fue eliminado.</p>
            <Link href="/dashboard/clientes" className="text-blue-500 underline">
                Volver a clientes
            </Link>
        </div>
    );
}