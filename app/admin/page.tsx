"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BarChart3, Users, Settings, Shield, UserCheck, UserX, Plus, Search, Filter, Download, Bell, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, LogOut, Home, DollarSign, CreditCard, Wallet, TrendingUp, Check } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

// Sample data for admin dashboard
const pendingFarmers = [
  { id: "F001", name: "John Kamau", phone: "+254712345678", location: "Kiambu", registrationDate: "2024-01-15", status: "pending", documents: ["ID Copy", "Farm Certificate"] },
  { id: "F002", name: "Mary Wanjiku", phone: "+254723456789", location: "Nakuru", registrationDate: "2024-01-14", status: "pending", documents: ["ID Copy", "Bank Details"] },
  { id: "F003", name: "Peter Mwangi", phone: "+254734567890", location: "Meru", registrationDate: "2024-01-13", status: "under_review", documents: ["ID Copy", "Farm Certificate", "Bank Details"] },
]

const registeredFarmers = [
  { id: "F004", name: "Sarah Njeri", phone: "+254745678901", location: "Kiambu", registrationDate: "2024-01-10", status: "active", totalDeliveries: 45, lastDelivery: "2024-01-15" },
  { id: "F005", name: "David Kiprop", phone: "+254756789012", location: "Nakuru", registrationDate: "2024-01-08", status: "active", totalDeliveries: 52, lastDelivery: "2024-01-15" },
  { id: "F006", name: "Grace Wambui", phone: "+254767890123", location: "Meru", registrationDate: "2024-01-05", status: "inactive", totalDeliveries: 23, lastDelivery: "2024-01-12" },
]

const employees = [
  { id: "E001", name: "James Ochieng", role: "Manager", email: "james@dairy.com", status: "active", lastLogin: "2024-01-15 09:30", permissions: ["dashboard", "farmers", "reports"] },
  { id: "E002", name: "Alice Mutua", role: "Operator", email: "alice@dairy.com", status: "active", lastLogin: "2024-01-15 08:15", permissions: ["dashboard", "intake"] },
  { id: "E003", name: "Robert Kiprotich", role: "Accountant", email: "robert@dairy.com", status: "active", lastLogin: "2024-01-14 16:45", permissions: ["dashboard", "reports", "finance"] },
]

// Revenue and commission data
const revenueData = [
  { month: "Jan", totalRevenue: 125000, commission: 6250, netRevenue: 118750 },
  { month: "Feb", totalRevenue: 142000, commission: 7100, netRevenue: 134900 },
  { month: "Mar", totalRevenue: 158000, commission: 7900, netRevenue: 150100 },
  { month: "Apr", totalRevenue: 167000, commission: 8350, netRevenue: 158650 },
  { month: "May", totalRevenue: 189000, commission: 9450, netRevenue: 179550 },
  { month: "Jun", totalRevenue: 203000, commission: 10150, netRevenue: 192850 },
]

const dailyCommissions = [
  { date: "Jan 10", amount: 1250, transactions: 45 },
  { date: "Jan 11", amount: 1890, transactions: 67 },
  { date: "Jan 12", amount: 2100, transactions: 78 },
  { date: "Jan 13", amount: 1750, transactions: 52 },
  { date: "Jan 14", amount: 2350, transactions: 89 },
  { date: "Jan 15", amount: 2800, transactions: 95 },
  { date: "Jan 16", amount: 2450, transactions: 82 },
]

const sidebarItems = [
  { title: "Admin Overview", icon: BarChart3, url: "/admin", active: true },
  { title: "Farmer Management", icon: Users, url: "/admin/farmers" },
  { title: "Employee Management", icon: UserCheck, url: "/admin/employees" },
  { title: "System Settings", icon: Settings, url: "/admin/settings" },
  { title: "Permissions", icon: Shield, url: "/admin/permissions" },
]

function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Shield className="h-8 w-8 text-red-600" />
          <div>
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">System Administration</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.active}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/employee">
                    <Home className="h-4 w-4" />
                    <span>Employee Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/login">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-medium">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Super Admin</p>
              <p className="text-xs text-muted-foreground">admin@dairy.com</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

function FarmerApprovalDialog({ farmer, onApprove, onReject }: { farmer: any, onApprove: () => void, onReject: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review Farmer Registration</DialogTitle>
          <DialogDescription>
            Review {farmer.name}'s registration details and documents
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Name</Label>
              <p className="text-sm text-muted-foreground">{farmer.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Phone</Label>
              <p className="text-sm text-muted-foreground">{farmer.phone}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Location</Label>
              <p className="text-sm text-muted-foreground">{farmer.location}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Registration Date</Label>
              <p className="text-sm text-muted-foreground">{farmer.registrationDate}</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Submitted Documents</Label>
            <div className="flex gap-2 mt-1">
              {farmer.documents.map((doc: string, index: number) => (
                <Badge key={index} variant="secondary">{doc}</Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => { onReject(); setOpen(false); }}>
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button onClick={() => { onApprove(); setOpen(false); }}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve & Send SMS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AdminPasswordDialog() {
  const [open, setOpen] = useState(true)
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handlePasswordSubmit = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
      setOpen(false)
    } else {
      alert("Incorrect password. Try 'admin123' for demo.")
    }
  }

  if (!isAuthenticated) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[400px]" hideClose>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Admin Access Required
            </DialogTitle>
            <DialogDescription>
              Enter the admin password to access the super admin dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="admin-password">Admin Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Demo password: admin123
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handlePasswordSubmit} className="w-full">
              Access Admin Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return null
}

export default function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(pendingFarmers.length)
  const [activeTab, setActiveTab] = useState("overview")
  const [realTimeCommissions, setRealTimeCommissions] = useState(dailyCommissions)

  // Simulate real-time commission updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeCommissions(prev => 
        prev.map((item, index) => 
          index === prev.length - 1 
            ? { ...item, amount: item.amount + Math.floor(Math.random() * 100) }
            : item
        )
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleApprove = (farmerId: string) => {
    console.log(`Approved farmer ${farmerId} - SMS sent`)
    setPendingCount(prev => prev - 1)
  }

  const handleReject = (farmerId: string) => {
    console.log(`Rejected farmer ${farmerId} - SMS sent`)
    setPendingCount(prev => prev - 1)
  }

  const totalCommissionToday = realTimeCommissions[realTimeCommissions.length - 1]?.amount || 0
  const totalCommissionThisMonth = 45250
  const totalRevenueThisMonth = 905000

  return (
    <>
      <AdminPasswordDialog />
      <SidebarProvider>
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <div className="relative max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search farmers, employees..."
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {pendingCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-600">
                      {pendingCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Complete system oversight and revenue management
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>

            {/* Enhanced Admin Metrics with Revenue Focus */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commission Today</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">KSH {totalCommissionToday.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 font-medium">+15.2%</span> from yesterday
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-100">
                    <div className="h-full bg-green-600 w-4/5 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Commission</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">KSH {totalCommissionThisMonth.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    5% of KSH {totalRevenueThisMonth.toLocaleString()} revenue
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-100">
                    <div className="h-full bg-blue-600 w-3/4"></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Farmers awaiting approval
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Cooperatives</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <p className="text-xs text-muted-foreground">
                    Generating revenue
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
                <TabsTrigger value="payments">Payment Integrations</TabsTrigger>
                <TabsTrigger value="farmers">Farmer Management</TabsTrigger>
                <TabsTrigger value="employees">Employee Management</TabsTrigger>
                <TabsTrigger value="settings">System Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Monthly Revenue Chart - Bar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Revenue & Commission</CardTitle>
                      <CardDescription>Revenue breakdown showing commission vs cooperative earnings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          totalRevenue: {
                            label: "Total Revenue",
                            color: "hsl(var(--chart-1))",
                          },
                          commission: {
                            label: "Our Commission",
                            color: "hsl(var(--chart-2))",
                          },
                          netRevenue: {
                            label: "Cooperative Earnings",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="h-[350px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#666" fontSize={12} />
                            <YAxis stroke="#666" fontSize={12} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="netRevenue" fill="hsl(var(--chart-3))" name="Cooperative Earnings" />
                            <Bar dataKey="commission" fill="hsl(var(--chart-2))" name="Our Commission" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Daily Commission Trend - Line Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Daily Commission Trend
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      </CardTitle>
                      <CardDescription>Real-time commission tracking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          amount: {
                            label: "Commission Amount",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="h-[350px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={realTimeCommissions} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" stroke="#666" fontSize={12} />
                            <YAxis stroke="#666" fontSize={12} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey="amount"
                              stroke="hsl(var(--chart-1))"
                              strokeWidth={3}
                              dot={false}
                              name="Commission (KSH)"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Live Payment Stream */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Live Payment Stream
                        <Badge variant="secondary" className="animate-pulse">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Live
                        </Badge>
                      </CardTitle>
                      <CardDescription>Real-time commission payments from milk offtakes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Cooperative</TableHead>
                            <TableHead>Milk Volume</TableHead>
                            <TableHead>Sale Amount</TableHead>
                            <TableHead>Commission (5%)</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>14:32</TableCell>
                            <TableCell>Kiambu Dairy Coop</TableCell>
                            <TableCell>250L</TableCell>
                            <TableCell>KSH 12,500</TableCell>
                            <TableCell className="text-green-600 font-medium">KSH 625</TableCell>
                            <TableCell><Badge className="bg-green-600">Received</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>14:28</TableCell>
                            <TableCell>Nakuru Farmers Coop</TableCell>
                            <TableCell>180L</TableCell>
                            <TableCell>KSH 9,000</TableCell>
                            <TableCell className="text-green-600 font-medium">KSH 450</TableCell>
                            <TableCell><Badge className="bg-green-600">Received</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>14:15</TableCell>
                            <TableCell>Meru Dairy Union</TableCell>
                            <TableCell>320L</TableCell>
                            <TableCell>KSH 16,000</TableCell>
                            <TableCell className="text-green-600 font-medium">KSH 800</TableCell>
                            <TableCell><Badge className="bg-green-600">Received</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>13:45</TableCell>
                            <TableCell>Eldoret Milk Coop</TableCell>
                            <TableCell>420L</TableCell>
                            <TableCell>KSH 21,000</TableCell>
                            <TableCell className="text-green-600 font-medium">KSH 1,050</TableCell>
                            <TableCell><Badge className="bg-green-600">Received</Badge></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* M-Pesa Integration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-green-600 rounded flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-white" />
                        </div>
                        M-Pesa Integration
                      </CardTitle>
                      <CardDescription>
                        Real-time commission collection from every milk sale - we grow when you grow
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                        <div>
                          <p className="font-medium text-green-800">M-Pesa Status</p>
                          <p className="text-sm text-green-600">Connected & Receiving Payments</p>
                        </div>
                        <Badge className="bg-green-600">Live</Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="mpesa-shortcode">Business Shortcode</Label>
                          <Input id="mpesa-shortcode" defaultValue="174379" className="font-mono" />
                        </div>
                        <div>
                          <Label htmlFor="mpesa-passkey">Passkey</Label>
                          <Input id="mpesa-passkey" type="password" defaultValue="••••••••••••••••" className="font-mono" />
                        </div>
                        <div>
                          <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                          <Input id="commission-rate" type="number" defaultValue="5" step="0.1" />
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">Today's Commission Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700">Total Transactions:</span>
                            <span className="font-medium">47</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Total Milk Volume:</span>
                            <span className="font-medium">2,450L</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Gross Revenue:</span>
                            <span className="font-medium">KSH 122,500</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-blue-700 font-medium">Commission Earned:</span>
                            <span className="font-bold text-green-600">KSH {totalCommissionToday.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">
                        Update M-Pesa Settings
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Bank Integration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        Bank Integration
                      </CardTitle>
                      <CardDescription>
                        Connect bank accounts for commission settlements
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div>
                          <p className="font-medium text-blue-800">Bank Connection</p>
                          <p className="text-sm text-blue-600">Equity Bank - Connected</p>
                        </div>
                        <Badge variant="outline" className="border-blue-600 text-blue-600">Verified</Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="bank-name">Bank Name</Label>
                          <Select defaultValue="equity">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equity">Equity Bank</SelectItem>
                              <SelectItem value="kcb">KCB Bank</SelectItem>
                              <SelectItem value="coop">Co-operative Bank</SelectItem>
                              <SelectItem value="absa">Absa Bank</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="account-number">Account Number</Label>
                          <Input id="account-number" defaultValue="0123456789" className="font-mono" />
                        </div>
                        <div>
                          <Label htmlFor="account-name">Account Name</Label>
                          <Input id="account-name" defaultValue="DairySight Technologies Ltd" />
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">Automatic Settlements</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-yellow-700">Settlement Frequency</span>
                            <Select defaultValue="daily">
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-yellow-700">Next Settlement</span>
                            <span className="text-sm font-medium">Tomorrow 9:00 AM</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-yellow-700">Pending Amount</span>
                            <span className="text-sm font-medium text-green-600">KSH {totalCommissionToday.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full" variant="outline">
                        Update Bank Details
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Commission Wallet */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-purple-600" />
                        Commission Wallet
                      </CardTitle>
                      <CardDescription>
                        Live commission tracking from our revenue sharing partnership - 5% of every successful sale
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm opacity-90">Available Balance</span>
                            <Wallet className="h-4 w-4 opacity-90" />
                          </div>
                          <div className="text-2xl font-bold">KSH {(totalCommissionToday * 0.8).toLocaleString()}</div>
                          <div className="text-xs opacity-90">Ready for withdrawal</div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm opacity-90">Pending Settlement</span>
                            <Clock className="h-4 w-4 opacity-90" />
                          </div>
                          <div className="text-2xl font-bold">KSH {(totalCommissionToday * 0.2).toLocaleString()}</div>
                          <div className="text-xs opacity-90">Processing</div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm opacity-90">Monthly Total</span>
                            <TrendingUp className="h-4 w-4 opacity-90" />
                          </div>
                          <div className="text-2xl font-bold">KSH {totalCommissionThisMonth.toLocaleString()}</div>
                          <div className="text-xs opacity-90">This month</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mt-6">
                        <Button className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Withdraw to Bank
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Transactions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <TrendingUp className="h-5 w-5" />
                        Revenue Sharing Partnership Benefits
                      </CardTitle>
                      <CardDescription>
                        Why our commission model creates better outcomes for cooperatives
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-2">0%</div>
                          <p className="text-sm font-medium text-green-800">Monthly Fees</p>
                          <p className="text-xs text-green-600">No fixed costs ever</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-2">5%</div>
                          <p className="text-sm font-medium text-blue-800">Commission Only</p>
                          <p className="text-xs text-blue-600">When you make sales</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
                          <p className="text-sm font-medium text-purple-800">Your Revenue</p>
                          <p className="text-xs text-purple-600">Direct to your account</p>
                        </div>
                      </div>
                      <div className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Partnership Advantages</h4>
                        <div className="grid gap-2 md:grid-cols-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>We're invested in your growth</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>No risk during slow periods</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Instant payment processing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Transparent commission tracking</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="farmers" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Pending Farmer Registrations */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Pending Registrations
                            <Badge variant="destructive">{pendingCount}</Badge>
                          </CardTitle>
                          <CardDescription>
                            Farmers awaiting approval
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingFarmers.map((farmer) => (
                          <div key={farmer.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{farmer.name}</h4>
                                <Badge variant={farmer.status === 'pending' ? 'secondary' : 'outline'}>
                                  {farmer.status.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{farmer.phone} • {farmer.location}</p>
                              <p className="text-xs text-muted-foreground">Registered: {farmer.registrationDate}</p>
                            </div>
                            <FarmerApprovalDialog 
                              farmer={farmer}
                              onApprove={() => handleApprove(farmer.id)}
                              onReject={() => handleReject(farmer.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Registered Farmers */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Farmers</CardTitle>
                      <CardDescription>
                        Approved farmer members
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Deliveries</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {registeredFarmers.map((farmer) => (
                            <TableRow key={farmer.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{farmer.name}</p>
                                  <p className="text-sm text-muted-foreground">{farmer.location}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={farmer.status === 'active' ? 'default' : 'secondary'}>
                                  {farmer.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{farmer.totalDeliveries}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="employees" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Employee Management</CardTitle>
                    <CardDescription>
                      Manage system users and their permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employees.map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{employee.name}</p>
                                <p className="text-sm text-muted-foreground">{employee.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{employee.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                                {employee.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{employee.lastLogin}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Configuration</CardTitle>
                      <CardDescription>
                        Configure system-wide settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-approval">Auto-approve farmers</Label>
                          <p className="text-sm text-muted-foreground">Automatically approve farmer registrations</p>
                        </div>
                        <Switch id="auto-approval" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send SMS updates to farmers</p>
                        </div>
                        <Switch id="sms-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-reports">Email Reports</Label>
                          <p className="text-sm text-muted-foreground">Send daily reports via email</p>
                        </div>
                        <Switch id="email-reports" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quality Standards</CardTitle>
                      <CardDescription>
                        Set milk quality parameters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="min-quality">Minimum Quality Score</Label>
                        <Select defaultValue="B">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">Grade A (Premium)</SelectItem>
                            <SelectItem value="B">Grade B (Standard)</SelectItem>
                            <SelectItem value="C">Grade C (Basic)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="price-per-liter">Price per Liter (KSH)</Label>
                        <Input id="price-per-liter" type="number" defaultValue="50" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </SidebarProvider>
    </>
  )
}
