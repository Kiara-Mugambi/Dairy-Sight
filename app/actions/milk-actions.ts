"use server"

import { Database } from "@/lib/database"
import { revalidatePath } from "next/cache"

interface MilkIntakeData {
  farmerId: string
  quantity: number
  quality: "A" | "B" | "C"
}

interface RecordMilkIntakeParams {
  farmerId: string
  quantity: number
  quality: "A" | "B" | "C"
  price?: number
}

interface MilkIntake {
  id: string
  farmerId: string
  farmerName: string
  quantity: number
  quality: "A" | "B" | "C"
  timestamp: string
  price: number
  date: string
  time: string
}

interface ActionResult {
  success: boolean
  message?: string
  error?: string
  intake?: MilkIntake
}

interface StatsResult {
  success: boolean
  stats?: {
    totalQuantity: number
    averageQuality: number
    uniqueFarmers: number
  }
  error?: string
}

interface IntakesResult {
  success: boolean
  intakes?: MilkIntake[]
  error?: string
}

export async function recordMilkIntake(params: RecordMilkIntakeParams) {
  try {
    const { farmerId, quantity, quality, price } = params

    // Calculate price if not provided
    const pricePerLiter = {
      A: 55,
      B: 50,
      C: 45,
    }[quality]

    const totalPrice = price || quantity * pricePerLiter

    // Get farmer details
    const farmer = await Database.getFarmerById(farmerId)
    if (!farmer) {
      return { success: false, error: "Farmer not found" }
    }

    // Create milk intake record
    const milkIntake = await Database.createMilkIntake({
      farmerId,
      farmerName: farmer.name,
      quantity,
      quality,
      price: totalPrice,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
    })

    // Revalidate the page to show updated data
    revalidatePath("/employee/intake")
    revalidatePath("/employee")

    return {
      success: true,
      data: milkIntake,
      message: `Successfully recorded ${quantity}L of Grade ${quality} milk`,
    }
  } catch (error) {
    console.error("Error recording milk intake:", error)
    return {
      success: false,
      error: "Failed to record milk intake. Please try again.",
    }
  }
}

export async function getMilkIntakes(limit?: number): Promise<IntakesResult> {
  try {
    const result = await Database.getMilkIntakes({ limit })
    return {
      success: true,
      intakes: result.intakes,
    }
  } catch (error) {
    console.error("Error fetching milk intakes:", error)
    return { success: false, error: "Failed to fetch milk intakes", intakes: [] }
  }
}

export async function getDailyStats(): Promise<StatsResult> {
  try {
    const today = new Date().toDateString()
    const todayIntakes = await Database.getMilkIntakes({ date: today })

    const totalQuantity = todayIntakes.reduce((sum, intake) => sum + intake.quantity, 0)
    const uniqueFarmers = new Set(todayIntakes.map((intake) => intake.farmerId)).size

    // Calculate average quality (A=3, B=2, C=1)
    const qualitySum = todayIntakes.reduce((sum, intake) => {
      const qualityValue = intake.quality === "A" ? 3 : intake.quality === "B" ? 2 : 1
      return sum + qualityValue
    }, 0)
    const averageQuality = todayIntakes.length > 0 ? qualitySum / todayIntakes.length : 0

    return {
      success: true,
      stats: {
        totalQuantity,
        averageQuality,
        uniqueFarmers,
      },
    }
  } catch (error) {
    console.error("Error getting daily stats:", error)
    return {
      success: false,
      error: "Failed to get daily stats",
    }
  }
}
