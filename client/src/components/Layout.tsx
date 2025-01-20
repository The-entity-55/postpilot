import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Sidebar } from "./dashboard/Sidebar"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
        <aside
          className={cn(
            "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background/80 backdrop-blur-xl transition-transform duration-300 z-30",
            !isSidebarOpen && "-translate-x-full"
          )}
        >
          <Sidebar />
        </aside>
        <main
          className={cn(
            "flex-1 px-4 pb-8 pt-6 transition-all duration-300",
            isSidebarOpen ? "md:pl-72" : "pl-4"
          )}
        >
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}