import type { Farmer, MilkIntake, Employee } from "./types"

// Mock data for demonstration
const mockFarmers: Farmer[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Kamau",
    phone: "+254712345678",
    email: "john.kamau@email.com",
    idNumber: "12345678",
    farmName: "Kamau Dairy Farm",
    location: "Kiambu",
    county: "Kiambu",
    farmSize: 5,
    cattleCount: 15,
    dailyMilkProduction: 80,
    bankName: "KCB Bank",
    accountNumber: "1234567890",
    accountName: "John Kamau",
    status: "active",
    registrationDate: "2024-01-15",
    approvalDate: "2024-01-16",
    documents: {
      idCopy: "/documents/john_id.pdf",
      farmCertificate: "/documents/john_farm_cert.pdf",
      bankStatement: "/documents/john_bank.pdf",
    },
    totalDeliveries: 45,
    lastDelivery: "2024-01-20",
    name: "John Kamau",
    totalMilkDelivered: 25.5,
  },
  {
    id: "2",
    firstName: "Mary",
    lastName: "Wanjiku",
    phone: "+254723456789",
    email: "mary.wanjiku@email.com",
    idNumber: "23456789",
    farmName: "Wanjiku Dairy",
    location: "Nyeri",
    county: "Nyeri",
    farmSize: 3,
    cattleCount: 10,
    dailyMilkProduction: 60,
    bankName: "Equity Bank",
    accountNumber: "2345678901",
    accountName: "Mary Wanjiku",
    status: "active",
    registrationDate: "2024-01-10",
    approvalDate: "2024-01-11",
    documents: {
      idCopy: "/documents/mary_id.pdf",
      farmCertificate: "/documents/mary_farm_cert.pdf",
    },
    totalDeliveries: 38,
    lastDelivery: "2024-01-19",
    name: "Mary Wanjiku",
    totalMilkDelivered: 18.2,
  },
  {
    id: "3",
    firstName: "Peter",
    lastName: "Mwangi",
    phone: "+254734567890",
    email: "peter.mwangi@email.com",
    idNumber: "34567890",
    farmName: "Mwangi Farm",
    location: "Murang'a",
    county: "Murang'a",
    farmSize: 7,
    cattleCount: 20,
    dailyMilkProduction: 120,
    bankName: "Co-operative Bank",
    accountNumber: "3456789012",
    accountName: "Peter Mwangi",
    status: "active",
    registrationDate: "2024-01-05",
    approvalDate: "2024-01-06",
    documents: {
      idCopy: "/documents/peter_id.pdf",
      farmCertificate: "/documents/peter_farm_cert.pdf",
      bankStatement: "/documents/peter_bank.pdf",
    },
    totalDeliveries: 52,
    lastDelivery: "2024-01-20",
    name: "Peter Mwangi",
    totalMilkDelivered: 32.1,
  },
]

const mockMilkIntakes: MilkIntake[] = [
  {
    id: "1",
    farmerId: "1",
    farmerName: "John Kamau",
    volume: 25.5,
    quality: "A",
    pricePerLiter: 55,
    totalAmount: 1402.5,
    timestamp: new Date().toISOString(),
    recordedBy: "employee1",
    status: "recorded",
  },
  {
    id: "2",
    farmerId: "2",
    farmerName: "Mary Wanjiku",
    volume: 18.2,
    quality: "B",
    pricePerLiter: 50,
    totalAmount: 910,
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    recordedBy: "employee1",
    status: "recorded",
  },
]

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@dairysight.com",
    role: "admin",
    phone: "+254700123456",
    status: "active",
    permissions: ["all"],
    lastLogin: "2024-01-20T10:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@dairysight.com",
    role: "manager",
    phone: "+254700123457",
    status: "active",
    permissions: ["farmers", "intake", "reports"],
    lastLogin: "2024-01-20T09:15:00Z",
    createdAt: "2024-01-02T00:00:00Z",
  },
]

export class Database {
  static farmers = mockFarmers
  static milkIntakes = mockMilkIntakes
  static employees = mockEmployees

  // Farmer methods
  static async getFarmers(filters?: { status?: string; limit?: number }) {
    let farmers = this.farmers

    if (filters?.status) {
      farmers = farmers.filter((f) => f.status === filters.status)
    }

    if (filters?.limit) {
      farmers = farmers.slice(0, filters.limit)
    }

    return { farmers }
  }

  static async getFarmerById(id: string) {
    return this.farmers.find((f) => f.id === id)
  }

  static async createFarmer(farmerData: Partial<Farmer>) {
    const newFarmer: Farmer = {
      id: Date.now().toString(),
      firstName: farmerData.firstName || "",
      lastName: farmerData.lastName || "",
      phone: farmerData.phone || "",
      email: farmerData.email,
      idNumber: farmerData.idNumber || "",
      farmName: farmerData.farmName || "",
      location: farmerData.location || "",
      county: farmerData.county || "",
      farmSize: farmerData.farmSize,
      cattleCount: farmerData.cattleCount || 0,
      dailyMilkProduction: farmerData.dailyMilkProduction,
      bankName: farmerData.bankName || "",
      accountNumber: farmerData.accountNumber || "",
      accountName: farmerData.accountName || "",
      status: farmerData.status || "pending",
      registrationDate: new Date().toISOString().split("T")[0],
      documents: farmerData.documents || {},
      totalDeliveries: 0,
      name: farmerData.name || `${farmerData.firstName} ${farmerData.lastName}`,
      totalMilkDelivered: 0,
    }

    this.farmers.push(newFarmer)
    return newFarmer
  }

  // Milk intake methods
  static async getMilkIntakes(filters?: { limit?: number; date?: string }) {
    let intakes = this.milkIntakes

    if (filters?.date) {
      intakes = intakes.filter(
        (intake) => new Date(intake.timestamp).toDateString() === new Date(filters.date!).toDateString(),
      )
    }

    if (filters?.limit) {
      intakes = intakes.slice(0, filters.limit)
    }

    return { intakes }
  }

  static async createMilkIntake(intakeData: {
    farmerId: string
    farmerName: string
    quantity: number
    quality: "A" | "B" | "C"
    price: number
    date: string
    time: string
  }) {
    const newIntake: MilkIntake = {
      id: Date.now().toString(),
      farmerId: intakeData.farmerId,
      farmerName: intakeData.farmerName,
      volume: intakeData.quantity,
      quality: intakeData.quality,
      pricePerLiter: intakeData.quality === "A" ? 55 : intakeData.quality === "B" ? 50 : 45,
      totalAmount: intakeData.price,
      timestamp: new Date().toISOString(),
      recordedBy: "employee1",
      status: "recorded",
    }

    this.milkIntakes.unshift(newIntake)
    return newIntake
  }

  // Employee methods
  static async getEmployees() {
    return { employees: this.employees }
  }

  static async createEmployee(employeeData: Partial<Employee>) {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: employeeData.name || "",
      email: employeeData.email || "",
      role: employeeData.role || "operator",
      phone: employeeData.phone || "",
      status: employeeData.status || "active",
      permissions: employeeData.permissions || [],
      createdAt: new Date().toISOString(),
    }

    this.employees.push(newEmployee)
    return newEmployee
    // ... all your existing code ...
  }
}
export const db = new Database(); // 
