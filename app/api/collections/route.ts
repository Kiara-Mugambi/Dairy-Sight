import { NextResponse } from "next/server"

let collections: any[] = []

export async function GET() {
  return NextResponse.json(collections)
}

export async function POST(req: Request) {
  const data = await req.json()

  const newEntry = {
    id: Date.now().toString(),
    farmerId: data.farmerId,
    farmerName: data.farmerName,
    quantity: data.quantity,
    quality: data.quality,
    date: data.date,
  }

  collections.unshift(newEntry)

  // ✅ Return the actual entry, not wrapped
  return NextResponse.json(newEntry)
}
