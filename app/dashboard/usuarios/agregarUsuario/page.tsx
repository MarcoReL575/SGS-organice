import FormCreateUser from '@/src/features/auth/components/FormCreateUser';
import React from 'react'

export default function AgregarUsuario() {

    const optionsRole = [
        {
            label: 'Administrador',
            value: 'admin'
        },
        {
            label: 'Ingeniero',
            value: 'ingeniero'
        },
        {
            label: 'Supervisor',
            value: 'supervisor'
        }
    ];

  return (
    <section className='space-y-10'>
        <header>
            <h1 className='text-3xl font-semibold text-center'>Agrega un nuevo usuario y asignale un Rol</h1>
        </header>
        <FormCreateUser optionRoles={optionsRole} />
    </section>
  )
}
