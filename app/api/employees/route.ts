import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demonstration
const employees = [
  {
    id: "1",
    name: "James Ochieng",
    email: "james@cooperative.com",
    role: "manager",
    status: "active",
    joinDate: "2023-06-15",
    phone: "+254701234567",
    lastLogin: "2024-01-14T08:30:00Z",
    createdAt: "2023-06-15",
    permissions: ["manage_farmers", "approve_payments", "view_reports"],
    salary: 45000,
    hireDate: "2023-06-15",
    department: "Operations",
  },
  {
    id: "2",
    name: "Alice Muthoni",
    email: "alice@cooperative.com",
    role: "operator",
    status: "active",
    joinDate: "2023-08-20",
    phone: "+254712345678",
    lastLogin: "2024-01-14T09:15:00Z",
    createdAt: "2023-08-20",
    permissions: ["record_intake", "view_farmers"],
    salary: 28000,
    hireDate: "2023-08-20",
    department: "Operations",
  },
  {
    id: "3",
    name: "David Kiprop",
    email: "david@cooperative.com",
    role: "quality_controller",
    status: "active",
    joinDate: "2023-09-10",
    phone: "+254723456789",
    lastLogin: "2024-01-13T16:45:00Z",
    createdAt: "2023-09-10",
    permissions: ["quality_testing", "reject_milk"],
    salary: 35000,
    hireDate: "2023-09-10",
    department: "Quality Control",
  },
  {
    id: "4",
    name: "Sarah Wanjiru",
    email: "sarah@cooperative.com",
    role: "accountant",
    status: "active",
    joinDate: "2023-07-01",
    phone: "+254734567890",
    lastLogin: "2024-01-14T07:20:00Z",
    createdAt: "2023-07-01",
    permissions: ["manage_payments", "view_financials", "generate_reports"],
    salary: 42000,
    hireDate: "2023-07-01",
    department: "Finance",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ employees })
  } catch (error) {
    console.error("Error fetching employees:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newEmployee = {
      id: Date.now().toString(),
      ...body,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
      hireDate: new Date().toISOString().split("T")[0],
      permissions: [],
    }

    employees.unshift(newEmployee)

    return NextResponse.json({ employee: newEmployee }, { status: 201 })
  } catch (error) {
    console.error("Error creating employee:", error)
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 })
  }
}
