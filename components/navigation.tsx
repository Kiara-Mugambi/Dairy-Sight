"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Droplets,
  Home,
  Users,
  BarChart3,
  Settings,
  LogOut,
  User,
  Shield,
  Menu,
  X,
  Package,
  Truck,
  TrendingUp,
  ClipboardList, // ✅ added for collectors
} from "lucide-react"

interface User {
  email: string
  role: string
  name: string
}

export function Navigation() {
  const [user, setUser] = useState<User | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  // Hide nav on public pages
  const publicPages = [
    "/",
    "/login",
    "/signup",
    "/get-started",
    "/farmer/register",
    "/farmer/success",
    "/signup/success",
    "/collectors/login", // ✅ collector login treated as public
  ]
  const isPublicPage = publicPages.some((page) => pathname.startsWith(page))

  if (isPublicPage || !user) {
    return null
  }

  // Role-based navigation
  const navigationItems =
    user.role === "admin"
      ? [
          { href: "/admin", label: "Dashboard", icon: Home },
          { href: "/admin/farmers", label: "Farmers", icon: Users },
          { href: "/admin/reports", label: "Reports", icon: BarChart3 },
          { href: "/admin/settings", label: "Settings", icon: Settings },
        ]
      : user.role === "collector"
        ? [
            { href: "/collectors/dashboard", label: "Dashboard", icon: ClipboardList }, // ✅ Collector menu
          ]
        : [
            { href: "/employee", label: "Dashboard", icon: Home },
            { href: "/employee/intake", label: "Milk Intake", icon: Droplets },
            { href: "/employee/farmers", label: "Farmers", icon: Users },
            { href: "/employee/offtake", label: "Milk Offtake", icon: Truck },
            { href: "/employee/inventory", label: "Inventory", icon: Package },
            { href: "/employee/analytics", label: "Analytics", icon: TrendingUp },
          ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href={
              user.role === "admin"
                ? "/admin"
                : user.role === "collector"
                ? "/collectors/dashboard"
                : "/employee"
            }
            className="flex items-center gap-2"
          >
            <Droplets className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DairySight</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hidden sm:flex">
              {user.role === "admin" ? (
                <>
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </>
              ) : user.role === "collector" ? (
                <>
                  <ClipboardList className="h-3 w-3 mr-1" />
                  Collector
                </>
              ) : (
                <>
                  <User className="h-3 w-3 mr-1" />
                  Employee
                </>
              )}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
