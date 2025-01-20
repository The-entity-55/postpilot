import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Settings,
  Home,
  LayoutDashboard,
  Calendar as CalendarIcon,
  Users,
  HelpCircle,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BarChart, label: "Analytics", path: "/analytics" },
  { icon: CalendarIcon, label: "Calendar", path: "/calendar" },
  { icon: Users, label: "Audience", path: "/audience" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex-1 space-y-1">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Button
            key={path}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 hover:bg-secondary/20",
              location.pathname === path && "bg-secondary text-secondary-foreground hover:bg-secondary/90"
            )}
            asChild
          >
            <Link to={path}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-secondary/20">
          <HelpCircle className="h-4 w-4" />
          Help
        </Button>
      </div>
    </div>
  )
}