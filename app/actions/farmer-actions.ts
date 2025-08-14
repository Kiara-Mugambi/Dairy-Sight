"use server"

interface ActionResult {
  success: boolean
  message?: string
  error?: string
}

// In-memory storage for demonstration
const farmers = [
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

export async function approveFarmer(farmerId: string): Promise<ActionResult> {
  try {
    console.log("Approving farmer:", farmerId)

    const farmerIndex = farmers.findIndex((f) => f.id === farmerId)
    if (farmerIndex === -1) {
      return {
        success: false,
        error: "Farmer not found",
      }
    }

    farmers[farmerIndex].status = "active"

    console.log("Farmer approved successfully:", farmers[farmerIndex])

    return {
      success: true,
      message: `Farmer ${farmers[farmerIndex].name} approved successfully`,
    }
  } catch (error) {
    console.error("Error approving farmer:", error)
    return {
      success: false,
      error: "Failed to approve farmer",
    }
  }
}

export async function rejectFarmer(farmerId: string): Promise<ActionResult> {
  try {
    console.log("Rejecting farmer:", farmerId)

    const farmerIndex = farmers.findIndex((f) => f.id === farmerId)
    if (farmerIndex === -1) {
      return {
        success: false,
        error: "Farmer not found",
      }
    }

    farmers[farmerIndex].status = "rejected"

    console.log("Farmer rejected successfully:", farmers[farmerIndex])

    return {
      success: true,
      message: `Farmer ${farmers[farmerIndex].name} rejected successfully`,
    }
  } catch (error) {
    console.error("Error rejecting farmer:", error)
    return {
      success: false,
      error: "Failed to reject farmer",
    }
  }
}

export async function getFarmers(): Promise<{ success: boolean; farmers?: any[]; error?: string }> {
  try {
    return {
      success: true,
      farmers: farmers,
    }
  } catch (error) {
    console.error("Error getting farmers:", error)
    return {
      success: false,
      error: "Failed to get farmers",
    }
  }
}
