export interface Farmer {
  id: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  idNumber: string
  farmName: string
  location: string
  county: string
  farmSize?: number
  cattleCount: number
  dailyMilkProduction?: number
  bankName: string
  accountNumber: string
  accountName: string
  status: "pending" | "approved" | "rejected" | "active" | "inactive"
  registrationDate: string
  approvalDate?: string
  documents: {
    idCopy?: string
    farmCertificate?: string
    bankStatement?: string
  }
  totalDeliveries: number
  lastDelivery?: string
}

export interface MilkIntake {
  id: string
  farmerId: string
  farmerName: string
  volume: number
  quality: "A" | "B" | "C"
  pricePerLiter: number
  totalAmount: number
  timestamp: string
  recordedBy: string
  status: "recorded" | "processed" | "paid"
}

export interface MilkOfftake {
  id: string
  buyer: string
  volume: number
  pricePerLiter: number
  totalAmount: number
  commission: number
  netAmount: number
  timestamp: string
  status: "pending" | "processing" | "completed" | "failed"
  type: "automatic" | "manual"
  paymentMethod: "mpesa" | "bank"
  transactionId?: string
}

export interface Employee {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "operator"
  phone: string
  status: "active" | "inactive"
  permissions: string[]
  lastLogin?: string
  createdAt: string
}

export interface Cooperative {
  id: string
  name: string
  registrationNumber?: string
  location: string
  county: string
  chairpersonName: string
  chairpersonPhone: string
  email: string
  bankDetails: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  mpesaDetails: {
    shortcode: string
    passkey: string
  }
  commissionRate: number
  status: "active" | "inactive" | "suspended"
  createdAt: string
}

export interface DashboardStats {
  totalIntake: number
  totalOfftake: number
  currentStock: number
  totalRevenue: number
  commission: number
  activeFarmers: number
  pendingApprovals: number
  todayTransactions: number
}
