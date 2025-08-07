"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BarChart3, DollarSign, Droplets, Package, TrendingUp, Users, Calendar, FileText, Settings, Bell, Search, Filter, Download, Plus, ArrowUp, ArrowDown, Activity, LogOut, Shield } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

// Sample data with real-time simulation
const milkVolumeData = [
  { time: "06:00", intake: 450, offtake: 420, revenue: 840 },
  { time: "08:00", intake: 680, offtake: 650, revenue: 1300 },
  { time: "10:00", intake: 520, offtake: 495, revenue: 990 },
  { time: "12:00", intake: 750, offtake: 720, revenue: 1440 },
  { time: "14:00", intake: 620, offtake: 590, revenue: 1180 },
  { time: "16:00", intake: 580, offtake: 555, revenue: 1110 },
  { time: "18:00", intake: 490, offtake: 470, revenue: 940 },
]

const recentOfftakes = [
  { id: "OFF001", buyer: "Dairy Processing Ltd", volume: 250, amount: 500, time: "14:32", status: "completed", type: "automatic" },
  { id: "OFF002", buyer: "Fresh Milk Co", volume: 180, amount: 360, time: "14:28", status: "processing", type: "automatic" },
  { id: "OFF003", buyer: "Local Market", volume: 120, amount: 240, time: "14:15", status: "completed", type: "automatic" },
  { id: "OFF004", buyer: "School District", volume: 200, amount: 400, time: "13:45", status: "completed", type: "automatic" },
  { id: "OFF005", buyer: "Restaurant Chain", volume: 150, amount: 300, time: "13:30", status: "completed", type: "automatic" },
]

// Update sidebarItems to remove financial access
const sidebarItems = [
  { title: "Operations Dashboard", icon: BarChart3, url: "/employee", active: true },
  { title: "Record Intake", icon: Plus, url: "/employee/intake" },
  { title: "Inventory", icon: Package, url: "/employee/inventory" },
  { title: "Farmers", icon: Users, url: "/employee/farmers" },
  { title: "Offtake History", icon: TrendingUp, url: "/employee/offtake" },
  { title: "Reports", icon: FileText, url: "/employee/reports" },
]

function EmployeeSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Droplets className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">DairySight</h2>
            <p className="text-sm text-muted-foreground">Employee Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
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
                  <Link href="/admin">
                    <Shield className="h-4 w-4" />
                    <span>Admin Panel</span>
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
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              JO
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">James Ochieng</p>
              <p className="text-xs text-muted-foreground">Manager</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

function RecordIntakeDialog() {
  const [open, setOpen] = useState(false)
  const [farmerName, setFarmerName] = useState("")
  const [volume, setVolume] = useState("")
  const [quality, setQuality] = useState("")

  const handleSubmit = () => {
    console.log("Recording intake:", { farmerName, volume, quality })
    setOpen(false)
    setFarmerName("")
    setVolume("")
    setQuality("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Record Intake
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Milk Intake</DialogTitle>
          <DialogDescription>
            Enter the details of the milk delivery from the farmer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="farmer" className="text-right">
              Farmer
            </Label>
            <Select value={farmerName} onValueChange={setFarmerName}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select farmer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-kamau">John Kamau (F001)</SelectItem>
                <SelectItem value="mary-wanjiku">Mary Wanjiku (F002)</SelectItem>
                <SelectItem value="peter-mwangi">Peter Mwangi (F003)</SelectItem>
                <SelectItem value="sarah-njeri">Sarah Njeri (F004)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="volume" className="text-right">
              Volume (L)
            </Label>
            <Input
              id="volume"
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="col-span-3"
              placeholder="Enter volume in liters"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quality" className="text-right">
              Quality Score
            </Label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select quality grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Grade A (Premium)</SelectItem>
                <SelectItem value="B">Grade B (Standard)</SelectItem>
                <SelectItem value="C">Grade C (Basic)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Record Intake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function EmployeeDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const [realTimeData, setRealTimeData] = useState(milkVolumeData)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => 
        prev.map(item => ({
          ...item,
          offtake: item.offtake + Math.floor(Math.random() * 10 - 5),
          revenue: (item.offtake + Math.floor(Math.random() * 10 - 5)) * 2
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const totalIntake = realTimeData.reduce((sum, item) => sum + item.intake, 0)
  const totalOfftake = realTimeData.reduce((sum, item) => sum + item.offtake, 0)
  const totalRevenue = realTimeData.reduce((sum, item) => sum + item.revenue, 0)
  const currentStock = totalIntake - totalOfftake

  return (
    <SidebarProvider>
      <EmployeeSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center gap-4 px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions, farmers..."
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Operations Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor daily operations and record milk intake
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <RecordIntakeDialog />
            </div>
          </div>

          {/* Enhanced Horizontal Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Intake Today</CardTitle>
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-4 w-4 text-green-600" />
                  <Droplets className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{totalIntake.toLocaleString()}L</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+12.5%</span> from yesterday
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-100">
                  <div className="h-full bg-blue-600 w-3/4"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Auto Offtake</CardTitle>
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4 text-green-600 animate-pulse" />
                  <ArrowDown className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{totalOfftake.toLocaleString()}L</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">Live tracking</span> • Auto-registered
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-100">
                  <div className="h-full bg-green-600 w-4/5 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
                <Package className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{currentStock.toLocaleString()}L</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-blue-600 font-medium">Available</span> for distribution
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-100">
                  <div className="h-full bg-purple-600 w-2/3"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+18.3%</span> from yesterday
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-100">
                  <div className="h-full bg-yellow-600 w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add a note in the main content that financial access is restricted */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-600" />
              <div>
                <h4 className="font-medium text-yellow-800">Access Notice</h4>
                <p className="text-sm text-yellow-700">
                  Financial integrations and payment settings are restricted to admin users only.
                  Contact your administrator for payment-related queries.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Bar Chart for Milk Volume */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Daily Milk Volume
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                </CardTitle>
                <CardDescription>
                  Intake vs offtake comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    intake: {
                      label: "Manual Intake",
                      color: "hsl(var(--chart-1))",
                    },
                    offtake: {
                      label: "Auto Offtake",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={realTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="time" 
                        stroke="#666"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#666"
                        fontSize={12}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                      />
                      <Legend />
                      <Bar
                        dataKey="intake"
                        fill="hsl(var(--chart-1))"
                        name="Manual Intake"
                        radius={[2, 2, 0, 0]}
                      />
                      <Bar
                        dataKey="offtake"
                        fill="hsl(var(--chart-2))"
                        name="Auto Offtake"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Smooth Curve Chart for Revenue */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Curve</CardTitle>
                <CardDescription>
                  Earnings from automatic offtake transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={realTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="time" 
                        stroke="#666"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#666"
                        fontSize={12}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        cursor={{ stroke: '#ddd', strokeWidth: 1 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={4}
                        dot={false}
                        name="Revenue ($)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Real-Time Automatic Offtakes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Live Automatic Offtakes
                    <Badge variant="secondary" className="animate-pulse">
                      <Activity className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    System-registered offtake transactions in real-time
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Offtake ID</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Volume (L)</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOfftakes.map((offtake) => (
                    <TableRow key={offtake.id}>
                      <TableCell className="font-medium">{offtake.id}</TableCell>
                      <TableCell>{offtake.buyer}</TableCell>
                      <TableCell>{offtake.volume}</TableCell>
                      <TableCell>${offtake.amount}</TableCell>
                      <TableCell>{offtake.time}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={offtake.status === "completed" ? "default" : "secondary"}
                          className={offtake.status === "processing" ? "animate-pulse" : ""}
                        >
                          {offtake.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Activity className="h-3 w-3 mr-1" />
                          {offtake.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  )
}
