import { NextResponse } from "next/server"

// Mock settings data
let systemSettings = {
  cooperativeName: "Kiambu Dairy Cooperative",
  email: "admin@kiambudairy.co.ke",
  phone: "+254700123456",
  address: "P.O. Box 123, Kiambu, Kenya",
  commissionRate: 5.0,
  autoApproval: false,
  emailNotifications: true,
  smsNotifications: true,
  paymentMethods: {
    mpesa: true,
    bankTransfer: true,
    cash: false,
  },
  qualityThresholds: {
    premium: 4.5,
    standard: 3.5,
    minimum: 2.5,
  },
  pricing: {
    premiumRate: 60,
    standardRate: 50,
    basicRate: 40,
  },
  operationalHours: {
    start: "06:00",
    end: "18:00",
  },
  maxDailyIntake: 10000,
  currency: "KSh",
  language: "en",
  timezone: "Africa/Nairobi",
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      settings: systemSettings,
    })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // Update settings with new values
    systemSettings = { ...systemSettings, ...body }

    return NextResponse.json({
      success: true,
      settings: systemSettings,
      message: "Settings updated successfully",
    })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
