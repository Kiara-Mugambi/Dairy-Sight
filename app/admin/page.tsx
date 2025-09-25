"use client"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Shield,
  Eye,
  UserPlus,
  Search,
  Download,
  LogOut,
  Bell,
  BarChart3,
  Droplets,
  TrendingUp,
  Package,
  Edit,
  Trash2,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

// Sample data for admin dashboard
const cooperativeStats = {
  totalFarmers: 156,
  activeFarmers: 142,
  totalEmployees: 8,
  totalCollectors: 12,
  monthlyIntake: 45000,
  monthlyOfftake: 42000,
  currentStock: 3000,
  monthlyRevenue: 2100000,
}

const employees = [
  {
    id: "EMP001",
    name: "James Ochieng",
    role: "Operations Manager",
    email: "james@dairy.com",
    status: "active",
    lastLogin: "2024-01-15 09:30",
    department: "Operations",
  },
  {
    id: "EMP002",
    name: "Alice Mutua",
    role: "Data Analyst",
    email: "alice@dairy.com",
    status: "active",
    lastLogin: "2024-01-15 08:15",
    department: "Analytics",
  },
  {
    id: "EMP003",
    name: "Robert Kiprotich",
    role: "Quality Controller",
    email: "robert@dairy.com",
    status: "active",
    lastLogin: "2024-01-14 16:45",
    department: "Quality",
  },
  {
    id: "EMP004",
    name: "Grace Wanjiku",
    role: "Records Officer",
    email: "grace@dairy.com",
    status: "inactive",
    lastLogin: "2024-01-12 14:20",
    department: "Administration",
  },
]

const collectors = [
  {
    id: "COL001",
    name: "Peter Mwangi",
    phone: "+254712345678",
    route: "Route A",
    status: "active",
    dailyCollection: 450,
    lastCollection: "2024-01-15 07:30",
  },
  {
    id: "COL002",
    name: "Mary Njeri",
    phone: "+254723456789",
    route: "Route B",
    status: "active",
    dailyCollection: 380,
    lastCollection: "2024-01-15 07:45",
  },
  {
    id: "COL003",
    name: "David Kiprop",
    phone: "+254734567890",
    route: "Route C",
    status: "active",
    dailyCollection: 520,
    lastCollection: "2024-01-15 08:00",
  },
  {
    id: "COL004",
    name: "Sarah Wambui",
    phone: "+254745678901",
    route: "Route D",
    status: "inactive",
    dailyCollection: 0,
    lastCollection: "2024-01-13 07:15",
  },
]

const operationsData = [
  { time: "06:00", intake: 450, offtake: 0, stock: 3450 },
  { time: "08:00", intake: 680, offtake: 200, stock: 3930 },
  { time: "10:00", intake: 520, offtake: 450, stock: 4000 },
  { time: "12:00", intake: 750, offtake: 680, stock: 4070 },
  { time: "14:00", intake: 620, offtake: 520, stock: 4170 },
  { time: "16:00", intake: 580, offtake: 750, stock: 4000 },
  { time: "18:00", intake: 490, offtake: 620, stock: 3870 },
]

const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`
  }
  return value.toLocaleString()
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false)
  const [newEmployeeName, setNewEmployeeName] = useState("")
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("")
  const [newEmployeeRole, setNewEmployeeRole] = useState("")
  const [newEmployeeDepartment, setNewEmployeeDepartment] = useState("")

  const handleLogout = () => {
    window.location.href = "/login"
  }

  const handleAddEmployee = () => {
    console.log("Adding employee:", { newEmployeeName, newEmployeeEmail, newEmployeeRole, newEmployeeDepartment })
    setShowAddEmployeeDialog(false)
    setNewEmployeeName("")
    setNewEmployeeEmail("")
    setNewEmployeeRole("")
    setNewEmployeeDepartment("")
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCollectors = collectors.filter(
    (col) =>
      col.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      col.route.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kiambu Dairy Cooperative</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
            <p className="text-gray-600">Read-only operations monitoring and employee management</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
            <Eye className="h-4 w-4 mr-1" />
            Read-Only Access
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                  <p className="text-3xl font-bold text-blue-600">{cooperativeStats.totalFarmers}</p>
                  <p className="text-xs text-green-600 mt-1">{cooperativeStats.activeFarmers} active</p>
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
                  <p className="text-sm font-medium text-gray-600">Monthly Intake</p>
                  <p className="text-3xl font-bold text-green-600">{formatNumber(cooperativeStats.monthlyIntake)}L</p>
                  <p className="text-xs text-green-600 mt-1">This month</p>
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
                  <p className="text-sm font-medium text-gray-600">Current Stock</p>
                  <p className="text-3xl font-bold text-purple-600">{formatNumber(cooperativeStats.currentStock)}L</p>
                  <p className="text-xs text-purple-600 mt-1">Available</p>
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
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-orange-600">
                    KSh {formatNumber(cooperativeStats.monthlyRevenue)}
                  </p>
                  <p className="text-xs text-green-600 mt-1">+15.2% growth</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Operations Overview</TabsTrigger>
            <TabsTrigger value="employees">Employee Management</TabsTrigger>
            <TabsTrigger value="collectors">Collector Management</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Operations Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Daily Operations (Read-Only)
                  </CardTitle>
                  <CardDescription>Intake vs offtake monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      intake: {
                        label: "Intake",
                        color: "#3B82F6",
                      },
                      offtake: {
                        label: "Offtake",
                        color: "#10B981",
                      },
                    }}
                    className="h-[350px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={operationsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="time" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="intake" fill="#3B82F6" name="Intake (L)" />
                        <Bar dataKey="offtake" fill="#10B981" name="Offtake (L)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Stock Level Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Stock Level Monitoring
                  </CardTitle>
                  <CardDescription>Real-time inventory tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      stock: {
                        label: "Stock Level",
                        color: "#8B5CF6",
                      },
                    }}
                    className="h-[350px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={operationsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="time" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="stock"
                          stroke="#8B5CF6"
                          strokeWidth={3}
                          dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                          name="Stock Level (L)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Read-Only Notice */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-blue-900">Read-Only Access</h3>
                    <p className="text-sm text-blue-800 mt-1">
                      As an admin, you have read-only access to operations data. You can monitor all activities but
                      cannot modify operational records. Contact employees for data entry and modifications.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Employee Management</h3>
                <p className="text-gray-600">Manage cooperative staff and their access</p>
              </div>
              <Dialog open={showAddEmployeeDialog} onOpenChange={setShowAddEmployeeDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>Add a new employee to the cooperative system</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newEmployeeName}
                        onChange={(e) => setNewEmployeeName(e.target.value)}
                        className="col-span-3"
                        placeholder="Full name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newEmployeeEmail}
                        onChange={(e) => setNewEmployeeEmail(e.target.value)}
                        className="col-span-3"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select value={newEmployeeRole} onValueChange={setNewEmployeeRole}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                          <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                          <SelectItem value="Quality Controller">Quality Controller</SelectItem>
                          <SelectItem value="Records Officer">Records Officer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="department" className="text-right">
                        Department
                      </Label>
                      <Select value={newEmployeeDepartment} onValueChange={setNewEmployeeDepartment}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Analytics">Analytics</SelectItem>
                          <SelectItem value="Quality">Quality</SelectItem>
                          <SelectItem value="Administration">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddEmployee}>Add Employee</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Current Employees ({employees.length})</CardTitle>
                <CardDescription>All cooperative staff members</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-500">{employee.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              employee.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{employee.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="collectors" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Collector Management</h3>
                <p className="text-gray-600">Monitor field collectors and their performance</p>
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Collector
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Collectors ({collectors.filter((c) => c.status === "active").length})</CardTitle>
                <CardDescription>Field milk collection staff</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Collector</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Daily Collection</TableHead>
                      <TableHead>Last Collection</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCollectors.map((collector) => (
                      <TableRow key={collector.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{collector.name}</p>
                            <p className="text-sm text-gray-500">{collector.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{collector.route}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              collector.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {collector.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{collector.dailyCollection}L</TableCell>
                        <TableCell className="text-sm">{collector.lastCollection}</TableCell>
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

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure cooperative settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Cooperative Name</Label>
                      <Input defaultValue="Kiambu Dairy Cooperative" className="mt-1" />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input defaultValue="Kiambu, Kenya" className="mt-1" />
                    </div>
                    <div>
                      <Label>Contact Email</Label>
                      <Input defaultValue="admin@kiambudairy.co.ke" className="mt-1" />
                    </div>
                    <div>
                      <Label>Contact Phone</Label>
                      <Input defaultValue="+254700123456" className="mt-1" />
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
