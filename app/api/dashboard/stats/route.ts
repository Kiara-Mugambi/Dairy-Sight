// app/api/dashboard/stats/route.ts
import { NextResponse } from "next/server"
import { getFarmers } from "@/app/actions/farmer-actions"

// Temporary in-memory collection storage
let collections: any[] = []

// Expose helper so collectors can push here
export function addCollection(entry: any) {
  collections.unshift(entry)
}

export async function GET() {
  try {
    const farmerResult = await getFarmers()

    if (!farmerResult.success || !farmerResult.farmers) {
      return NextResponse.json(
        { error: farmerResult.error || "Failed to fetch farmers" },
        { status: 500 }
      )
    }

    const farmers = farmerResult.farmers

    // ✅ Farmer stats
    const totalFarmers = farmers.length
    const pendingFarmers = farmers.filter((f) => f.status === "pending").length
    const activeFarmers = farmers.filter((f) => f.status === "active").length

    // ✅ Intake stats
    const today = new Date().toISOString().split("T")[0]
    const todayCollections = collections.filter((c) => c.date === today)
    const todayIntake = todayCollections.reduce((sum, c) => sum + Number(c.quantity || 0), 0)

    const monthlyCollections = collections.filter((c) => {
      const month = new Date(c.date).getMonth()
      const nowMonth = new Date().getMonth()
      return month === nowMonth
    })
    const monthlyIntake = monthlyCollections.reduce((sum, c) => sum + Number(c.quantity || 0), 0)

    // ✅ Mock revenue but tied to intake (say 50 per unit)
    const unitPrice = 50
    const monthlyRevenue = monthlyIntake * unitPrice
    const totalRevenue = collections.reduce((sum, c) => sum + Number(c.quantity || 0) * unitPrice, 0)

    // ✅ Build stats
    const stats = {
      totalFarmers,
      pendingFarmers,
      activeFarmers,
      totalEmployees: 8, // still mock
      todayIntake,
      monthlyRevenue,
      currentStock: collections.reduce((sum, c) => sum + Number(c.quantity || 0), 0),
      totalRevenue,
      commission: monthlyRevenue * 0.05,
      todayTransactions: todayCollections.length,
      totalPayments: 156, // still mock until payments API
      pendingPayments: 12,
      completedPayments: 144,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
