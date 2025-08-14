import { type NextRequest, NextResponse } from "next/server"

// This would normally connect to your database
const farmers = [
  {
    id: "F001",
    firstName: "John",
    lastName: "Kamau",
    name: "John Kamau",
    phone: "+254712345678",
    email: "john.kamau@email.com",
    location: "Kiambu",
    status: "pending",
    registrationDate: "2024-01-15",
    cattleCount: 15,
    farmSize: "5 acres",
    bankName: "KCB Bank",
    accountNumber: "1234567890",
    documents: { nationalId: true, landTitle: true },
  },
  {
    id: "F002",
    firstName: "Mary",
    lastName: "Wanjiku",
    name: "Mary Wanjiku",
    phone: "+254723456789",
    email: "mary.wanjiku@email.com",
    location: "Nakuru",
    status: "active",
    registrationDate: "2024-01-10",
    cattleCount: 20,
    farmSize: "8 acres",
    bankName: "Equity Bank",
    accountNumber: "0987654321",
    documents: { nationalId: true, landTitle: true },
    totalDeliveries: 45,
  },
  {
    id: "F003",
    firstName: "Peter",
    lastName: "Mwangi",
    name: "Peter Mwangi",
    phone: "+254734567890",
    email: "peter.mwangi@email.com",
    location: "Meru",
    status: "pending",
    registrationDate: "2024-01-05",
    cattleCount: 12,
    farmSize: "4 acres",
    bankName: "Co-op Bank",
    accountNumber: "1122334455",
    documents: { nationalId: true, landTitle: true },
    totalDeliveries: 0,
  },
]

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const farmerId = params.id

    // In a real app, you would update the database
    // For now, we'll simulate the approval

    return NextResponse.json({
      success: true,
      message: `Farmer ${farmerId} approved successfully`,
      farmer: {
        id: farmerId,
        status: "active",
        approvedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error approving farmer:", error)
    return NextResponse.json({ error: "Failed to approve farmer" }, { status: 500 })
  }
}
