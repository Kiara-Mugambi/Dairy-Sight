// app/api/collections/route.ts
import { NextRequest, NextResponse } from "next/server"

// Temporary in-memory store (replace with DB later)
let collections: any[] = []

// GET – fetch all collections
export async function GET() {
  try {
    return NextResponse.json({ collections }, { status: 200 })
  } catch (error) {
    console.error("Error fetching collections:", error)
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 })
  }
}

// POST – add a new milk intake record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.farmerId || !body.quantity) {
      return NextResponse.json(
        { error: "farmerId and quantity are required" },
        { status: 400 }
      )
    }

    const newCollection = {
      id: Date.now().toString(),
      farmerId: body.farmerId,
      quantity: Number(body.quantity),
      date: new Date().toISOString(),
    }

    collections.push(newCollection)

    return NextResponse.json({ collection: newCollection }, { status: 201 })
  } catch (error) {
    console.error("Error adding collection:", error)
    return NextResponse.json({ error: "Failed to add collection" }, { status: 500 })
  }
}

// Export collections so dashboard stats can use them
export { collections }
