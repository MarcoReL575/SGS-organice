"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu"
import { Button } from "@/src/shared/components/ui/button"
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react"
import Link from "next/link"

interface Props {
    userId: string
}

export function ButtonOptionsUser({ userId }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline"><IconDotsVertical /></Button>} />
            <DropdownMenuContent className="w-40 bg-white" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className='hover:text-blue-500 duration-300 transition-all cursor-pointer'
                    >
                        <Link href={`/dashboard/usuarios/editarUsuario?usuario=${userId}`} className="flex items-center w-full justify-between">
                            Editar 
                            <DropdownMenuShortcut><IconEdit /></DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className='hover:text-red-500 duration-300 transition-all cursor-pointer'
                    >
                        Eliminar 
                        <DropdownMenuShortcut><IconTrash /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
