"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Droplets,
  TrendingUp,
  Package,
  DollarSign,
  Search,
  Plus,
  Trash2,
  Download,
} from "lucide-react"

// Recharts (pure client, safe on Vercel when page is "use client")
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// ----------------- Types -----------------
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

// ----------------- Mock seeds -----------------
const SEED_FARMERS: Farmer[] = [
  { id: "f1", firstName: "John", lastName: "Kamau", phone: "0712345678", location: "Thika", county: "Kiambu", status: "active" },
  { id: "f2", firstName: "Mary", lastName: "Wanjiku", phone: "0723456789", location: "Ruiru", county: "Kiambu", status: "active" },
  { id: "f3", firstName: "Peter", lastName: "Mwangi", phone: "0734567890", location: "Gachie", county: "Kiambu", status: "active" },
]

const SEED_INTAKES: MilkIntake[] = [
  {
    id: "i1",
    farmerId: "f1",
    farmerName: "John Kamau",
    volume: 23.5,
    quality: "A",
    pricePerLiter: 50,
    totalAmount: 1175,
    timestamp: new Date().toISOString(),
    recordedBy: "James Ochieng",
    status: "recorded",
  },
  {
    id: "i2",
    farmerId: "f2",
    farmerName: "Mary Wanjiku",
    volume: 18.2,
    quality: "B",
    pricePerLiter: 45,
    totalAmount: 819,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    recordedBy: "James Ochieng",
    status: "recorded",
  },
]

// ----------------- Helpers -----------------
const LS_FARMERS_KEY = "ds_farmers"
const LS_INTAKES_KEY = "ds_intakes"

const priceForQuality = (q: Quality) => (q === "A" ? 50 : q === "B" ? 45 : 40)

const formatNum = (n: number | undefined) =>
  !n || Number.isNaN(n) ? "0" : n.toLocaleString()

const formatCurrency = (n: number | undefined) =>
  `KSh ${!n || Number.isNaN(n) ? "0" : n.toLocaleString()}`

// ----------------- Component -----------------
export default function IntakePage() {
  // data
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [intakes, setIntakes] = useState<MilkIntake[]>([])

  // UI state
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<MilkIntake["status"] | "all">("all")
  const [qualityFilter, setQualityFilter] = useState<Quality | "all">("all")

  // pagination
  const [page, setPage] = useState(1)
  const pageSize = 8

  // form
  const [farmerId, setFarmerId] = useState("")
  const [volume, setVolume] = useState("")
  const [quality, setQuality] = useState<Quality>("A")
  const [isExporting, setIsExporting] = useState(false)

  // seed/persist
  useEffect(() => {
    const f = localStorage.getItem(LS_FARMERS_KEY)
    const i = localStorage.getItem(LS_INTAKES_KEY)

    if (f) setFarmers(JSON.parse(f))
    else {
      setFarmers(SEED_FARMERS)
      localStorage.setItem(LS_FARMERS_KEY, JSON.stringify(SEED_FARMERS))
    }

    if (i) setIntakes(JSON.parse(i))
    else {
      setIntakes(SEED_INTAKES)
      localStorage.setItem(LS_INTAKES_KEY, JSON.stringify(SEED_INTAKES))
    }
  }, [])

  // derived: filters + search
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return intakes
      .filter((x) =>
        q
          ? x.farmerName.toLowerCase().includes(q) ||
            x.recordedBy.toLowerCase().includes(q)
          : true,
      )
      .filter((x) => (statusFilter === "all" ? true : x.status === statusFilter))
      .filter((x) => (qualityFilter === "all" ? true : x.quality === qualityFilter))
      .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
  }, [intakes, search, statusFilter, qualityFilter])

  // pagination slice
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    // reset to page 1 when filters/search change
    setPage(1)
  }, [search, statusFilter, qualityFilter])

  // stats
  const totalIntake = intakes.reduce((s, x) => s + x.volume, 0)
  const today = new Date().toDateString()
  const todayIntake = intakes
    .filter((x) => new Date(x.timestamp).toDateString() === today)
    .reduce((s, x) => s + x.volume, 0)
  const currentStock = Math.max(0, totalIntake - 3601) // demo: pretend some was offtaken automatically
  const todayRevenue = intakes
    .filter((x) => new Date(x.timestamp).toDateString() === today)
    .reduce((s, x) => s + x.totalAmount, 0)

  // chart data (last 7 records binned by hour)
  const chartData = useMemo(() => {
    const last = [...intakes]
      .sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp))
      .slice(-14)
    return last.map((x) => ({
      time: new Date(x.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      liters: x.volume,
    }))
  }, [intakes])

  // create record
  const addIntake = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!farmerId || !volume) return

    const vol = Number.parseFloat(volume)
    if (!Number.isFinite(vol) || vol <= 0) return

    const f = farmers.find((ff) => ff.id === farmerId)
    if (!f) return

    const price = priceForQuality(quality)
    const rec: MilkIntake = {
      id: `${Date.now()}`,
      farmerId,
      farmerName: `${f.firstName} ${f.lastName}`,
      volume: vol,
      quality,
      pricePerLiter: price,
      totalAmount: vol * price,
      timestamp: new Date().toISOString(),
      recordedBy: "James Ochieng",
      status: "recorded",
    }
    const next = [rec, ...intakes]
    setIntakes(next)
    localStorage.setItem(LS_INTAKES_KEY, JSON.stringify(next))
    // reset form
    setFarmerId("")
    setVolume("")
    setQuality("A")
    setShowForm(false)
  }

  const removeIntake = (id: string) => {
    const next = intakes.filter((x) => x.id !== id)
    setIntakes(next)
    localStorage.setItem(LS_INTAKES_KEY, JSON.stringify(next))
  }

  // ----------------- Exports (dynamic imports keep Vercel happy) -----------------
  const exportCSV = () => {
    const rows = [
      ["Farmer", "Volume(L)", "Quality", "Price/L (KSh)", "Total (KSh)", "Timestamp", "Recorded By", "Status"],
      ...filtered.map((x) => [
        x.farmerName,
        x.volume,
        x.quality,
        x.pricePerLiter,
        x.totalAmount,
        new Date(x.timestamp).toLocaleString(),
        x.recordedBy,
        x.status,
      ]),
    ]
    const csv = rows.map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `intake-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportPDF = async () => {
    try {
      setIsExporting(true)
      const { default: jsPDF } = await import("jspdf")
      const autoTable = (await import("jspdf-autotable")).default
      const doc = new jsPDF()
      doc.setFontSize(16)
      doc.text("Milk Intake Report", 14, 18)
      autoTable(doc, {
        startY: 24,
        head: [["Farmer", "Liters", "Quality", "Price/L", "Total", "Time", "Status"]],
        body: filtered.map((x) => [
          x.farmerName,
          x.volume,
          x.quality,
          `KSh ${x.pricePerLiter}`,
          `KSh ${x.totalAmount}`,
          new Date(x.timestamp).toLocaleString(),
          x.status,
        ]),
      })
      doc.save(`intake-${new Date().toISOString().split("T")[0]}.pdf`)
    } finally {
      setIsExporting(false)
    }
  }

  const exportExcel = async () => {
    try {
      setIsExporting(true)
      const XLSX = await import("xlsx")
      const sheet = XLSX.utils.json_to_sheet(
        filtered.map((x) => ({
          Farmer: x.farmerName,
          Liters: x.volume,
          Quality: x.quality,
          "Price/L (KSh)": x.pricePerLiter,
          "Total (KSh)": x.totalAmount,
          Timestamp: new Date(x.timestamp).toLocaleString(),
          Status: x.status,
        })),
      )
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, sheet, "Intake")
      XLSX.writeFile(wb, `intake-${new Date().toISOString().split("T")[0]}.xlsx`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (lite) */}
      <div className="w-64 bg-white shadow-sm border-r hidden md:flex md:flex-col">
        <div className="p-6 border-b flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">DairySight</h1>
            <p className="text-xs text-gray-600">Employee Portal</p>
          </div>
        </div>
        <div className="p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Navigation</p>
          <Link href="/employee/intake" className="block px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
            Intake
          </Link>
          <Link href="/employee/farmers" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
            Farmers
          </Link>
          <Link href="/employee/reports" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
            Reports
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Milk Intake</h2>
              <p className="text-gray-600">Record deliveries, track stock, and export daily reports</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-9 w-72"
                  placeholder="Search farmer or recorder…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="recorded">Recorded</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={qualityFilter} onValueChange={(v: any) => setQualityFilter(v)}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" disabled={isExporting} onClick={exportCSV}>
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline" disabled={isExporting} onClick={exportExcel}>
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
              <Button disabled={isExporting} onClick={exportPDF}>
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button onClick={() => setShowForm((s) => !s)}>
                <Plus className="h-4 w-4 mr-2" />
                Record Intake
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Intake</p>
                    <p className="text-3xl font-bold text-blue-600">{formatNum(totalIntake)} L</p>
                  </div>
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Auto Offtake (demo)</p>
                    <p className="text-3xl font-bold text-green-600">3,601 L</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Stock</p>
                    <p className="text-3xl font-bold text-purple-600">{formatNum(currentStock)} L</p>
                  </div>
                  <Package className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue Today</p>
                    <p className="text-3xl font-bold text-orange-600">{formatCurrency(todayRevenue)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          {showForm && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  Record Milk Intake
                </CardTitle>
                <CardDescription>Attach farmer, liters, and quality grade</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addIntake} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Farmer</Label>
                    <Select value={farmerId} onValueChange={setFarmerId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select farmer" />
                      </SelectTrigger>
                      <SelectContent>
                        {farmers
                          .filter((f) => f.status === "active")
                          .map((f) => (
                            <SelectItem key={f.id} value={f.id}>
                              {f.firstName} {f.lastName} — {f.location}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Volume (L)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      placeholder="e.g. 24.5"
                    />
                  </div>
                  <div>
                    <Label>Quality</Label>
                    <Select value={quality} onValueChange={(v: Quality) => setQuality(v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="A/B/C" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A (KSh 50/L)</SelectItem>
                        <SelectItem value="B">B (KSh 45/L)</SelectItem>
                        <SelectItem value="C">C (KSh 40/L)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end gap-2">
                    <Button type="submit" className="flex-1">
                      Save
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Intake (Liters)
              </CardTitle>
              <CardDescription>Last 10–14 records by time</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="liters" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Intakes</CardTitle>
              <CardDescription>Today and recent days</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-2">Farmer</th>
                    <th className="py-2">Liters</th>
                    <th className="py-2">Quality</th>
                    <th className="py-2">Price/L</th>
                    <th className="py-2">Total</th>
                    <th className="py-2">Timestamp</th>
                    <th className="py-2">Status</th>
                    <th className="py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((x) => (
                    <tr key={x.id} className="border-t">
                      <td className="py-2 font-medium">{x.farmerName}</td>
                      <td className="py-2">{x.volume}</td>
                      <td className="py-2">
                        <Badge variant="outline">{x.quality}</Badge>
                      </td>
                      <td className="py-2">KSh {x.pricePerLiter}</td>
                      <td className="py-2 font-semibold">KSh {x.totalAmount}</td>
                      <td className="py-2">{new Date(x.timestamp).toLocaleString()}</td>
                      <td className="py-2">
                        <Badge variant={x.status === "recorded" ? "secondary" : x.status === "paid" ? "default" : "outline"}>
                          {x.status}
                        </Badge>
                      </td>
                      <td className="py-2">
                        <div className="flex justify-end">
                          <Button variant="destructive" size="icon" onClick={() => removeIntake(x.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pageItems.length === 0 && (
                    <tr>
                      <td className="py-8 text-center text-gray-500" colSpan={8}>
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-gray-600">
                  Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                    Prev
                  </Button>
                  <span className="text-sm">
                    Page {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
