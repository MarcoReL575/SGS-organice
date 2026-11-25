import { Button } from '@/src/shared/components/ui/button'
import { IconCirclePlus } from '@tabler/icons-react'
import Link from 'next/link'

export default function ButtonAddSiteClient() {
  return (
    <Link href={'/dashboard/clientes-sitios/agregar'}>
        <Button className='bg-green-500 hover:bg-green-400 text-white duration-300 transition-all'>
            <IconCirclePlus />
            Agregar Nuevo Sitio
        </Button>
    </Link>

  )
}