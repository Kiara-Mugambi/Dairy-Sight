"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import { approveFarmer, rejectFarmer } from "@/app/actions/farmer-actions"
import { Users, CheckCircle, XCircle, Search, Phone, MapPin, Mail, Calendar, AlertCircle } from "lucide-react"

interface Farmer {
  id: string
  name: string
  phone: string
  email: string
  location: string
  status: "pending" | "active" | "rejected"
  registrationDate: string
}

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

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
      toast({
        title: "Error",
        description: "Failed to load farmers",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproveFarmer = async (farmerId: string, farmerName: string) => {
    try {
      const result = await approveFarmer(farmerId)
      if (result.success) {
        toast({
          title: "Farmer Approved",
          description: `${farmerName} has been approved successfully`,
        })

        // Update local state immediately
        setFarmers((prevFarmers) =>
          prevFarmers.map((farmer) => (farmer.id === farmerId ? { ...farmer, status: "active" as const } : farmer)),
        )
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to approve farmer",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error approving farmer:", error)
      toast({
        title: "Error",
        description: "Failed to approve farmer",
        variant: "destructive",
      })
    }
  }

  const handleRejectFarmer = async (farmerId: string, farmerName: string) => {
    try {
      const result = await rejectFarmer(farmerId)
      if (result.success) {
        toast({
          title: "Farmer Rejected",
          description: `${farmerName} has been rejected`,
          variant: "destructive",
        })

        // Update local state immediately
        setFarmers((prevFarmers) =>
          prevFarmers.map((farmer) => (farmer.id === farmerId ? { ...farmer, status: "rejected" as const } : farmer)),
        )
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to reject farmer",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error rejecting farmer:", error)
      toast({
        title: "Error",
        description: "Failed to reject farmer",
        variant: "destructive",
      })
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
    const matchesStatus = statusFilter === "all" || farmer.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
          <h1 className="text-3xl font-bold text-gray-900">Farmer Management</h1>
          <p className="text-gray-600">Manage all farmers in your cooperative</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search farmers by name, location, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  size="sm"
                >
                  All ({farmers.length})
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  onClick={() => setStatusFilter("pending")}
                  size="sm"
                >
                  Pending ({farmers.filter((f) => f.status === "pending").length})
                </Button>
                <Button
                  variant={statusFilter === "active" ? "default" : "outline"}
                  onClick={() => setStatusFilter("active")}
                  size="sm"
                >
                  Active ({farmers.filter((f) => f.status === "active").length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Farmers List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Farmers ({filteredFarmers.length})
            </CardTitle>
            <CardDescription>
              {statusFilter === "all" ? "All farmers" : `${statusFilter} farmers`} in your cooperative
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFarmers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No farmers found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
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
                          <XCircle className="h-8 w-8 text-red-600" />
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
                      {farmer.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveFarmer(farmer.id, farmer.name)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectFarmer(farmer.id, farmer.name)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
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
