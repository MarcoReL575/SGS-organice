import FormLogin from '@/src/features/auth/components/FormLogin'

export default function LoginPage() {
  return (
    <section className='w-full flex items-center justify-center py-5 mt-10'>
      <div className='border rounded-lg w-lg p-5 space-y-2'>
        <div className='space-y-4'>
          <h1 className='text-center text-xl font-semibold'>¡Bienvenido a SGS-Organice!</h1>
          <h3 className='text-center text-gray-400'>Ingresa tus credenciales para acceder</h3>
          <FormLogin />
        </div>
        <p className='text-blue-700 underline hover:text-blue-500 text-center text-sm'>
          ¿Olvidaste tu contraseña?
        </p>
      </div>
    </section>
  )
}
