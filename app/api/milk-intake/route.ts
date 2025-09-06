import { type NextRequest, NextResponse } from "next/server"
import { Database } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const date = searchParams.get("date")

    const result = await Database.getMilkIntakes({
      limit: limit ? Number.parseInt(limit) : undefined,
      date: date || undefined,
    })

    return NextResponse.json({
      success: true,
      intakes: result.intakes || [],
    })
  } catch (error) {
    console.error("Error fetching milk intakes:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch milk intakes",
        intakes: [],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { farmerId, quantity, quality } = body

    if (!farmerId || !quantity || !quality) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Calculate price based on quality
    const pricePerLiter = {
      A: 55,
      B: 50,
      C: 45,
    }[quality as "A" | "B" | "C"]

    if (!pricePerLiter) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid quality grade",
        },
        { status: 400 },
      )
    }

    const totalPrice = quantity * pricePerLiter

    // Get farmer details
    const farmer = await Database.getFarmerById(farmerId)
    if (!farmer) {
      return NextResponse.json(
        {
          success: false,
          error: "Farmer not found",
        },
        { status: 404 },
      )
    }

    // Create milk intake record
    const milkIntake = await Database.createMilkIntake({
      farmerId,
      farmerName: farmer.name,
      quantity,
      quality,
      price: totalPrice,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
    })

    return NextResponse.json({
      success: true,
      intake: milkIntake,
      message: `Successfully recorded ${quantity}L of Grade ${quality} milk`,
    })
  } catch (error) {
    console.error("Error recording milk intake:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to record milk intake",
      },
      { status: 500 },
    )
  }
}
