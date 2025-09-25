"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Search,
  Download,
  Eye,
  MapPin,
  Calendar,
  LogOut,
  Bell,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for super admin dashboard
const platformStats = {
  totalCooperatives: 47,
  activeCooperatives: 42,
  totalUsers: 1247,
  monthlyRevenue: 2450000,
  totalCommission: 122500,
  growthRate: 23.5,
}

const cooperativeData = [
  {
    id: "COOP001",
    name: "Kiambu Dairy Cooperative",
    location: "Kiambu",
    members: 156,
    status: "active",
    monthlyRevenue: 450000,
    commission: 22500,
    joinDate: "2024-01-15",
  },
  {
    id: "COOP002",
    name: "Nakuru Farmers Union",
    location: "Nakuru",
    members: 203,
    status: "active",
    monthlyRevenue: 680000,
    commission: 34000,
    joinDate: "2024-01-10",
  },
  {
    id: "COOP003",
    name: "Meru Dairy Society",
    location: "Meru",
    members: 89,
    status: "active",
    monthlyRevenue: 320000,
    commission: 16000,
    joinDate: "2024-01-08",
  },
  {
    id: "COOP004",
    name: "Eldoret Milk Producers",
    location: "Eldoret",
    members: 178,
    status: "active",
    monthlyRevenue: 520000,
    commission: 26000,
    joinDate: "2024-01-05",
  },
  {
    id: "COOP005",
    name: "Nyeri Highland Dairy",
    location: "Nyeri",
    members: 134,
    status: "pending",
    monthlyRevenue: 0,
    commission: 0,
    joinDate: "2024-01-20",
  },
]

const revenueData = [
  { month: "Jan", revenue: 1850000, commission: 92500, cooperatives: 35 },
  { month: "Feb", revenue: 2100000, commission: 105000, cooperatives: 38 },
  { month: "Mar", revenue: 2350000, commission: 117500, cooperatives: 41 },
  { month: "Apr", revenue: 2200000, commission: 110000, cooperatives: 43 },
  { month: "May", revenue: 2450000, commission: 122500, cooperatives: 47 },
]

const userDistribution = [
  { name: "Employees", value: 45, color: "#3B82F6" },
  { name: "Collectors", value: 35, color: "#10B981" },
  { name: "Admins", value: 15, color: "#F59E0B" },
  { name: "Super Admins", value: 5, color: "#EF4444" },
]

const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `KSh ${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `KSh ${(value / 1000).toFixed(0)}k`
  }
  return `KSh ${value.toLocaleString()}`
}

export default function SuperAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [realTimeStats, setRealTimeStats] = useState(platformStats)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats((prev) => ({
        ...prev,
        monthlyRevenue: prev.monthlyRevenue + Math.floor(Math.random() * 10000),
        totalCommission: prev.totalCommission + Math.floor(Math.random() * 500),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const filteredCooperatives = cooperativeData.filter(
    (coop) =>
      coop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coop.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleLogout = () => {
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DairySight Platform</h1>
                <p className="text-sm text-gray-600">Super Admin Dashboard</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search cooperatives..."
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
            <h1 className="text-3xl font-bold text-gray-900">Platform Overview</h1>
            <p className="text-gray-600">Monitor platform usage and cooperative performance</p>
          </div>
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            <Activity className="h-4 w-4 mr-1" />
            Live Data
          </Badge>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cooperatives</p>
                  <p className="text-3xl font-bold text-blue-600">{realTimeStats.totalCooperatives}</p>
                  <p className="text-xs text-green-600 mt-1">+5 this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cooperatives</p>
                  <p className="text-3xl font-bold text-green-600">{realTimeStats.activeCooperatives}</p>
                  <p className="text-xs text-green-600 mt-1">
                    {((realTimeStats.activeCooperatives / realTimeStats.totalCooperatives) * 100).toFixed(1)}% active
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-purple-600">{realTimeStats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">+{realTimeStats.growthRate}% growth</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Commission</p>
                  <p className="text-3xl font-bold text-orange-600">{formatCurrency(realTimeStats.totalCommission)}</p>
                  <p className="text-xs text-green-600 mt-1">5% of {formatCurrency(realTimeStats.monthlyRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Platform Overview</TabsTrigger>
            <TabsTrigger value="cooperatives">Cooperatives</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Platform Revenue Growth
                  </CardTitle>
                  <CardDescription>Monthly revenue and commission tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Total Revenue",
                        color: "#3B82F6",
                      },
                      commission: {
                        label: "Our Commission",
                        color: "#10B981",
                      },
                    }}
                    className="h-[350px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="revenue" fill="#3B82F6" name="Total Revenue" />
                        <Bar dataKey="commission" fill="#10B981" name="Our Commission" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* User Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Distribution
                  </CardTitle>
                  <CardDescription>Platform user roles breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      users: {
                        label: "Users",
                        color: "#3B82F6",
                      },
                    }}
                    className="h-[350px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {userDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Platform Activity
                </CardTitle>
                <CardDescription>Latest cooperative registrations and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">New Cooperative Registration</p>
                        <p className="text-xs text-gray-600">Nyeri Highland Dairy joined the platform</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">New</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Commission Payment Received</p>
                        <p className="text-xs text-gray-600">KSh 34,000 from Nakuru Farmers Union</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">New Users Added</p>
                        <p className="text-xs text-gray-600">15 new collectors registered across 3 cooperatives</p>
                        <p className="text-xs text-gray-500">6 hours ago</p>
                      </div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cooperatives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Registered Cooperatives</CardTitle>
                <CardDescription>All cooperatives using the DairySight platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cooperative</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Monthly Revenue</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCooperatives.map((coop) => (
                      <TableRow key={coop.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{coop.name}</p>
                            <p className="text-sm text-gray-500">{coop.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {coop.location}
                          </div>
                        </TableCell>
                        <TableCell>{coop.members}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              coop.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {coop.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(coop.monthlyRevenue)}</TableCell>
                        <TableCell className="text-green-600 font-medium">{formatCurrency(coop.commission)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {coop.joinDate}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cooperative Growth */}
              <Card>
                <CardHeader>
                  <CardTitle>Cooperative Growth</CardTitle>
                  <CardDescription>Monthly cooperative registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      cooperatives: {
                        label: "Cooperatives",
                        color: "#3B82F6",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="cooperatives"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                          name="Cooperatives"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Commission Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Commission Breakdown</CardTitle>
                  <CardDescription>Revenue sharing performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-900">Total Platform Revenue</p>
                        <p className="text-sm text-green-700">All cooperative sales combined</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-green-900">
                          {formatCurrency(realTimeStats.monthlyRevenue)}
                        </p>
                        <p className="text-sm text-green-700">This month</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-900">DairySight Commission</p>
                        <p className="text-sm text-blue-700">5% revenue share</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-blue-900">
                          {formatCurrency(realTimeStats.totalCommission)}
                        </p>
                        <p className="text-sm text-blue-700">Our earnings</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium text-purple-900">Cooperative Earnings</p>
                        <p className="text-sm text-purple-700">95% revenue share</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-purple-900">
                          {formatCurrency(realTimeStats.monthlyRevenue - realTimeStats.totalCommission)}
                        </p>
                        <p className="text-sm text-purple-700">Their earnings</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform-wide settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium">Commission Rate (%)</label>
                      <Input type="number" defaultValue="5" step="0.1" className="mt-1" />
                      <p className="text-xs text-gray-500 mt-1">Current: 5% - Cooperatives keep 95%</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Platform Name</label>
                      <Input defaultValue="DairySight" className="mt-1" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button>Save Settings</Button>
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
