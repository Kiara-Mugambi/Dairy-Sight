import { type NextRequest, NextResponse } from "next/server"

const users = [
  {
    email: "admin@dairy.com",
    password: "admin123",
    role: "admin",
    name: "Super Admin",
  },
  {
    email: "employee@dairy.com",
    password: "emp123",
    role: "employee",
    name: "James Ochieng",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
