import { NextResponse } from "next/server"
import { getFarmersData } from "@/app/actions/farmer-actions"

export async function GET() {
  try {
    const farmers = getFarmersData()

    // Calculate stats from farmers data
    const totalFarmers = farmers.length
    const pendingFarmers = farmers.filter((f) => f.status === "pending").length
    const activeFarmers = farmers.filter((f) => f.status === "active").length

    // Mock other stats - in a real app, these would come from your database
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
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
