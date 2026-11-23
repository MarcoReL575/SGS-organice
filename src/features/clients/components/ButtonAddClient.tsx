import { Button } from '@/src/shared/components/ui/button'
import { IconCirclePlus } from '@tabler/icons-react'
import Link from 'next/link'

export default function ButtonAddClient() {
  return (
    <Link href={'/dashboard/clientes/agregarCliente'}>
        <Button className='bg-green-500 hover:bg-green-400 text-white duration-300 transition-all'>
            <IconCirclePlus />
            Agregar Nuevo Cliente
        </Button>
    </Link>
  )
}
