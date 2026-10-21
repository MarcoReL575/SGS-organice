import { requireAuth } from "@/src/lib/session";
import { AppSidebar } from "@/src/shared/components/AppSider/AppSider";
import { SiteHeader } from "@/src/shared/components/AppSider/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/src/shared/components/ui/sidebar";

export const instant = false; 

export default async function DashboardLayout({ children}: {children: React.ReactNode}) {

    const session = await requireAuth();
    const user = {
        name: session.user.name,
        role: session.user.role,
        email: session.user.email,
        image: session.user.image
    }

    return (
        <SidebarProvider>
            <AppSidebar userRole={user.role} />
            <SidebarInset>
                <SiteHeader user={user} />
                <section className="p-4">
                    {children}
                </section>
            </SidebarInset>
        </SidebarProvider>
    )
}