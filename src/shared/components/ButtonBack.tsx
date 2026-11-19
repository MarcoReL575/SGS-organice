import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Route } from 'next'
import { IconArrowLeft } from '@tabler/icons-react'

interface Props {
    url: string
}

export default function ButtonBack({ url }: Props) {
  return (
    <Link href={url as Route} className='w-fit'>
        <Button className=' text-white bg-black hover:bg-black/70 duration-300 transition-all'>
            <IconArrowLeft />
            Regresar
        </Button>
    </Link>
  )
}
