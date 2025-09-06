"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const data = [
  { month: "Jan", liters: 400 },
  { month: "Feb", liters: 320 },
  { month: "Mar", liters: 500 },
  { month: "Apr", liters: 280 },
  { month: "May", liters: 430 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link href="/employee" className="text-blue-600 font-medium mb-4 inline-block">← Back to Dashboard</Link>

      <h1 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="h-6 w-6"/> Analytics</h1>
      <p className="text-gray-600 mb-6">Track milk collection trends</p>

      <Card>
        <CardHeader><CardTitle>Monthly Offtakes (Liters)</CardTitle></CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="liters" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
