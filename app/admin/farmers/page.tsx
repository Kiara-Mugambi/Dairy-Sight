"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Droplets, CheckCircle, Search } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts"

interface MilkIntake {
  id: string
  farmerName: string
  quantity: number
  quality: string
  date: string
  time: string
  price: number | null
  recordedBy?: string
}

export default function AdminMilkIntakes() {
  const [intakes, setIntakes] = useState<MilkIntake[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // --- Filters ---
  const [farmerFilter, setFarmerFilter] = useState("")
  const [employeeFilter, setEmployeeFilter] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  useEffect(() => {
    loadIntakes()
  }, [])

  const loadIntakes = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/milk-intake")
      if (res.ok) {
        const data = await res.json()
        setIntakes(data.intakes || [])
      }
    } catch (err) {
      console.error("Error fetching intakes:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const getQualityColor = (quality: string | null) => {
    switch (quality) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-yellow-100 text-yellow-800"
      case "C":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // --- Apply Filters ---
  const filteredIntakes = intakes.filter((intake) => {
    const matchesFarmer = farmerFilter ? intake.farmerName.toLowerCase().includes(farmerFilter.toLowerCase()) : true
    const matchesEmployee = employeeFilter ? (intake.recordedBy || "").toLowerCase().includes(employeeFilter.toLowerCase()) : true
    const matchesDateFrom = dateFrom ? intake.date >= dateFrom : true
    const matchesDateTo = dateTo ? intake.date <= dateTo : true
    return matchesFarmer && matchesEmployee && matchesDateFrom && matchesDateTo
  })

  // --- 📊 Analytics prep ---
  const totalsByDate = filteredIntakes.reduce((acc: any, intake) => {
    acc[intake.date] = (acc[intake.date] || 0) + intake.quantity
    return acc
  }, {})

  const totalsByFarmer = filteredIntakes.reduce((acc: any, intake) => {
    acc[intake.farmerName] = (acc[intake.farmerName] || 0) + intake.quantity
    return acc
  }, {})

  const chartDataByDate = Object.keys(totalsByDate).map((date) => ({
    date,
    quantity: totalsByDate[date],
  }))

  const chartDataByFarmer = Object.keys(totalsByFarmer).map((farmer) => ({
    farmer,
    quantity: totalsByFarmer[farmer],
  }))

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading milk intakes...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Droplets className="h-7 w-7 text-blue-600" />
          Milk Intakes (Admin View)
        </h1>

        {/* --- Filters --- */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine the intakes data</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Filter by farmer..."
              value={farmerFilter}
              onChange={(e) => setFarmerFilter(e.target.value)}
            />
            <Input
              placeholder="Filter by employee..."
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
            />
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </CardContent>
        </Card>

        {/* --- Analytics Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Daily Totals</CardTitle>
              <CardDescription>Total litres collected each day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartDataByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quantity" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Farmers</CardTitle>
              <CardDescription>Litres contributed per farmer</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartDataByFarmer}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="farmer" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* --- Intake List --- */}
        <Card>
          <CardHeader>
            <CardTitle>All Recorded Intakes</CardTitle>
            <CardDescription>Filtered results</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredIntakes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Droplets className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No intakes found with current filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredIntakes.map((intake) => (
                  <div
                    key={intake.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">{intake.farmerName}</p>
                        <p className="text-sm text-gray-600">
                          {intake.date} at {intake.time}
                          {intake.recordedBy ? ` • Recorded by ${intake.recordedBy}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge className={getQualityColor(intake.quality)}>Grade {intake.quality}</Badge>
                        <span className="font-bold text-lg">{intake.quantity}L</span>
                      </div>
                      <p className="text-sm text-gray-600">KSh {(intake.price || 0).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
