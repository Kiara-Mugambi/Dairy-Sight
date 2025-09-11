"use server"

interface Farmer {
  id: string
  name: string
  phone: string
  email: string
  location: string
  status: "pending" | "active" | "rejected"
  registrationDate: string
  cattleCount: number
}

interface ActionResult {
  success: boolean
  message?: string
  error?: string
}

// In-memory storage for demonstration
const farmers: Farmer[] = [
  {
    id: "1",
    name: "John Kamau",
    phone: "+254712345678",
    email: "john.kamau@gmail.com",
    location: "Kiambu Town",
    status: "pending",
    registrationDate: "2024-01-15",
    cattleCount: 15,
  },
  {
    id: "2",
    name: "Mary Wanjiku",
    phone: "+254723456789",
    email: "mary.wanjiku@gmail.com",
    location: "Thika",
    status: "active",
    registrationDate: "2023-08-10",
    cattleCount: 22,
  },
  {
    id: "3",
    name: "Peter Mwangi",
    phone: "+254734567890",
    email: "peter.mwangi@gmail.com",
    location: "Ruiru",
    status: "pending",
    registrationDate: "2024-01-12",
    cattleCount: 8,
  },
  {
    id: "4",
    name: "Grace Njeri",
    phone: "+254745678901",
    email: "grace.njeri@gmail.com",
    location: "Limuru",
    status: "active",
    registrationDate: "2023-11-20",
    cattleCount: 18,
  },
  {
    id: "5",
    name: "Samuel Kiprotich",
    phone: "+254756789012",
    email: "samuel.kiprotich@gmail.com",
    location: "Kikuyu",
    status: "rejected",
    registrationDate: "2023-06-15",
    cattleCount: 12,
  },
]

// This function already exists but is incorrectly named for the import
export async function getFarmers(): Promise<{ success: boolean; farmers?: Farmer[]; error?: string }> {
  try {
    return { success: true, farmers }
  } catch (error) {
    console.error("Error getting farmers:", error)
    return { success: false, error: "Failed to get farmers" }
  }
}

// ADD THIS FUNCTION - This is what your API route is trying to import
export async function getFarmersData(): Promise<{ success: boolean; data?: Farmer[]; error?: string }> {
  try {
    // For now, return the same data as getFarmers
    // You can modify this later to return different data if needed
    return { success: true, data: farmers }
  } catch (error) {
    console.error("Error getting farmers data:", error)
    return { success: false, error: "Failed to get farmers data" }
  }
}

export async function approveFarmer(farmerId: string): Promise<ActionResult> {
  try {
    const farmerIndex = farmers.findIndex((f) => f.id === farmerId)
    if (farmerIndex === -1) return { success: false, error: "Farmer not found" }

    farmers[farmerIndex].status = "active"
    return { success: true, message: `Farmer ${farmers[farmerIndex].name} approved successfully` }
  } catch (error) {
    console.error("Error approving farmer:", error)
    return { success: false, error: "Failed to approve farmer" }
  }
}

export async function rejectFarmer(farmerId: string): Promise<ActionResult> {
  try {
    const farmerIndex = farmers.findIndex((f) => f.id === farmerId)
    if (farmerIndex === -1) return { success: false, error: "Farmer not found" }

    farmers[farmerIndex].status = "rejected"
    return { success: true, message: `Farmer ${farmers[farmerIndex].name} rejected successfully` }
  } catch (error) {
    console.error("Error rejecting farmer:", error)
    return { success: false, error: "Failed to reject farmer" }
  }
}

// Helper function to get a farmer by ID
export async function getFarmerById(farmerId: string): Promise<{ success: boolean; farmer?: Farmer; error?: string }> {
  try {
    const farmer = farmers.find((f) => f.id === farmerId)
    if (!farmer) return { success: false, error: "Farmer not found" }
    
    return { success: true, farmer }
  } catch (error) {
    console.error("Error getting farmer:", error)
    return { success: false, error: "Failed to get farmer" }
  }
}
