import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demonstration
const payments = [
  {
    id: "1",
    farmerName: "Mary Wanjiku",
    amount: 2750,
    date: "2024-01-15",
    status: "completed",
    method: "bank",
    farmerId: "2",
    timestamp: new Date().toISOString(),
    type: "milk_payment",
    description: "Payment for 55L Grade A milk",
    processedBy: "Admin System",
  },
  {
    id: "2",
    farmerName: "Grace Njeri",
    amount: 1890,
    date: "2024-01-15",
    status: "processing",
    method: "mpesa",
    farmerId: "4",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    type: "milk_payment",
    description: "Payment for 42L Grade B milk",
  },
  {
    id: "3",
    farmerName: "Peter Mwangi",
    amount: 3200,
    date: "2024-01-14",
    status: "completed",
    method: "cash",
    farmerId: "3",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    type: "bonus",
    description: "Quality bonus for consistent Grade A deliveries",
    processedBy: "James Ochieng",
  },
  {
    id: "4",
    farmerName: "Samuel Kiprotich",
    amount: 1500,
    date: "2024-01-13",
    status: "failed",
    method: "mpesa",
    farmerId: "5",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    type: "penalty",
    description: "Quality penalty deduction",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")

    let result = payments
    if (limit) {
      result = payments.slice(0, Number.parseInt(limit))
    }

    return NextResponse.json({ payments: result })
  } catch (error) {
    console.error("Error fetching payments:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newPayment = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
      status: "processing",
      processedBy: "Admin User",
    }

    payments.unshift(newPayment)

    // Simulate payment processing
    setTimeout(() => {
      const paymentIndex = payments.findIndex((p) => p.id === newPayment.id)
      if (paymentIndex !== -1) {
        payments[paymentIndex].status = "completed"
      }
    }, 3000)

    return NextResponse.json({ payment: newPayment }, { status: 201 })
  } catch (error) {
    console.error("Error creating payment:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
