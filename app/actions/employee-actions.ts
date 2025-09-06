"use server"

interface EmployeeData {
  name: string
  email: string
  phone: string
  role: string
}

export async function addEmployee(employeeData: EmployeeData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })

    if (!response.ok) {
      throw new Error("Failed to add employee")
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error in addEmployee:", error)
    return { success: false, error: "Failed to add employee" }
  }
}
