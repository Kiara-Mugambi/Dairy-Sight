import { NextResponse } from "next/server"

let collections: any[] = []

// GET all collections
export async function GET() {
  return NextResponse.json(collections)
}

// POST new collection
export async function POST(req: Request) {
  const data = await req.json()

  const newEntry = {
    id: Date.now().toString(),
    farmerId: data.farmerId,
    farmerName: data.farmerName,
    quantity: data.quantity,
    quality: data.quality,  // ✅ captured properly
    date: data.date,
  }

  collections.unshift(newEntry)

  // Return the new entry itself, not wrapped in {success, entry}
  return NextResponse.json(newEntry, { status: 201 })
}
