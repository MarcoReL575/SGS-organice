"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu"
import { Button } from "@/src/shared/components/ui/button"
import { IconDotsVertical } from "@tabler/icons-react"
import Link from "next/link"
import { Route } from "next"
import { ReactNode } from "react"

interface DropdownMenuOptions {
    label: string;
    icon?: ReactNode;
    onCLick?: ()=> void;
    href?: string;
    variant?: 'default' | 'destructive';
    shortcut?: string;
    disabled?: boolean;
}
interface Props {
    options: DropdownMenuOptions[];
    align?: 'start' | 'center' | 'end';
}

export function DropdownMenuButton({ options, align }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline"><IconDotsVertical /></Button>} />
            <DropdownMenuContent className="w-40 bg-white" align="start">
                <DropdownMenuGroup>
                    {options.map((option, index)=> (
                        <DropdownMenuItem
                            key={`${option.label}-${index}`}
                            disabled={option.disabled}
                            className={`duration-300 transition-all cursor-pointer
                            ${option.variant === 'destructive'
                                ? "hover:text-red-500"
                                : "hover:text-blue-500"
                            }`}
                            onClick={option.href ? undefined : option.onCLick}
                        >
                            {option.href 
                                ?   <Link 
                                        href={option.href as Route} 
                                        className="flex items-center w-full justify-between"
                                    >
                                        {option.label}
                                        {option.icon && (
                                            <DropdownMenuShortcut>
                                                {option.icon}
                                            </DropdownMenuShortcut>
                                        )} 
                                    </Link>
                                :   <>
                                        {option.label}

                                        {option.icon && (
                                            <DropdownMenuShortcut>
                                                {option.icon}
                                            </DropdownMenuShortcut>
                                        )}
                                    </>
                            }
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
