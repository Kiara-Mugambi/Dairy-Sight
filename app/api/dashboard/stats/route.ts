// app/api/dashboard/stats/route.ts
import { NextResponse } from "next/server"
import { getFarmers } from "@/app/actions/farmer-actions"

export async function GET() {
  try {
    const result = await getFarmers()

    if (!result.success || !result.farmers) {
      return NextResponse.json(
        { error: result.error || "Failed to fetch farmers" },
        { status: 500 }
      )
    }

    const farmers = result.farmers

    // ✅ Calculate stats from actual farmers data
    const totalFarmers = farmers.length
    const pendingFarmers = farmers.filter((f) => f.status === "pending").length
    const activeFarmers = farmers.filter((f) => f.status === "active").length

    // ✅ Keep your mock stats for now
    const stats = {
      totalFarmers,
      pendingFarmers,
      activeFarmers,
      totalEmployees: 8,
      todayIntake: 2450,
      monthlyRevenue: 1250000,
      currentStock: 850,
      totalRevenue: 15600000,
      commission: 62500, // 5% of monthly revenue
      todayTransactions: 24,
      totalPayments: 156,
      pendingPayments: 12,
      completedPayments: 144,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    )
  }
}
