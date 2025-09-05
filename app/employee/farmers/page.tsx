"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Phone, MapPin, Search, Plus, Trash2, ArrowLeft, FileDown } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface Farmer {
  id: string
  firstName: string
  lastName: string
  phone: string
  location: string
  county: string
  status: "active" | "inactive" | "pending"
}

export default function FarmersDashboard() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newFarmer, setNewFarmer] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    county: "",
  })

  // Load mock data initially
  useEffect(() => {
    setFarmers([
      {
        id: "f1",
        firstName: "John",
        lastName: "Kamau",
        phone: "0712345678",
        location: "Thika",
        county: "Kiambu",
        status: "active",
      },
      {
        id: "f2",
        firstName: "Mary",
        lastName: "Wanjiku",
        phone: "0723456789",
        location: "Ruiru",
        county: "Kiambu",
        status: "inactive",
      },
      {
        id: "f3",
        firstName: "Peter",
        lastName: "Mwangi",
        phone: "0734567890",
        location: "Gachie",
        county: "Kiambu",
        status: "active",
      },
    ])
  }, [])

  // Add new farmer
  const addFarmer = () => {
    if (!newFarmer.firstName || !newFarmer.lastName || !newFarmer.phone || !newFarmer.location || !newFarmer.county) {
      return
    }
    const newEntry: Farmer = {
      id: Date.now().toString(),
      firstName: newFarmer.firstName,
      lastName: newFarmer.lastName,
      phone: newFarmer.phone,
      location: newFarmer.location,
      county: newFarmer.county,
      status: "active",
    }
    setFarmers([...farmers, newEntry])
    setNewFarmer({ firstName: "", lastName: "", phone: "", location: "", county: "" })
  }

  // Remove farmer
  const removeFarmer = (id: string) => {
    setFarmers(farmers.filter((f) => f.id !== id))
  }

  // Filter search
  const filteredFarmers = farmers.filter((f) =>
    `${f.firstName} ${f.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCount = farmers.filter((f) => f.status === "active").length
  const inactiveCount = farmers.filter((f) => f.status === "inactive").length

  // Export CSV
  const downloadCSV = () => {
    const headers = ["ID", "First Name", "Last Name", "Phone", "Location", "County", "Status"]
    const rows = farmers.map((f) => [f.id, f.firstName, f.lastName, f.phone, f.location, f.county, f.status])
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "farmers_report.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Export PDF
  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.text("Farmers Report", 14, 16)
    autoTable(doc, {
      startY: 22,
      head: [["ID", "First Name", "Last Name", "Phone", "Location", "County", "Status"]],
      body: farmers.map((f) => [f.id, f.firstName, f.lastName, f.phone, f.location, f.county, f.status]),
    })
    doc.save("farmers_report.pdf")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farmers Management</h1>
            <p className="text-gray-600">Register, view and manage cooperative farmers</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/employee/intake">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Link>
          </Button>
        </div>

        {/* Stats + Export */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <Card>
            <CardHeader>
              <CardTitle>Total Farmers</CardTitle>
              <CardDescription>Registered in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{farmers.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active</CardTitle>
              <CardDescription>Currently delivering milk</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inactive</CardTitle>
              <CardDescription>Not currently active</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">{inactiveCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-4">
          <Button onClick={downloadCSV} variant="secondary">
            <FileDown className="h-4 w-4 mr-2" /> Download CSV
          </Button>
          <Button onClick={downloadPDF}>
            <FileDown className="h-4 w-4 mr-2" /> Download PDF
          </Button>
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
              placeholder="Location"
              value={newFarmer.location}
              onChange={(e) => setNewFarmer({ ...newFarmer, location: e.target.value })}
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

        {/* Search */}
        <div className="flex items-center mb-4">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <Input
            placeholder="Search farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {/* Farmer List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <Card key={farmer.id}>
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {farmer.firstName} {farmer.lastName}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {farmer.location}, {farmer.county}
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
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="h-4 w-4" /> {farmer.phone}
                </p>
                <div className="flex justify-end mt-4">
                  <Button variant="destructive" size="sm" onClick={() => removeFarmer(farmer.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredFarmers.length === 0 && (
          <p className="text-center text-gray-500 py-8">No farmers found</p>
        )}
      </div>
    </div>
  )
}
