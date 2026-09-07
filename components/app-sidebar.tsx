"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  ReceiptTextIcon,
  FileBarChartIcon,
  SettingsIcon,
  SwordIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CLUB, toCategorizeCount } from "@/lib/mock-data"

const nav = [
  { title: "Tableau de bord", href: "/", icon: LayoutDashboardIcon },
  {
    title: "Transactions",
    href: "/transactions",
    icon: ReceiptTextIcon,
    badge: toCategorizeCount,
  },
  { title: "Rapports & exports", href: "/rapports", icon: FileBarChartIcon },
  { title: "Paramètres", href: "/parametres", icon: SettingsIcon },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <SwordIcon className="size-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{CLUB.name}</span>
            <span className="text-xs text-sidebar-foreground/60">
              Comptabilité · {CLUB.season}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={active}
                    tooltip={item.title}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.badge ? (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/20 text-xs font-semibold text-sidebar-primary-foreground">
            ML
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{CLUB.treasurer}</span>
            <span className="text-xs text-sidebar-foreground/60">Trésorière</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
