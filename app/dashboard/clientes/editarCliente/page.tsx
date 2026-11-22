import ButtonBack from '@/src/shared/components/ButtonBack'
import React from 'react'

export default function EditarClientePage() {
  return (
    <section>
        <header>
            <ButtonBack url='/dashboard/clientes' />
            <h1 className='text-3xl mt-4'>
                Editar datos del cliente
            </h1>
            <p className='text-gray-500'>Revisa con cuidado y edita los datos del cliente, recuerda no dejar ningún campo vacío</p>
        </header>
    </section>
  )
}
