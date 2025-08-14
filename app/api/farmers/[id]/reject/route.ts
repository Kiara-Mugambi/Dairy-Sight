import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const farmerId = params.id

    // In a real app, you would update the database
    // For now, we'll simulate the rejection

    return NextResponse.json({
      success: true,
      message: `Farmer ${farmerId} rejected`,
      farmer: {
        id: farmerId,
        status: "rejected",
        rejectedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error rejecting farmer:", error)
    return NextResponse.json({ error: "Failed to reject farmer" }, { status: 500 })
  }
}
