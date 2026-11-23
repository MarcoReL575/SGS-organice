"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu"
import { Button } from "@/src/shared/components/ui/button"
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react"
import Link from "next/link"
import { useModalStore } from "@/src/shared/store/useModalStore"
import { DropdownMenuButton } from "@/src/shared/components/DropdownMenuButton"

interface Props {
    userId: string;
    linkToEdit: string;
}

export function ButtonOptionsUser({ userId, linkToEdit }: Props) {

    const { setOpen } = useModalStore();
    const handleOpenModalDeleteUser = ()=> {
        setOpen("modalDeleteUser", userId);
    }

    return (
        <DropdownMenuButton
            options={[
                {
                    label: 'Editar',
                    icon: <IconEdit />,
                    href: linkToEdit
                },
                {
                    label: 'Eliminar',
                    icon: <IconTrash />,
                    variant: 'destructive',
                    onCLick: handleOpenModalDeleteUser
                }
            ]}
        
        />
    )
}
