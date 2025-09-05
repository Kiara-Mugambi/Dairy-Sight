"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, ArrowLeft } from "lucide-react"

interface Farmer {
  id: string
  firstName: string
  lastName: string
  phone: string
  location: string
  county: string
  status: "active" | "pending" | "inactive"
}

const SEED_FARMERS: Farmer[] = [
  { id: "f1", firstName: "John", lastName: "Kamau", phone: "0712345678", location: "Thika", county: "Kiambu", status: "active" },
  { id: "f2", firstName: "Mary", lastName: "Wanjiku", phone: "0723456789", location: "Ruiru", county: "Kiambu", status: "pending" },
]

const LS_FARMERS_KEY = "ds_farmers"

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [showForm, setShowForm] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [county, setCounty] = useState("")

  useEffect(() => {
    const f = localStorage.getItem(LS_FARMERS_KEY)
    setFarmers(f ? JSON.parse(f) : SEED_FARMERS)
  }, [])

  const addFarmer = (e: React.FormEvent) => {
    e.preventDefault()
    const newFarmer: Farmer = {
      id: `${Date.now()}`,
      firstName, lastName, phone, location, county,
      status: "pending",
    }
    const next = [newFarmer, ...farmers]
    setFarmers(next)
    localStorage.setItem(LS_FARMERS_KEY, JSON.stringify(next))

    setFirstName(""); setLastName(""); setPhone(""); setLocation(""); setCounty("")
    setShowForm(false)
  }

  const removeFarmer = (id: string) => {
    const next = farmers.filter(f => f.id !== id)
    setFarmers(next)
    localStorage.setItem(LS_FARMERS_KEY, JSON.stringify(next))
  }

  const statusBadge = (status: Farmer["status"]) => {
    if (status === "active") return <Badge className="bg-green-100 text-green-700">Active</Badge>
    if (status === "pending") return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
    return <Badge className="bg-red-100 text-red-700">Inactive</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/employee" className="flex items-center text-sm text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Farmers</h2>
        </div>
        <Button onClick={() => setShowForm(s => !s)}>
          <Plus className="h-4 w-4 mr-2" /> Add Farmer
        </Button>
      </div>

      {/* Add Farmer Form */}
      {showForm && (
        <Card className="mx-6 mt-6 mb-6 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle>Add New Farmer</CardTitle>
            <CardDescription>Enter farmer details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={addFarmer} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>First Name</Label>
                <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={location} onChange={e => setLocation(e.target.value)} />
              </div>
              <div>
                <Label>County</Label>
                <Input value={county} onChange={e => setCounty(e.target.value)} />
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full">Save</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Farmers Table */}
      <Card className="mx-6 my-6">
        <CardHeader>
          <CardTitle>Registered Farmers</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th>Name</th><th>Phone</th><th>Location</th><th>County</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {farmers.map(f => (
                <tr key={f.id} className="border-t">
                  <td>{f.firstName} {f.lastName}</td>
                  <td>{f.phone}</td>
                  <td>{f.location}</td>
                  <td>{f.county}</td>
                  <td>{statusBadge(f.status)}</td>
                  <td className="text-right">
                    <Button variant="destructive" size="icon" onClick={() => removeFarmer(f.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {farmers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    No farmers registered yet. Click <span className="font-semibold">Add Farmer</span> to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
