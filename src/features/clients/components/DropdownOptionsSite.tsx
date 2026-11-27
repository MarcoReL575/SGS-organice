'use client'

import { DropdownMenuButton } from '@/src/shared/components/DropdownMenuButton'
import { VariantButton } from '@/src/shared/types/types';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface Props {
    id: string;
}

export default function DropdownOptionsSite({ id }: Props) {

    const handleOpenModalDeleteSite = ()=> {

    }

    const options = [
        {
            label: 'Editar',
            icon: <IconEdit />,
            href: `/dashboard/clientes-sitios/KioskoTech/${id}/editar`,
        },
        {
            label: 'Eliminar',
            icon: <IconTrash />,
            variant: 'destructive' as VariantButton,
            onCLick: ()=> handleOpenModalDeleteSite,
        },

    ]

  return (
    <DropdownMenuButton options={options} />
  )
}