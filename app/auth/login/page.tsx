import FormLogin from '@/src/features/auth/components/FormLogin'

export default function LoginPage() {
  return (
    <section className='w-full flex items-center justify-center py-5 mt-10'>
      <div className='border rounded-lg w-xs p-5 space-y-6'>
        <div>
          <h1 className='text-center text-xl font-semibold'>¡Bienvenido a SGS-Organice!</h1>
          <h3 className='text-center text-gray-400'>Ingresa tus credenciales para acceder</h3>
        </div>
        <FormLogin />
      </div>
    </section>
  )
}
