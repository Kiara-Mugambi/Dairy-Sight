"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as Dialog from "@radix-ui/react-dialog"
import { Plus, Trash2, X, Users } from "lucide-react"

// ----------------- Types -----------------
interface Farmer {
  id: string
  firstName: string
  lastName: string
  phone: string
  location: string
  county: string
  status: "active" | "pending" | "inactive"
}

// ----------------- Mock seed -----------------
const SEED_FARMERS: Farmer[] = [
  { id: "f1", firstName: "John", lastName: "Kamau", phone: "0712345678", location: "Thika", county: "Kiambu", status: "active" },
  { id: "f2", firstName: "Mary", lastName: "Wanjiku", phone: "0723456789", location: "Ruiru", county: "Kiambu", status: "active" },
  { id: "f3", firstName: "Peter", lastName: "Mwangi", phone: "0734567890", location: "Gachie", county: "Kiambu", status: "pending" },
]

// ----------------- LocalStorage Key -----------------
const LS_FARMERS_KEY = "ds_farmers"

// ----------------- Component -----------------
export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<Farmer["status"] | "all">("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null)
  const [highlightId, setHighlightId] = useState<string | null>(null)

  // Pagination
  const [page, setPage] = useState(1)
  const pageSize = 6

  // Sorting
  const [sortKey, setSortKey] = useState<keyof Farmer>("firstName")
  const [sortAsc, setSortAsc] = useState(true)

  // Form states
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [county, setCounty] = useState("")
  const [status, setStatus] = useState<Farmer["status"]>("active")

  // Load from localStorage or seed
  useEffect(() => {
    const f = localStorage.getItem(LS_FARMERS_KEY)
    if (f) setFarmers(JSON.parse(f))
    else {
      setFarmers(SEED_FARMERS)
      localStorage.setItem(LS_FARMERS_KEY, JSON.stringify(SEED_FARMERS))
    }
  }, [])

  // ----------------- Derived -----------------
  const filteredFarmers = useMemo(() => {
    let list = farmers
      .filter((f) =>
        search ? f.firstName.toLowerCase().includes(search.toLowerCase()) || f.lastName.toLowerCase().includes(search.toLowerCase()) : true
      )
      .filter((f) => (statusFilter === "all" ? true : f.status === statusFilter))

    // Sorting
    list = [...list].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1
      return 0
    })

    return list
  }, [farmers, search, statusFilter, sortKey, sortAsc])

  const totalPages = Math.max(1, Math.ceil(filteredFarmers.length / pageSize))
  const pageItems = filteredFarmers.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage(1)
  }, [search, statusFilter, sortKey, sortAsc])

  const total = farmers.length
  const active = farmers.filter(f => f.status === "active").length
  const pending = farmers.filter(f => f.status === "pending").length
  const inactive = farmers.filter(f => f.status === "inactive").length

  // ----------------- Handlers -----------------
  const addFarmer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newFarmer: Farmer = {
      id: `${Date.now()}`,
      firstName,
      lastName,
      phone,
      location,
      county,
      status,
    }
    const next = [newFarmer, ...farmers]
    setFarmers(next)
    localStorage.setItem(LS_FARMERS_KEY, JSON.stringify(next))
    setShowAddForm(false)
    setFirstName(""); setLastName(""); setPhone(""); setLocation(""); setCounty(""); setStatus("active")
    setHighlightId(newFarmer.id)
    setTimeout(() => setHighlightId(null), 2500)
  }

  const updateFarmer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingFarmer) return
    const updated: Farmer = { ...editingFarmer, firstName, lastName, phone, location, county, status }
    const next = farmers.map(f => f.id === editingFarmer.id ? updated : f)
    setFarmers(next)
    localStorage.setItem(LS_FARMERS_KEY, JSON.stringify(next))
    setHighlightId(editingFarmer.id)
    setEditingFarmer(null)
    setTimeout(() => setHighlightId(null), 2500)
  }

  const removeFarmer = (id: string) => {
    const next = farmers.filter(f => f.id !== id)
    setFarmers(next)
    localStorage.setItem(LS_FARMERS_KEY, JSON.stringify(next))
  }

  const handleSort = (key: keyof Farmer) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(true) }
  }

  // ----------------- JSX -----------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link href="/employee" className="text-blue-600 font-medium mb-4 inline-block">← Back to Dashboard</Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Users className="h-6 w-6" /> Farmers</h1>
          <p className="text-gray-600">Manage farmer details and track milk suppliers</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search by name…" value={search} onChange={e => setSearch(e.target.value)} />
          <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowAddForm(s => !s)}>
            <Plus className="h-4 w-4 mr-1" /> Add Farmer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Farmers</p>
              <p className="text-2xl font-bold text-blue-600">{total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{active}</p>
            </div>
            <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full">A</Badge>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pending}</p>
            </div>
            <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full">P</Badge>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-red-600">{inactive}</p>
            </div>
            <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full">I</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Add Farmer Form */}
      {showAddForm && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5 text-blue-600" /> Add Farmer</CardTitle>
            <CardDescription>Enter new farmer details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={addFarmer} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div><Label>First Name</Label><Input value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
              <div><Label>Last Name</Label><Input value={lastName} onChange={e => setLastName(e.target.value)} /></div>
              <div><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
              <div><Label>Location</Label><Input value={location} onChange={e => setLocation(e.target.value)} /></div>
              <div><Label>County</Label><Input value={county} onChange={e => setCounty(e.target.value)} /></div>
              <div><Label>Status</Label>
                <Select value={status} onValueChange={(v: Farmer["status"]) => setStatus(v)}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button type="submit" className="flex-1">Save</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Farmer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Farmers List</CardTitle>
          <CardDescription>All milk suppliers</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 cursor-pointer" onClick={() => handleSort("firstName")}>Name {sortKey === "firstName" ? (sortAsc ? "↑" : "↓") : ""}</th>
                <th className="py-2 cursor-pointer" onClick={() => handleSort("phone")}>Phone {sortKey === "phone" ? (sortAsc ? "↑" : "↓") : ""}</th>
                <th className="py-2 cursor-pointer" onClick={() => handleSort("location")}>Location {sortKey === "location" ? (sortAsc ? "↑" : "↓") : ""}</th>
                <th className="py-2 cursor-pointer" onClick={() => handleSort("county")}>County {sortKey === "county" ? (sortAsc ? "↑" : "↓") : ""}</th>
                <th className="py-2 cursor-pointer" onClick={() => handleSort("status")}>Status {sortKey === "status" ? (sortAsc ? "↑" : "↓") : ""}</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(f => (
                <tr key={f.id} className={`border-t transition-colors ${highlightId === f.id ? "bg-yellow-100 animate-pulse" : ""}`}>
                  <td className="py-2 font-medium">{f.firstName} {f.lastName}</td>
                  <td className="py-2">{f.phone}</td>
                  <td className="py-2">{f.location}</td>
                  <td className="py-2">{f.county}</td>
                  <td className="py-2"><Badge variant="outline">{f.status}</Badge></td>
                  <td className="py-2 flex justify-end gap-2">
                    <Button size="icon" variant="outline" onClick={() => {
                      setEditingFarmer(f)
                      setFirstName(f.firstName)
                      setLastName(f.lastName)
                      setPhone(f.phone)
                      setLocation(f.location)
                      setCounty(f.county)
                      setStatus(f.status)
                    }}>✏️</Button>
                    <Button variant="destructive" size="icon" onClick={() => removeFarmer(f.id)}><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr><td className="py-8 text-center text-gray-500" colSpan={6}>No farmers found</td></tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-600">Page {page} of {totalPages}</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Farmer Modal */}
      {editingFarmer && (
        <Dialog.Root open={!!editingFarmer} onOpenChange={(open) => !open && setEditingFarmer(null)}>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-bold">Edit Farmer</Dialog.Title>
              <Button variant="ghost" size="icon" onClick={() => setEditingFarmer(null)}><X className="h-4 w-4" /></Button>
            </div>
            <form onSubmit={updateFarmer} className="grid grid-cols-1 gap-4">
              <div><Label>First Name</Label><Input value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
              <div><Label>Last Name</Label><Input value={lastName} onChange={e => setLastName(e.target.value)} /></div>
              <div><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
              <div><Label>Location</Label><Input value={location} onChange={e => setLocation(e.target.value)} /></div>
              <div><Label>County</Label><Input value={county} onChange={e => setCounty(e.target.value)} /></div>
              <div><Label>Status</Label>
                <Select value={status} onValueChange={(v: Farmer["status"]) => setStatus(v)}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button type="submit">Save Changes</Button>
                <Button variant="outline" onClick={() => setEditingFarmer(null)}>Cancel</Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  )
}
