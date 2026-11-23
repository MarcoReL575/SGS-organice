"use client"

import { IconLayoutDashboard,IconUserCircle } from "@tabler/icons-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { NavMain } from "./NavMain"
import Link from "next/link"

const menuItems = {
  admin: [
    { title: "Home", url: "/dashboard/home", icon: IconUserCircle , role: 'administrador' },
    { title: "Usuarios", url: "/dashboard/usuarios", icon: IconUserCircle, role: 'administrador' },
    { title: "Clientes", url: "/dashboard/clientes", icon: IconUserCircle, role: 'administrador'  },
  ],
  supervisor: [
    { title: "Dashboard", url: "/dashboard", icon: IconUserCircle, role: 'supervisor'  },
    { title: "Servicios", url: "/dashboard/servicios", icon: IconUserCircle, role: 'supervisor'  },
    { title: "Pendientes de Revisión", url: "/dashboard/revision", icon: IconUserCircle, role: 'supervisor'  },
    { title: "Historial", url: "/dashboard/historial", icon: IconUserCircle, role: 'supervisor'  },
  ],
  ingeniero: [
    { title: "Dashboard", url: "/dashboard", icon: IconUserCircle, role: 'ingeniero'  },
    { title: "Servicios Nuevos", url: "/dashboard/nuevos", icon: IconUserCircle, role: 'ingeniero'  },
    { title: "Servicios Abiertos", url: "/dashboard/abiertos", icon: IconUserCircle, role: 'ingeniero'  },
    { title: "Servicios Cerrados", url: "/dashboard/cerrados", icon: IconUserCircle, role: 'ingeniero'  },
  ],
};

export function AppSidebar({ userRole }: { userRole: string}) {
  const items = menuItems[userRole as keyof typeof menuItems] || [];
  
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="#" className="flex items-center space-x-2">
                <IconLayoutDashboard className="size-5!" />
                <span className="text-base font-semibold">SGS-Organize</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
    </Sidebar>
  )
}
