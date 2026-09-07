"use client"

import { usePathname } from "next/navigation"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const titles: Record<string, string> = {
  "/": "Tableau de bord",
  "/transactions": "Transactions",
  "/rapports": "Rapports & exports",
  "/parametres": "Paramètres",
}

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Changer de thème"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </Button>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title =
    titles[pathname] ??
    (pathname.startsWith("/transactions") ? "Détail transaction" : "")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 !h-5" />
          <h1 className="text-base font-semibold">{title}</h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
