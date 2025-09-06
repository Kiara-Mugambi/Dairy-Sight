import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demonstration
const offtakes = [
  {
    id: "1",
    buyer: "KCC",
    volume: 150,
    pricePerLiter: 52,
    totalAmount: 7800,
    timestamp: new Date().toISOString(),
    status: "completed",
    type: "auto",
    paymentMethod: "bank",
  },
  {
    id: "2",
    buyer: "Brookside",
    volume: 200,
    pricePerLiter: 52,
    totalAmount: 10400,
    timestamp: new Date(Date.now() - 300000).toISOString(),
    status: "completed",
    type: "auto",
    paymentMethod: "bank",
  },
  {
    id: "3",
    buyer: "New KCC",
    volume: 120,
    pricePerLiter: 52,
    totalAmount: 6240,
    timestamp: new Date(Date.now() - 600000).toISOString(),
    status: "completed",
    type: "manual",
    paymentMethod: "mpesa",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")

    let result = offtakes
    if (limit) {
      result = offtakes.slice(0, Number.parseInt(limit))
    }

    return NextResponse.json({ offtakes: result })
  } catch (error) {
    console.error("Error fetching milk offtakes:", error)
    return NextResponse.json({ error: "Failed to fetch milk offtakes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newOfftake = {
      id: Date.now().toString(),
      buyer: body.buyer,
      volume: body.volume,
      pricePerLiter: body.pricePerLiter,
      totalAmount: body.volume * body.pricePerLiter,
      timestamp: new Date().toISOString(),
      status: "completed",
      type: body.type || "manual",
      paymentMethod: body.paymentMethod || "bank",
    }

    offtakes.unshift(newOfftake)

    return NextResponse.json({ offtake: newOfftake }, { status: 201 })
  } catch (error) {
    console.error("Error creating milk offtake:", error)
    return NextResponse.json({ error: "Failed to create milk offtake" }, { status: 500 })
  }
}
