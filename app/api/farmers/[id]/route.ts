import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const farmer = await db.farmers.getById(params.id)

    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 })
    }

    return NextResponse.json({ farmer })
  } catch (error) {
    console.error("Error fetching farmer:", error)
    return NextResponse.json({ error: "Failed to fetch farmer" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const farmer = await db.farmers.update(params.id, body)

    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 })
    }

    return NextResponse.json({ farmer })
  } catch (error) {
    console.error("Error updating farmer:", error)
    return NextResponse.json({ error: "Failed to update farmer" }, { status: 500 })
  }
}
