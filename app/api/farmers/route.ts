// app/api/farmers/[id]/route.ts
import { NextResponse } from "next/server"
import { approveFarmer, rejectFarmer, getFarmers } from "@/app/actions/farmer-actions"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getFarmers()

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    const farmer = result.farmers?.find((f) => f.id === params.id)

    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 })
    }

    return NextResponse.json(farmer)
  } catch (error) {
    console.error("Error fetching farmer:", error)
    return NextResponse.json({ error: "Failed to fetch farmer" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const action = body.action as "approve" | "reject"

    if (!action) {
      return NextResponse.json({ error: "Action must be 'approve' or 'reject'" }, { status: 400 })
    }

    let result
    if (action === "approve") {
      result = await approveFarmer(params.id)
    } else {
      result = await rejectFarmer(params.id)
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ message: result.message })
  } catch (error) {
    console.error("Error updating farmer:", error)
    return NextResponse.json({ error: "Failed to update farmer" }, { status: 500 })
  }
}
