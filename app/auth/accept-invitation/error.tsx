'use client'

import Link from 'next/link';
import React, { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorInvitationPage({ error, reset }: ErrorProps) {

    useEffect(() => {
        // Útil para registrar el error en servicios de monitoreo o consola
        console.error('Fallo en la página de invitación:', error);
    }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-xl font-bold text-gray-900 mb-2">No se pudo procesar la invitación</h1>
        
        <p className="text-sm text-gray-600 mb-6">
          {error.message || 'El enlace puede haber expirado, ya fue utilizado o no es válido.'}
        </p>

        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Intentar de nuevo
          </button>
          
          <Link
            href="/auth/login"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
          >
            Ir al inicio de sesión
          </Link>
        </div>
      </div>
    </main>
  )
}
