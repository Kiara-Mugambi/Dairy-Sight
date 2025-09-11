import { type NextRequest, NextResponse } from "next/server"
import { getFarmers } from "@/app/actions/farmer-actions"

// 🗂️ Local in-memory farmers store (same reference as farmer-actions)
let farmers: any[] = []

// ✅ GET all farmers
export async function GET() {
  try {
    const result = await getFarmers()
    if (result.success) {
      return NextResponse.json({ farmers: result.farmers })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in farmers API:", error)
    return NextResponse.json({ error: "Failed to fetch farmers" }, { status: 500 })
  }
}

// ✅ POST create a new farmer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newFarmer = {
      id: Date.now().toString(),
      name: body.name,
      phone: body.phone,
      email: body.email,
      location: body.location,
      cattleCount: body.cattleCount ?? 0,
      status: "pending",
      registrationDate: new Date().toISOString().split("T")[0],
    }

    farmers.push(newFarmer)

    return NextResponse.json({ success: true, farmer: newFarmer }, { status: 201 })
  } catch (error) {
    console.error("Error creating farmer:", error)
    return NextResponse.json({ error: "Failed to create farmer" }, { status: 500 })
  }
}
