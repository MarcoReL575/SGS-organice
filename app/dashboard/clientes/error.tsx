// app/dashboard/error.tsx
"use client"; 

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <h2 className="text-2xl">Algo salió mal</h2>
            <p className="text-gray-500">{error.message}</p>
            <button onClick={reset} className="border rounded-lg px-4 py-2">
                Reintentar
            </button>
        </div>
    );
}