import { Button } from '@/src/shared/components/ui/button'
import { IconCirclePlus } from '@tabler/icons-react'
import { Route } from 'next';
import Link from 'next/link'

interface Props {
  slug: string;
}

export default function ButtonAddSiteClient({ slug }: Props) {
  return (
    <Link href={`/dashboard/clientes-sitios/${slug}/agregar`}>
        <Button className='bg-green-500 hover:bg-green-400 text-white duration-300 transition-all'>
            <IconCirclePlus />
            Agregar Nuevo Sitio
        </Button>
    </Link>

  )
}