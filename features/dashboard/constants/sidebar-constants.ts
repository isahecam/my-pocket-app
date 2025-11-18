import { ArrowUpIcon, LayoutDashboardIcon, type LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Ingresos",
    url: "/incomes",
    icon: ArrowUpIcon,
  },
] as const;
