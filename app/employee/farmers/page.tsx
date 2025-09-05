"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  BarChart3, Droplets, TrendingUp, Package, DollarSign, Search,
  Plus, Trash2, Download, ArrowLeft
} from "lucide-react"

import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts"

type Quality = "A" | "B" | "C"

interface Farmer {
  id: string
  firstName: string
  lastName: string
  phone: string
  location: string
  county: string
  status: "active" | "pending" | "inactive"
}

interface MilkIntake {
  id: string
  farmerId: string
  farmerName: string
  volume: number
  quality: Quality
  pricePerLiter: number
  totalAmount: number
  timestamp: string
  recordedBy: string
  status: "recorded" | "processed" | "paid"
}

// ----------------- Seeds -----------------
const SEED_FARMERS: Farmer[] = [
  { id: "f1", firstName: "John", lastName: "Kamau", phone: "0712345678", location: "Thika", county: "Kiambu", status: "active" },
  { id: "f2", firstName: "Mary", lastName: "Wanjiku", phone: "0723456789", location: "Ruiru", county: "Kiambu", status: "active" },
]

const SEED_INTAKES: MilkIntake[] = [
  {
    id: "i1", farmerId: "f1", farmerName: "John Kamau",
    volume: 23.5, quality: "A", pricePerLiter: 50, totalAmount: 1175,
    timestamp: new Date().toISOString(), recordedBy: "James Ochieng", status: "recorded"
  }
]

// ----------------- Helpers -----------------
const LS_FARMERS_KEY = "ds_farmers"
const LS_INTAKES_KEY = "ds_intakes"

const priceForQuality = (q: Quality) => (q === "A" ? 50 : q === "B" ? 45 : 40)
const formatNum = (n: number | undefined) => !n ? "0" : n.toLocaleString()
const formatCurrency = (n: number | undefined) => `KSh ${!n ? "0" : n.toLocaleString()}`

// ----------------- Component -----------------
export default function IntakePage() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [intakes, setIntakes] = useState<MilkIntake[]>([])
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")
  const [farmerId, setFarmerId] = useState("")
  const [volume, setVolume] = useState("")
  const [quality, setQuality] = useState<Quality>("A")

  useEffect(() => {
    const f = localStorage.getItem(LS_FARMERS_KEY)
    const i = localStorage.getItem(LS_INTAKES_KEY)
    setFarmers(f ? JSON.parse(f) : SEED_FARMERS)
    setIntakes(i ? JSON.parse(i) : SEED_INTAKES)
  }, [])

  const addIntake = (e: React.FormEvent) => {
    e.preventDefault()
    const vol = parseFloat(volume)
    if (!farmerId || !vol) return
    const f = farmers.find(ff => ff.id === farmerId)
    if (!f) return
    const rec: MilkIntake = {
      id: `${Date.now()}`,
      farmerId,
      farmerName: `${f.firstName} ${f.lastName}`,
      volume: vol,
      quality,
      pricePerLiter: priceForQuality(quality),
      totalAmount: vol * priceForQuality(quality),
      timestamp: new Date().toISOString(),
      recordedBy: "James Ochieng",
      status: "recorded"
    }
    const next = [rec, ...intakes]
    setIntakes(next)
    localStorage.setItem(LS_INTAKES_KEY, JSON.stringify(next))
    setShowForm(false)
    setFarmerId(""); setVolume("")
  }

  const removeIntake = (id: string) => {
    const next = intakes.filter(x => x.id !== id)
    setIntakes(next)
    localStorage.setItem(LS_INTAKES_KEY, JSON.stringify(next))
  }

  const chartData = intakes.slice(-10).map(x => ({
    time: new Date(x.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    liters: x.volume
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/employee" className="flex items-center text-sm text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Milk Intake</h2>
        </div>
        <Button onClick={() => setShowForm(s => !s)}>
          <Plus className="h-4 w-4 mr-2" /> Record Intake
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Total Collected</p>
            <p className="text-3xl font-bold text-blue-600">{formatNum(intakes.reduce((s, x) => s + x.volume, 0))} L</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Milk Sent to Processing</p>
            <p className="text-3xl font-bold text-green-600">3,600 L</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Milk Balance</p>
            <p className="text-3xl font-bold text-purple-600">{formatNum(2000)} L</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Revenue (Today)</p>
            <p className="text-3xl font-bold text-orange-600">{formatCurrency(15000)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="mx-6 mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>Record Milk Intake</CardTitle>
            <CardDescription>Select farmer and record liters delivered</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={addIntake} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Farmer</Label>
                <Select value={farmerId} onValueChange={setFarmerId}>
                  <SelectTrigger><SelectValue placeholder="Select farmer" /></SelectTrigger>
                  <SelectContent>
                    {farmers.map(f => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.firstName} {f.lastName} — {f.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Volume (L)</Label>
                <Input type="number" step="0.1" value={volume} onChange={e => setVolume(e.target.value)} />
              </div>
              <div>
                <Label>Quality</Label>
                <Select value={quality} onValueChange={(v: Quality) => setQuality(v)}>
                  <SelectTrigger><SelectValue placeholder="A/B/C" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A (50 KSh)</SelectItem>
                    <SelectItem value="B">B (45 KSh)</SelectItem>
                    <SelectItem value="C">C (40 KSh)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full">Save</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Chart */}
      <Card className="mx-6 mb-6">
        <CardHeader><CardTitle>Recent Intake</CardTitle></CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line dataKey="liters" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="mx-6 mb-10">
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th>Farmer</th><th>Liters</th><th>Grade</th><th>Total</th><th>Time</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {intakes.map(x => (
                <tr key={x.id} className="border-t">
                  <td>{x.farmerName}</td>
                  <td>{x.volume}</td>
                  <td>
                    <Badge className={x.quality === "A" ? "bg-green-200" : x.quality === "B" ? "bg-blue-200" : "bg-orange-200"}>
                      {x.quality}
                    </Badge>
                  </td>
                  <td>{formatCurrency(x.totalAmount)}</td>
                  <td>{new Date(x.timestamp).toLocaleString()}</td>
                  <td><Badge>{x.status}</Badge></td>
                  <td className="text-right">
                    <Button variant="destructive" size="icon" onClick={() => removeIntake(x.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {intakes.length === 0 && (
                <tr><td colSpan={7} className="py-6 text-center text-gray-500">No milk deliveries yet</td></tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
