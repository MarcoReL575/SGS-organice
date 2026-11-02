"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/src/shared/components/ui/sidebar"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { clsx } from "cn"
import Link from "next/link"
import { Route } from "next"

interface Props {
    items: {
        title: string;
        url: string;
        icon?: Icon;
        role: 'ingeniero' | 'supervisor' | 'administrador'
    }[]
}

export function NavMain({ items }: Props) {

  const pathname = usePathname();
  console.log(pathname)

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={`${item.role}-${item.title}`}>
              <SidebarMenuButton 
                tooltip={item.title}
                className={clsx(pathname.includes(item.url) && 'bg-black text-white transition-all duration-300')}
              >
                {item.icon && <item.icon />}
                <Link href={item.url as Route}>
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
