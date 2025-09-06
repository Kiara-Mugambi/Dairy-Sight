"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BarChart3, Download } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ReportData {
  totalFarmers: number
  activeFarmers: number
  totalMilkIntake: number
  totalRevenue: number
  commission: number
  averageQuality: number
  monthlyGrowth: number
  trends: { period: string; revenue: number; milk: number }[]
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  useEffect(() => {
    loadReportData()
  }, [selectedPeriod])

  const loadReportData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/reports?period=${selectedPeriod}`)
      if (response.ok) {
        const data = await response.json()
        setReportData(data)
      } else {
        fallbackData()
      }
    } catch (error) {
      console.error("Error loading report data:", error)
      fallbackData()
    } finally {
      setIsLoading(false)
    }
  }

  const fallbackData = () => {
    setReportData({
      totalFarmers: 3,
      activeFarmers: 2,
      totalMilkIntake: 1250,
      totalRevenue: 62500,
      commission: 3125,
      averageQuality: 4.2,
      monthlyGrowth: 15.5,
      trends: [
        { period: "Week 1", revenue: 15000, milk: 300 },
        { period: "Week 2", revenue: 18000, milk: 400 },
        { period: "Week 3", revenue: 20000, milk: 280 },
        { period: "Week 4", revenue: 9500, milk: 270 },
      ],
    })
  }

  const getTimestamp = () => {
    const now = new Date()
    return now.toISOString().replace("T", "_").replace(/:/g, "-").split(".")[0]
  }

  // ---------- EXPORTS ----------
  const exportCSV = () => {
    if (!reportData) return
    const timestamp = getTimestamp()
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        [`Performance Report - ${selectedPeriod.toUpperCase()} (${timestamp})`],
        [],
        ["Metric", "Value"],
        ["Total Farmers", reportData.totalFarmers],
        ["Active Farmers", reportData.activeFarmers],
        ["Total Milk Intake (L)", reportData.totalMilkIntake],
        ["Total Revenue (KSh)", reportData.totalRevenue],
        ["Commission (KSh)", reportData.commission],
        ["Average Quality", reportData.averageQuality],
        ["Growth (%)", reportData.monthlyGrowth],
      ]
        .map((row) => row.join(","))
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `report-${selectedPeriod}-${timestamp}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportPDF = () => {
    if (!reportData) return
    const timestamp = getTimestamp()
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(`Performance Report - ${selectedPeriod.toUpperCase()}`, 14, 20)

    autoTable(doc, {
      startY: 30,
      head: [["Metric", "Value"]],
      body: [
        ["Total Farmers", reportData.totalFarmers],
        ["Active Farmers", reportData.activeFarmers],
        ["Total Milk Intake (L)", reportData.totalMilkIntake],
        ["Total Revenue (KSh)", reportData.totalRevenue],
        ["Commission (KSh)", reportData.commission],
        ["Average Quality", reportData.averageQuality],
        ["Growth (%)", reportData.monthlyGrowth],
      ],
    })

    doc.save(`report-${selectedPeriod}-${timestamp}.pdf`)
  }

  const exportExcel = () => {
    if (!reportData) return
    const timestamp = getTimestamp()
    const ws = XLSX.utils.json_to_sheet([
      { Metric: "Total Farmers", Value: reportData.totalFarmers },
      { Metric: "Active Farmers", Value: reportData.activeFarmers },
      { Metric: "Total Milk Intake (L)", Value: reportData.totalMilkIntake },
      { Metric: "Total Revenue (KSh)", Value: reportData.totalRevenue },
      { Metric: "Commission (KSh)", Value: reportData.commission },
      { Metric: "Average Quality", Value: reportData.averageQuality },
      { Metric: "Growth (%)", Value: reportData.monthlyGrowth },
    ])

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Report")
    XLSX.writeFile(wb, `report-${selectedPeriod}-${timestamp}.xlsx`)
  }

  // ---------- UI ----------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive insights into your cooperative's performance</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {["week", "month", "year"].map((p) => (
                <Button
                  key={p}
                  variant={selectedPeriod === p ? "default" : "outline"}
                  onClick={() => setSelectedPeriod(p)}
                  size="sm"
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Button>
              ))}
            </div>

            {/* Export */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={exportCSV}>Export CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={exportPDF}>Export PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={exportExcel}>Export Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Charts */}
        {reportData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Revenue over time</CardDescription>
              </CardHeader>
              <CardContent style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportData.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Milk Intake Trend</CardTitle>
                <CardDescription>Milk intake over time</CardDescription>
              </CardHeader>
              <CardContent style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="milk" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
