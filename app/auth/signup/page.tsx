import FormLogin from '@/src/features/auth/components/FormLogin'

export default function SignupPage() {
  return (
    <section className='w-full mx-auto py-5'>
      <h1 className='text-center text-xl font-semibold'>¡Bienvenido a SGS-Organice!</h1>
      <FormLogin />
    </section>
  )
}
