import { Separator } from "@/src/shared/components/ui/separator"
import { SidebarTrigger } from "@/src/shared/components/ui/sidebar"
import { Button } from "../ui/button"
import { NavUser } from "./NavUser"

interface Props {
  user: {
    name: string;
    role: string;
    email: string;
    image: string | null | undefined;
  }
}

export function SiteHeader({ user }: Props) {
  return (
    <header className="flex h-15 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between px-4">
        <span className="border rounded-lg">
          <SidebarTrigger className="-ml-1" size='icon'/>
        </span>
        <NavUser user={user} />
      </div>
    </header>
  )
}
