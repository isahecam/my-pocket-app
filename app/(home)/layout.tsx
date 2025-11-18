import { DashboardSidebar } from "@/components/layouts/app-sidebar";
import { MainHeader } from "@/components/layouts/main-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <MainHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
