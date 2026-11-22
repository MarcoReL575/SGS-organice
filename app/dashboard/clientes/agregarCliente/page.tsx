import FormAddClient from '@/src/features/clients/components/FormAddClient'
import ButtonBack from '@/src/shared/components/ButtonBack'

export default function AddClientPage() {
  return (
    <section className=' space-y-10'>
        <header className='flex flex-col justify-start '>
            <div className='flex items-start justify-start'>
                <ButtonBack url='/dashboard/clientes' />
            </div>
            <div className='text-center space-y-2'>
                <h1 className='text-3xl font font-semibold'>¡Agrega un nuevo cliente!</h1>
                <p className='text-md text-gray-600'>Recuerda llenar todos los campos obligatorios y verificar que la infromación este correcta</p>
            </div>
        </header>
        <main>
            <FormAddClient />
        </main>
    </section>
  )
}
