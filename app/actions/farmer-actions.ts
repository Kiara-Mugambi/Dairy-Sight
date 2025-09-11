"use server"

import fs from "fs/promises"
import path from "path"

interface Farmer {
  id: string
  name: string
  phone: string
  email: string
  location: string
  status: string
  registrationDate: string
  cattleCount: number
}

interface ActionResult {
  success: boolean
  message?: string
  error?: string
  farmers?: Farmer[]
}

const dataFile = path.join(process.cwd(), "data/farmers.json")

// Load farmers
async function loadFarmers(): Promise<Farmer[]> {
  try {
    const data = await fs.readFile(dataFile, "utf-8")
    return JSON.parse(data)
  } catch {
    return [] // empty if file not found
  }
}

// Save farmers
async function saveFarmers(farmers: Farmer[]): Promise<void> {
  await fs.mkdir(path.dirname(dataFile), { recursive: true })
  await fs.writeFile(dataFile, JSON.stringify(farmers, null, 2))
}

// Approve farmer
export async function approveFarmer(farmerId: string): Promise<ActionResult> {
  try {
    const farmers = await loadFarmers()
    const farmerIndex = farmers.findIndex((f) => f.id === farmerId)
    if (farmerIndex === -1) {
      return { success: false, error: "Farmer not found" }
    }
    farmers[farmerIndex].status = "active"
    await saveFarmers(farmers)
    return {
      success: true,
      message: `Farmer ${farmers[farmerIndex].name} approved successfully`,
      farmers,
    }
  } catch (err) {
    console.error("Approve error:", err)
    return { success: false, error: "Failed to approve farmer" }
  }
}

// Reject farmer
export async function rejectFarmer(farmerId: string): Promise<ActionResult> {
  try {
    const farmers = await loadFarmers()
    const farmerIndex = farmers.findIndex((f) => f.id === farmerId)
    if (farmerIndex === -1) {
      return { success: false, error: "Farmer not found" }
    }
    farmers[farmerIndex].status = "rejected"
    await saveFarmers(farmers)
    return {
      success: true,
      message: `Farmer ${farmers[farmerIndex].name} rejected successfully`,
      farmers,
    }
  } catch (err) {
    console.error("Reject error:", err)
    return { success: false, error: "Failed to reject farmer" }
  }
}

// Get all farmers
export async function getFarmers(): Promise<ActionResult> {
  try {
    const farmers = await loadFarmers()
    return { success: true, farmers }
  } catch (err) {
    console.error("Get error:", err)
    return { success: false, error: "Failed to load farmers" }
  }
}
