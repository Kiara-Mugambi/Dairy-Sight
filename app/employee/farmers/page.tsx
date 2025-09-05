"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Plus, Trash2, MapPin, CheckCircle2, Ban } from "lucide-react"

interface Farmer {
  id: string
  firstName: string
  lastName: string
  phone: string
  county: string
  deliveries: number
  status: "active" | "pending" | "inactive"
}

export default function FarmerDashboard() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newFarmer, setNewFarmer] = useState({ firstName: "", lastName: "", phone: "", county: "" })

  useEffect(() => {
    loadFarmers()
  }, [])

  // Mock / fallback data
  const loadFarmers = async () => {
    try {
      const response = await fetch("/api/farmers")
      if (response.ok) {
        const data = await response.json()
        setFarmers(data)
      } else {
        fallbackData()
      }
    } catch (error) {
      console.error("Error loading farmers:", error)
      fallbackData()
    }
  }

  const fallbackData = () => {
    setFarmers([
      { id: "1", firstName: "Mary", lastName: "Wanjiku", phone: "0712345678", county: "Kiambu", deliveries: 120, status: "active" },
      { id: "2", firstName: "James", lastName: "Otieno", phone: "0723456789", county: "Kisumu", deliveries: 45, status: "pending" },
      { id: "3", firstName: "Peter", lastName: "Mwangi", phone: "0734567890", county: "Nyeri", deliveries: 78, status: "inactive" },
    ])
  }

  // Add new farmer
  const addFarmer = () => {
    if (!newFarmer.firstName || !newFarmer.lastName || !newFarmer.phone || !newFarmer.county) return
    const newEntry: Farmer = {
      id: Date.now().toString(),
      firstName: newFarmer.firstName,
      lastName: newFarmer.lastName,
      phone: newFarmer.phone,
      county: newFarmer.county,
      deliveries: 0,
      status: "pending",
    }
    setFarmers([...farmers, newEntry])
    setNewFarmer({ firstName: "", lastName: "", phone: "", county: "" })
  }

  // Remove farmer
  const removeFarmer = (id: string) => {
    setFarmers(farmers.filter((f) => f.id !== id))
  }

  // Status update
  const updateStatus = (id: string, newStatus: Farmer["status"]) => {
    setFarmers(farmers.map((f) => (f.id === id ? { ...f, status: newStatus } : f)))
  }

  const filteredFarmers = farmers.filter(
    (f) =>
      `${f.firstName} ${f.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.phone.includes(searchTerm) ||
      f.county.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCount = farmers.filter((f) => f.status === "active").length
  const pendingCount = farmers.filter((f) => f.status === "pending").length
  const inactiveCount = farmers.filter((f) => f.status === "inactive").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farmer Management</h1>
            <p className="text-gray-600">Manage registered farmers in your cooperative</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Farmers</CardTitle>
              <CardDescription>All registered farmers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{farmers.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active</CardTitle>
              <CardDescription>Currently supplying</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
              <CardDescription>Awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inactive</CardTitle>
              <CardDescription>Suspended or left</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">{inactiveCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Farmer Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add Farmer</CardTitle>
            <CardDescription>Register a new farmer</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="First Name"
              value={newFarmer.firstName}
              onChange={(e) => setNewFarmer({ ...newFarmer, firstName: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              value={newFarmer.lastName}
              onChange={(e) => setNewFarmer({ ...newFarmer, lastName: e.target.value })}
            />
            <Input
              placeholder="Phone Number"
              value={newFarmer.phone}
              onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
            />
            <Input
              placeholder="County"
              value={newFarmer.county}
              onChange={(e) => setNewFarmer({ ...newFarmer, county: e.target.value })}
            />
            <Button onClick={addFarmer}>
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </CardContent>
        </Card>

        {/* Search + Farmer List */}
        <div className="flex items-center mb-4">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <Input
            placeholder="Search farmers by name, phone, or county..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Farmer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <Card key={farmer.id}>
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {farmer.firstName} {farmer.lastName}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {farmer.county}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    farmer.status === "active"
                      ? "default"
                      : farmer.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {farmer.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">📞 {farmer.phone}</p>
                <p className="text-gray-600">🥛 Deliveries: {farmer.deliveries}</p>
                <div className="flex justify-between mt-4">
                  {farmer.status === "pending" && (
                    <Button size="sm" onClick={() => updateStatus(farmer.id, "active")}>
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                    </Button>
                  )}
                  {farmer.status === "active" && (
                    <Button variant="secondary" size="sm" onClick={() => updateStatus(farmer.id, "inactive")}>
                      <Ban className="h-4 w-4 mr-1" /> Deactivate
                    </Button>
                  )}
                  {farmer.status === "inactive" && (
                    <Button size="sm" onClick={() => updateStatus(farmer.id, "active")}>
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Reactivate
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => removeFarmer(farmer.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
