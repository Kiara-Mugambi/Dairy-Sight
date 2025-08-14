"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Phone, MapPin, Mail, Calendar, CheckCircle, AlertCircle } from "lucide-react"

interface Farmer {
  id: string
  name: string
  phone: string
  email: string
  location: string
  status: "pending" | "active" | "rejected"
  registrationDate: string
  totalDeliveries?: number
}

export default function EmployeeFarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.phone.includes(searchTerm)
    return matchesSearch
  })

  const activeFarmers = filteredFarmers.filter((f) => f.status === "active")
  const pendingFarmers = filteredFarmers.filter((f) => f.status === "pending")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading farmers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmers Directory</h1>
          <p className="text-gray-600">View and search all farmers in your cooperative</p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search farmers by name, location, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                  <p className="text-3xl font-bold text-gray-900">{filteredFarmers.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Farmers</p>
                  <p className="text-3xl font-bold text-gray-900">{activeFarmers.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                  <p className="text-3xl font-bold text-gray-900">{pendingFarmers.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Farmers List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Farmers ({filteredFarmers.length})
            </CardTitle>
            <CardDescription>Complete list of farmers in your cooperative</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFarmers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No farmers found</p>
                  <p className="text-sm">Try adjusting your search</p>
                </div>
              ) : (
                filteredFarmers.map((farmer) => (
                  <div
                    key={farmer.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      farmer.status === "pending"
                        ? "bg-yellow-50 border-yellow-200"
                        : farmer.status === "active"
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {farmer.status === "pending" ? (
                          <AlertCircle className="h-8 w-8 text-yellow-600" />
                        ) : farmer.status === "active" ? (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : (
                          <Users className="h-8 w-8 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{farmer.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {farmer.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {farmer.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {farmer.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {farmer.registrationDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(farmer.status)}>{farmer.status}</Badge>
                      {farmer.totalDeliveries !== undefined && (
                        <Badge variant="outline">{farmer.totalDeliveries} deliveries</Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
