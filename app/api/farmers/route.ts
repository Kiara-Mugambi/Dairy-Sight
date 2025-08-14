import { type NextRequest, NextResponse } from "next/server"
import { getFarmers } from "@/app/actions/farmer-actions"

export async function GET(request: NextRequest) {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Add farmer logic here
    const newFarmer = {
      id: Date.now().toString(),
      ...body,
      status: "pending",
      registrationDate: new Date().toISOString().split("T")[0],
    }

    return NextResponse.json({ farmer: newFarmer }, { status: 201 })
  } catch (error) {
    console.error("Error creating farmer:", error)
    return NextResponse.json({ error: "Failed to create farmer" }, { status: 500 })
  }
}
