"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Users,
  Droplets,
  TrendingUp,
  Package,
  BarChart3,
  Search,
  Download,
  Eye,
  Edit,
  UserPlus,
  FileText,
  Activity,
  Clock,
  CheckCircle,
  LogOut,
  Bell,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

// Sample data for employee dashboard
const operationalStats = {
  totalFarmers: 156,
  activeFarmers: 142,
  pendingRegistrations: 8,
  totalIntake: 4500,
  totalOfftake: 4200,
  currentStock: 3800,
  qualityAlerts: 2,
  dataIntegrityIssues: 0,
}

const farmers = [
  {
    id: "F001",
    name: "John Kamau",
    phone: "+254712345678",
    location: "Kiambu",
    status: "active",
    totalDeliveries: 45,
    lastDelivery: "2024-01-15",
    registrationDate: "2024-01-10",
  },
  {
    id: "F002",
    name: "Mary Wanjiku",
    phone: "+254723456789",
    location: "Nakuru",
    status: "active",
    totalDeliveries: 52,
    lastDelivery: "2024-01-15",
    registrationDate: "2024-01-08",
  },
  {
    id: "F003",
    name: "Peter Mwangi",
    phone: "+254734567890",
    location: "Meru",
    status: "pending",
    totalDeliveries: 0,
    lastDelivery: "N/A",
    registrationDate: "2024-01-14",
  },
  {
    id: "F004",
    name: "Grace Njeri",
    phone: "+254745678901",
    location: "Kiambu",
    status: "active",
    totalDeliveries: 38,
    lastDelivery: "2024-01-14",
    registrationDate: "2024-01-05",
  },
]

const intakeData = [
  { time: "06:00", intake: 450, quality: 4.2, collectors: 3 },
  { time: "08:00", intake: 680, quality: 4.5, collectors: 4 },
  { time: "10:00", intake: 520, quality: 4.1, collectors: 3 },
  { time: "12:00", intake: 750, quality: 4.3, collectors: 5 },
  { time: "14:00", intake: 620, quality: 4.4, collectors: 4 },
  { time: "16:00", intake: 580, quality: 4.2, collectors: 3 },
  { time: "18:00", intake: 490, quality: 4.0, collectors: 2 },
]

const salesData = [
  { buyer: "KCC", volume: 1200, amount: 60000, time: "14:30", status: "completed" },
  { buyer: "Brookside", volume: 800, amount: 40000, time: "13:45", status: "completed" },
  { buyer: "Fresh Dairy", volume: 600, amount: 30000, time: "12:15", status: "processing" },
  { buyer: "Local Market", volume: 400, amount: 20000, time: "11:30", status: "completed" },
]

const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`
  }
  return value.toLocaleString()
}

export default function EmployeeDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddFarmerDialog, setShowAddFarmerDialog] = useState(false)
  const [newFarmerName, setNewFarmerName] = useState("")
  const [newFarmerPhone, setNewFarmerPhone] = useState("")
  const [newFarmerLocation, setNewFarmerLocation] = useState("")
  const [realTimeStats, setRealTimeStats] = useState(operationalStats)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats((prev) => ({
        ...prev,
        totalIntake: prev.totalIntake + Math.floor(Math.random() * 50),
        totalOfftake: prev.totalOfftake + Math.floor(Math.random() * 30),
      }))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    window.location.href = "/login"
  }

  const handleAddFarmer = () => {
    console.log("Adding farmer:", { newFarmerName, newFarmerPhone, newFarmerLocation })
    setShowAddFarmerDialog(false)
    setNewFarmerName("")
    setNewFarmerPhone("")
    setNewFarmerLocation("")
  }

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.phone.includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kiambu Dairy Cooperative</h1>
                <p className="text-sm text-gray-600">Employee Operations</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Operations Management</h1>
            <p className="text-gray-600">Manage farmers, track operations, and ensure data integrity</p>
          </div>
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            <Activity className="h-4 w-4 mr-1" />
            Full Access
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                  <p className="text-3xl font-bold text-blue-600">{realTimeStats.totalFarmers}</p>
                  <p className="text-xs text-green-600 mt-1">{realTimeStats.activeFarmers} active</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Intake</p>
                  <p className="text-3xl font-bold text-green-600">{formatNumber(realTimeStats.totalIntake)}L</p>
                  <p className="text-xs text-green-600 mt-1">Live tracking</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Droplets className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                  <p className="text-3xl font-bold text-purple-600">{formatNumber(realTimeStats.totalOfftake)}L</p>
                  <p className="text-xs text-purple-600 mt-1">Offtake volume</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Stock</p>
                  <p className="text-3xl font-bold text-orange-600">{formatNumber(realTimeStats.currentStock)}L</p>
                  <p className="text-xs text-orange-600 mt-1">Available</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="farmers">Farmer Management</TabsTrigger>
            <TabsTrigger value="operations">Operations Tracking</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="integrity">Data Integrity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Intake Tracking Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    Daily Intake Tracking
                  </CardTitle>
                  <CardDescription>Real-time milk collection monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      intake: {
                        label: "Intake Volume",
                        color: "#3B82F6",
                      },
                      quality: {
                        label: "Quality Score",
                        color: "#10B981",
                      },
                    }}
                    className="h-[350px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={intakeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="time" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="intake" fill="#3B82F6" name="Intake (L)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Quality Monitoring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Quality Monitoring
                  </CardTitle>
                  <CardDescription>Milk quality scores throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      quality: {
                        label: "Quality Score",
                        color: "#10B981",
                      },
                    }}
                    className="h-[350px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={intakeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="time" stroke="#666" fontSize={12} />
                        <YAxis domain={[3.5, 5]} stroke="#666" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="quality"
                          stroke="#10B981"
                          strokeWidth={3}
                          dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                          name="Quality Score"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Sales Transactions
                </CardTitle>
                <CardDescription>Latest milk sales and offtake</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.map((sale, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sale.buyer}</TableCell>
                        <TableCell>{sale.volume}L</TableCell>
                        <TableCell>KSh {sale.amount.toLocaleString()}</TableCell>
                        <TableCell>{sale.time}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              sale.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {sale.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="farmers" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Farmer Management</h3>
                <p className="text-gray-600">Register new farmers and manage existing ones</p>
              </div>
              <Dialog open={showAddFarmerDialog} onOpenChange={setShowAddFarmerDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register Farmer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Register New Farmer</DialogTitle>
                    <DialogDescription>Add a new farmer to the cooperative system</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="farmer-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="farmer-name"
                        value={newFarmerName}
                        onChange={(e) => setNewFarmerName(e.target.value)}
                        className="col-span-3"
                        placeholder="Full name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="farmer-phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="farmer-phone"
                        value={newFarmerPhone}
                        onChange={(e) => setNewFarmerPhone(e.target.value)}
                        className="col-span-3"
                        placeholder="+254..."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="farmer-location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="farmer-location"
                        value={newFarmerLocation}
                        onChange={(e) => setNewFarmerLocation(e.target.value)}
                        className="col-span-3"
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddFarmer}>Register Farmer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Registered Farmers ({farmers.length})</CardTitle>
                <CardDescription>All farmers in the cooperative</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Farmer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Deliveries</TableHead>
                      <TableHead>Last Delivery</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFarmers.map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{farmer.name}</p>
                            <p className="text-sm text-gray-500">{farmer.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{farmer.location}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              farmer.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {farmer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{farmer.totalDeliveries}</TableCell>
                        <TableCell>{farmer.lastDelivery}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
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

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Collection Timeout Alerts</p>
                      <p className="text-2xl font-bold text-orange-600">0</p>
                      <p className="text-xs text-green-600 mt-1">All within 3-hour limit</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Quality Alerts</p>
                      <p className="text-2xl font-bold text-red-600">{realTimeStats.qualityAlerts}</p>
                      <p className="text-xs text-red-600 mt-1">Below standard</p>
                    </div>
                    <Activity className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Data Integrity</p>
                      <p className="text-2xl font-bold text-green-600">{realTimeStats.dataIntegrityIssues}</p>
                      <p className="text-xs text-green-600 mt-1">Issues detected</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Real-Time Collection Monitoring</CardTitle>
                <CardDescription>Track milk collection from farm to cooperative</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Route A Collection Complete</p>
                        <p className="text-xs text-gray-600">Peter Mwangi • 450L collected • 2.5 hours</p>
                        <p className="text-xs text-gray-500">Arrived at cooperative: 08:30</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">On Time</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="h-5 w-5 text-blue-600 animate-pulse" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Route B Collection In Progress</p>
                        <p className="text-xs text-gray-600">Mary Njeri • 280L collected so far • 1.8 hours</p>
                        <p className="text-xs text-gray-500">Expected arrival: 09:15</p>
                      </div>
                    </div>
                    <Badge variant="outline">In Progress</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Route C Collection Starting</p>
                        <p className="text-xs text-gray-600">David Kiprop • Starting collection • 0 hours</p>
                        <p className="text-xs text-gray-500">Expected completion: 10:30</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Starting</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Reports</CardTitle>
                  <CardDescription>Generate daily operational reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Daily Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                  <CardDescription>Weekly performance summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Weekly Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Analysis</CardTitle>
                  <CardDescription>Comprehensive monthly analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Monthly Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Data Integrity Monitoring
                </CardTitle>
                <CardDescription>Monitor data alterations and ensure transparency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-medium text-green-900">System Status: Healthy</p>
                      <p className="text-sm text-green-700">No data integrity issues detected</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Last 24 Hours</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Records Created:</span>
                          <span className="font-medium">47</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Records Modified:</span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unauthorized Access:</span>
                          <span className="font-medium text-green-600">0</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Audit Trail</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Entries:</span>
                          <span className="font-medium">1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Verified Entries:</span>
                          <span className="font-medium text-green-600">1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Integrity Score:</span>
                          <span className="font-medium text-green-600">100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
