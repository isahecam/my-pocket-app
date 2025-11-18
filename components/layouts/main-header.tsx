import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MainHeader() {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center gap-1 p-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-bold">Mi Pocket App</h1>
      </div>
    </header>
  );
}
