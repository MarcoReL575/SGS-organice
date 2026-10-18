import FormSignup from '@/src/features/auth/FormSignup'
import React from 'react'

export default function SignupPage() {
  return (
    <section className='w-full mx-auto py-5'>
      <h1 className='text-center text-xl font-semibold'>¡Bienvenido, si aún no tienes una cuenta, Crealá ahora!</h1>
      <FormSignup />
    </section>
  )
}
