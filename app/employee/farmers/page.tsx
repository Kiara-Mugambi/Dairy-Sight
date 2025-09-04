"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Droplets, TrendingUp, CheckCircle, AlertCircle, Calendar } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface Farmer {
  id: string
  name: string
  phone: string
  email: string
  location: string
  status: "pending" | "active" | "rejected"
  registrationDate: string
  totalDeliveries?: number
  lastDelivery?: {
    litres: number
    time: string
    quality: string
  }
}

export default function EmployeeDashboard() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Mock milk intake trend data
  const [milkTrend, setMilkTrend] = useState([
    { day: "Mon", litres: 850 },
    { day: "Tue", litres: 920 },
    { day: "Wed", litres: 780 },
    { day: "Thu", litres: 1100 },
    { day: "Fri", litres: 1020 },
    { day: "Sat", litres: 980 },
    { day: "Sun", litres: 1150 },
  ])

  useEffect(() => {
    loadFarmers()
  }, [])

  const loadFarmers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/farmers")
      if (response.ok) {
        const data = await response.json()
        setFarmers(data.farmers || [])
      }
    } catch (error) {
      console.error("Error loading farmers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredFarmers = farmers.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.phone.includes(searchTerm)
  )

  const activeFarmers = filteredFarmers.filter((f) => f.status === "active")
  const pendingFarmers = filteredFarmers.filter((f) => f.status === "pending")

  // Mock stats
  const totalMilk = milkTrend.reduce((sum, d) => sum + d.litres, 0)
  const avgQuality = 4.2

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Droplets className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="text-gray-600">Real-time milk collection and farmer insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Milk Collected (This Week)</p>
                <p className="text-3xl font-bold text-gray-900">{totalMilk.toLocaleString()} L</p>
              </div>
              <Droplets className="h-8 w-8 text-blue-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Farmers</p>
                <p className="text-3xl font-bold text-gray-900">{activeFarmers.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Quality Score</p>
                <p className="text-3xl font-bold text-gray-900">{avgQuality}/5.0</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Milk Intake Trend</CardTitle>
              <CardDescription>Litres collected this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={milkTrend}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="litres" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Farmer Contribution</CardTitle>
              <CardDescription>Share of total milk collected</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={activeFarmers} dataKey="totalDeliveries" nameKey="name" outerRadius={100} label>
                    {activeFarmers.map((_, i) => (
                      <Cell key={i} fill={["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][i % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Deliveries Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
            <CardDescription>Latest farmer milk submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeFarmers.slice(0, 5).map((farmer) => (
                <div key={farmer.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{farmer.name}</p>
                    <p className="text-sm text-gray-600">{farmer.lastDelivery?.time || "Today"} • {farmer.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">{farmer.lastDelivery?.litres || 0} L</p>
                    <Badge>{farmer.lastDelivery?.quality || "Grade A"}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
