"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast"
import {
  Users,
  Droplets,
  TrendingUp,
  DollarSign,
  Activity,
  BarChart3,
  Search,
  Download,
  Plus,
  Package,
  FileText,
  Settings,
  LogOut,
  Bell,
} from "lucide-react"
import Link from "next/link"

interface MilkIntake {
  id: string
  farmerId: string
  farmerName: string
  volume: number
  quality: "A" | "B" | "C"
  pricePerLiter: number
  totalAmount: number
  timestamp: string
  recordedBy: string
  status: "recorded" | "processed" | "paid"
}

interface Farmer {
  id: string
  firstName: string
  lastName: string
  phone: string
  location: string
  county: string
  status: "active" | "pending" | "approved"
}

interface DashboardStats {
  totalIntake: number
  autoOfftake: number
  currentStock: number
  todayRevenue: number
  activeFarmers: number
  todayTransactions: number
}

const DEFAULT_STATS: DashboardStats = {
  totalIntake: 4090,
  autoOfftake: 3601,
  currentStock: 489,
  todayRevenue: 7244,
  activeFarmers: 156,
  todayTransactions: 24,
}

const DEFAULT_FARMERS: Farmer[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Kamau",
    phone: "+254712345678",
    location: "Kiambu",
    county: "Kiambu",
    status: "active",
  },
  {
    id: "2",
    firstName: "Mary",
    lastName: "Wanjiku",
    phone: "+254723456789",
    location: "Thika",
    county: "Kiambu",
    status: "active",
  },
  {
    id: "3",
    firstName: "Peter",
    lastName: "Mwangi",
    phone: "+254734567890",
    location: "Ruiru",
    county: "Kiambu",
    status: "active",
  },
]

const DEFAULT_INTAKES: MilkIntake[] = [
  {
    id: "1",
    farmerId: "1",
    farmerName: "John Kamau",
    volume: 25.5,
    quality: "A",
    pricePerLiter: 50,
    totalAmount: 1275,
    timestamp: new Date().toISOString(),
    recordedBy: "James Ochieng",
    status: "recorded",
  },
]

// Helper functions for safe number formatting
const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) return "0"
  return value.toLocaleString()
}

const formatDecimal = (value: number | undefined | null, decimals = 2): string => {
  if (value === undefined || value === null || isNaN(value)) return "0.00"
  return value.toFixed(decimals)
}

// Format revenue in k format
const formatRevenue = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) return "0"
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toString()
}

export default function EmployeeDashboard() {
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS)
  const [farmers, setFarmers] = useState<Farmer[]>(DEFAULT_FARMERS)
  const [intakes, setIntakes] = useState<MilkIntake[]>(DEFAULT_INTAKES)
  const [isLoading, setIsLoading] = useState(true)
  const [showIntakeForm, setShowIntakeForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFarmerId, setSelectedFarmerId] = useState("")
  const [volume, setVolume] = useState("")
  const [quality, setQuality] = useState<"A" | "B" | "C">("A")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadDashboardData()

    // Simulate live auto offtake updates
    const interval = setInterval(() => {
      simulateAutoOfftake()
    }, 20000) // Every 20 seconds

    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      // In a real app, these would be API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set default data
      setStats(DEFAULT_STATS)
      setFarmers(DEFAULT_FARMERS)
      setIntakes(DEFAULT_INTAKES)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Using default values.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const simulateAutoOfftake = () => {
    const offtakeAmount = Math.floor(Math.random() * 100) + 50 // 50-150L
    const buyerNames = ["KCC", "Brookside", "New KCC", "Githunguri Dairy"]
    const buyer = buyerNames[Math.floor(Math.random() * buyerNames.length)]

    setStats((prev) => ({
      ...prev,
      autoOfftake: prev.autoOfftake + offtakeAmount,
      currentStock: Math.max(0, prev.currentStock - offtakeAmount),
      todayRevenue: prev.todayRevenue + offtakeAmount * 52, // KSh 52 per liter
    }))

    toast({
      title: "Auto Offtake Completed",
      description: `${offtakeAmount}L sold to ${buyer} - KSh ${(offtakeAmount * 52).toLocaleString()}`,
    })
  }

  const handleRecordIntake = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFarmerId || !volume) {
      toast({
        title: "Validation Error",
        description: "Please select a farmer and enter volume",
        variant: "destructive",
      })
      return
    }

    const volumeNum = Number.parseFloat(volume)
    if (isNaN(volumeNum) || volumeNum <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid volume",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const selectedFarmer = farmers.find((f) => f.id === selectedFarmerId)
      if (!selectedFarmer) {
        throw new Error("Farmer not found")
      }

      const pricePerLiter = quality === "A" ? 50 : quality === "B" ? 45 : 40
      const totalAmount = volumeNum * pricePerLiter

      const newIntake: MilkIntake = {
        id: Date.now().toString(),
        farmerId: selectedFarmerId,
        farmerName: `${selectedFarmer.firstName} ${selectedFarmer.lastName}`,
        volume: volumeNum,
        quality,
        pricePerLiter,
        totalAmount,
        timestamp: new Date().toISOString(),
        recordedBy: "James Ochieng",
        status: "recorded",
      }

      // Update local state
      setIntakes((prev) => [newIntake, ...prev])
      setStats((prev) => ({
        ...prev,
        totalIntake: prev.totalIntake + volumeNum,
        currentStock: prev.currentStock + volumeNum,
        todayRevenue: prev.todayRevenue + totalAmount,
        todayTransactions: prev.todayTransactions + 1,
      }))

      // Reset form
      setSelectedFarmerId("")
      setVolume("")
      setQuality("A")
      setShowIntakeForm(false)

      toast({
        title: "Success!",
        description: `Recorded ${volumeNum}L from ${selectedFarmer.firstName} ${selectedFarmer.lastName}`,
      })
    } catch (error) {
      console.error("Error recording intake:", error)
      toast({
        title: "Error",
        description: "Failed to record milk intake",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    window.location.href = "/login"
  }

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.phone.includes(searchQuery) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Chart data
  const chartData = [
    { time: "06:00", intake: 450, offtake: 0 },
    { time: "08:00", intake: 680, offtake: 200 },
    { time: "10:00", intake: 520, offtake: 450 },
    { time: "12:00", intake: 750, offtake: 680 },
    { time: "14:00", intake: 620, offtake: 520 },
    { time: "16:00", intake: 580, offtake: 750 },
    { time: "18:00", intake: 490, offtake: 620 },
  ]

  const revenueData = [
    { time: "06:00", revenue: 0 },
    { time: "08:00", revenue: 1200 },
    { time: "10:00", revenue: 2800 },
    { time: "12:00", revenue: 4200 },
    { time: "14:00", revenue: 5100 },
    { time: "16:00", revenue: 6300 },
    { time: "18:00", revenue: 7244 },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading operations dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">DairySight</h1>
              <p className="text-xs text-gray-600">Employee Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Dashboard</p>

            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
              <BarChart3 className="h-4 w-4" />
              Overview
            </button>

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">System</p>

            <Link
              href="/admin"
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              Admin Panel
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">JO</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">James Ochieng</p>
              <p className="text-xs text-gray-600">Operations Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Operations Dashboard</h1>
              <p className="text-gray-600">Monitor daily operations and record milk intake</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions, farmers..."
                  className="pl-10 w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={() => setShowIntakeForm(!showIntakeForm)}>
                <Plus className="h-4 w-4 mr-2" />
                Record Intake
              </Button>
              <Badge variant="outline" className="px-3 py-1">
                Today
              </Badge>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation */}
        <div className="bg-white border-b px-6 py-3">
          <div className="flex items-center gap-6">
            <Link
              href="/employee/intake"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              Milk Intake
            </Link>
            <Link
              href="/employee/farmers"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Users className="h-4 w-4" />
              Farmers
            </Link>
            <Link
              href="/employee/inventory"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Package className="h-4 w-4" />
              Inventory
            </Link>
            <Link
              href="/employee/offtake"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              Offtake
            </Link>
            <Link
              href="/employee/reports"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FileText className="h-4 w-4" />
              Daily Reports
            </Link>
            <Link
              href="/employee/analytics"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Access Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-orange-900">Access Notice</h3>
                <p className="text-sm text-orange-800 mt-1">
                  Financial integrations and payment settings are restricted to admin users only. Contact your
                  administrator for payment-related queries.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Intake Today</p>
                    <p className="text-3xl font-bold text-blue-600">{formatNumber(stats.totalIntake)}L</p>
                    <p className="text-xs text-green-600 mt-1">+12.5% from yesterday</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Auto Offtake</p>
                    <p className="text-3xl font-bold text-green-600">{formatNumber(stats.autoOfftake)}L</p>
                    <p className="text-xs text-blue-600 mt-1">Live tracking • Auto-registered</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Stock</p>
                    <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.currentStock)}L</p>
                    <p className="text-xs text-purple-600 mt-1">Available for distribution</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue Today</p>
                    <p className="text-3xl font-bold text-orange-600">KSh {formatRevenue(stats.todayRevenue)}</p>
                    <p className="text-xs text-green-600 mt-1">+18.3% from yesterday</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Record Intake Form */}
          {showIntakeForm && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  Record Milk Intake
                </CardTitle>
                <CardDescription>Record new milk delivery from farmer</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRecordIntake} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="farmer">Select Farmer</Label>
                    <Select value={selectedFarmerId} onValueChange={setSelectedFarmerId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose farmer" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredFarmers.map((farmer) => (
                          <SelectItem key={farmer.id} value={farmer.id}>
                            {farmer.firstName} {farmer.lastName} - {farmer.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="volume">Volume (Liters)</Label>
                    <Input
                      id="volume"
                      type="number"
                      step="0.1"
                      min="0"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      placeholder="Enter volume"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quality">Quality Grade</Label>
                    <Select value={quality} onValueChange={(value: "A" | "B" | "C") => setQuality(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Grade A (KSh 50/L)</SelectItem>
                        <SelectItem value="B">Grade B (KSh 45/L)</SelectItem>
                        <SelectItem value="C">Grade C (KSh 40/L)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? "Recording..." : "Record Intake"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowIntakeForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Daily Milk Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Daily Milk Volume
              </CardTitle>
              <CardDescription>Intake vs offtake comparison (Liters)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="flex items-end justify-between gap-2 h-64 px-4 border-b border-gray-200">
                  {chartData.map((data, index) => {
                    const maxValue = Math.max(...chartData.map((d) => Math.max(d.intake, d.offtake)))
                    const intakeHeight = (data.intake / maxValue) * 100
                    const offtakeHeight = (data.offtake / maxValue) * 100

                    return (
                      <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        <div className="flex items-end gap-1 h-48 w-full justify-center">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-6 bg-blue-600 rounded-t transition-all duration-300 hover:bg-blue-700"
                              style={{ height: `${intakeHeight}%`, minHeight: "4px" }}
                              title={`Intake: ${data.intake}L`}
                            />
                            <span className="text-xs text-blue-600 mt-1">{data.intake}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div
                              className="w-6 bg-green-600 rounded-t transition-all duration-300 hover:bg-green-700"
                              style={{ height: `${offtakeHeight}%`, minHeight: "4px" }}
                              title={`Offtake: ${data.offtake}L`}
                            />
                            <span className="text-xs text-green-600 mt-1">{data.offtake}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600 font-medium">{data.time}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    <span>Intake</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded"></div>
                    <span>Offtake</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simplified Revenue Chart - No Commission Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Daily Sales Revenue
              </CardTitle>
              <CardDescription>Total sales income from milk transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 relative">
                <svg className="w-full h-full" viewBox="0 0 400 240">
                  <defs>
                    <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[0, 60, 120, 180, 240].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#E5E7EB" strokeWidth="1" />
                  ))}

                  {/* Revenue curve */}
                  <path
                    d={`M 0 240 ${revenueData
                      .map((point, index) => {
                        const x = (index / (revenueData.length - 1)) * 400
                        const y = 240 - (point.revenue / 8000) * 240
                        return `L ${x} ${y}`
                      })
                      .join(" ")} L 400 240 Z`}
                    fill="url(#revenueGradient)"
                  />

                  <path
                    d={`M ${revenueData
                      .map((point, index) => {
                        const x = (index / (revenueData.length - 1)) * 400
                        const y = 240 - (point.revenue / 8000) * 240
                        return `${index === 0 ? "M" : "L"} ${x} ${y}`
                      })
                      .join(" ")}`}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />

                  {/* Data points */}
                  {revenueData.map((point, index) => {
                    const x = (index / (revenueData.length - 1)) * 400
                    const y = 240 - (point.revenue / 8000) * 240
                    return (
                      <circle key={index} cx={x} cy={y} r="4" fill="#3B82F6" className="hover:r-6 transition-all">
                        <title>{`${point.time}: KSh ${formatRevenue(point.revenue)}`}</title>
                      </circle>
                    )
                  })}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  {revenueData.map((point) => (
                    <span key={point.time}>{point.time}</span>
                  ))}
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Revenue shown represents total sales income. Farmer payments are processed
                  automatically based on milk deliveries and quality grades.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Activity Feed
                <Badge variant="outline" className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                  Live
                </Badge>
              </CardTitle>
              <CardDescription>Real-time updates from the cooperative</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {intakes.slice(0, 5).map((intake) => (
                  <div key={intake.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{intake.farmerName}</p>
                        <p className="text-xs text-gray-600">
                          {formatDecimal(intake.volume, 1)}L • Grade {intake.quality} • Recorded by {intake.recordedBy}
                        </p>
                        <p className="text-xs text-gray-500">{new Date(intake.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">KSh {formatRevenue(intake.totalAmount)}</p>
                      <Badge className="text-xs bg-green-100 text-green-800">{intake.status}</Badge>
                    </div>
                  </div>
                ))}

                {intakes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity</p>
                    <p className="text-sm">Milk intake records will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
