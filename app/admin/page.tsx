"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast"
import { approveFarmer, rejectFarmer } from "@/app/actions/farmer-actions"
import {
  Users,
  Droplets,
  TrendingUp,
  CheckCircle,
  XCircle,
  Search,
  Phone,
  MapPin,
  Mail,
  Calendar,
  Settings,
  BarChart3,
  UserCheck,
  CreditCard,
  Shield,
  Eye,
  Plus,
  Building2,
  Banknote,
  Smartphone,
  Download,
  Filter,
  UserPlus,
  Send,
  Edit,
  Trash2,
  Target,
  Activity,
  PieChart,
  Clock,
  Star,
  TrendingDown,
  Package,
  MessageSquare,
  LogOut,
  DollarSign,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface MilkIntake {
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

interface Farmer {
  id: string
  name: string
  phone: string
  email: string
  location: string
  status: "pending" | "active" | "rejected" | "suspended"
  registrationDate: string
  cattleCount?: number
  farmSize?: string
  totalDeliveries?: number
  totalVolume?: number
  totalEarnings?: number
  lastDelivery?: string
  averageQuality?: number
  paymentMethod?: "mpesa" | "bank" | "cash"
  bankDetails?: {
    accountNumber: string
    bankName: string
    branchCode: string
  }
  mpesaNumber?: string
  notes?: string
  county?: string
}

interface Payment {
  id: string
  farmerName: string
  amount: number
  date: string
  status: string
  method: string
  farmerId?: string
  timestamp?: string
  type?: "milk_payment" | "bonus" | "advance" | "penalty"
  description?: string
  processedBy?: string
}

interface Employee {
  id: string
  name: string
  email: string
  role: string
  status: string
  joinDate: string
  phone?: string
  lastLogin?: string
  createdAt?: string
  permissions?: string[]
  salary?: number
  hireDate?: string
  department?: string
}

interface MilkOfftake {
  id: string
  buyer: string
  volume: number
  pricePerLiter: number
  totalAmount: number
  timestamp: string
  status: "pending" | "completed" | "cancelled"
  type: "auto" | "manual"
  paymentMethod: "mpesa" | "bank" | "cash"
}

interface DashboardStats {
  totalIntake: number
  autoOfftake: number
  currentStock: number
  todayRevenue: number
  activeFarmers: number
  todayTransactions: number
  totalRevenue: number
  monthlyRevenue: number
  commission: number
  pendingApprovals: number
  totalEmployees: number
  totalPayments: number
  pendingPayments: number
  completedPayments: number
  failedPayments: number
  averageQuality: number
  topFarmer: string
  monthlyGrowth: number
  stockValue: number
  operatingCosts: number
  netProfit: number
}

interface SystemSettings {
  cooperativeName: string
  email: string
  phone: string
  address: string
  commissionRate: number
  autoApproval: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  mpesaEnabled: boolean
  bankTransferEnabled: boolean
  cashPaymentEnabled: boolean
  gradeAPricing: number
  gradeBPricing: number
  gradeCPricing: number
  operatingHoursStart: string
  operatingHoursEnd: string
  maxDailyIntake: number
  qualityThresholds: {
    fatMin: number
    proteinMin: number
    bacteriaMax: number
  }
  paymentSchedule: "daily" | "weekly" | "monthly"
  minimumPayment: number
  currency: string
  language: string
  timezone: string
  backupFrequency: "daily" | "weekly"
  maintenanceMode: boolean
}

// Helper functions for number formatting
const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) return "0"

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toLocaleString()
}

const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) return "KSh 0"

  if (value >= 1000000) {
    return `KSh ${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `KSh ${(value / 1000).toFixed(1)}k`
  }
  return `KSh ${value.toLocaleString()}`
}

const formatDecimal = (value: number | undefined | null, decimals = 2): string => {
  if (value === undefined || value === null || isNaN(value)) return "0.00"
  return value.toFixed(decimals)
}

// Default data with realistic values
const DEFAULT_STATS: DashboardStats = {
  totalIntake: 4900,
  autoOfftake: 4200,
  currentStock: 700,
  todayRevenue: 245000,
  activeFarmers: 156,
  todayTransactions: 89,
  totalRevenue: 12500000,
  monthlyRevenue: 2100000,
  commission: 625000,
  pendingApprovals: 12,
  totalEmployees: 24,
  totalPayments: 1847,
  pendingPayments: 34,
  completedPayments: 1789,
  failedPayments: 24,
  averageQuality: 4.2,
  topFarmer: "Mary Wanjiku",
  monthlyGrowth: 18.5,
  stockValue: 36400,
  operatingCosts: 180000,
  netProfit: 445000,
}

const DEFAULT_SETTINGS: SystemSettings = {
  cooperativeName: "Kiambu Dairy Cooperative",
  email: "admin@kiambudairy.co.ke",
  phone: "+254700123456",
  address: "P.O. Box 123, Kiambu, Kenya",
  commissionRate: 5.0,
  autoApproval: false,
  emailNotifications: true,
  smsNotifications: true,
  mpesaEnabled: true,
  bankTransferEnabled: true,
  cashPaymentEnabled: true,
  gradeAPricing: 50,
  gradeBPricing: 45,
  gradeCPricing: 40,
  operatingHoursStart: "06:00",
  operatingHoursEnd: "18:00",
  maxDailyIntake: 10000,
  qualityThresholds: {
    fatMin: 3.5,
    proteinMin: 3.2,
    bacteriaMax: 100000,
  },
  paymentSchedule: "weekly",
  minimumPayment: 100,
  currency: "KSh",
  language: "en",
  timezone: "Africa/Nairobi",
  backupFrequency: "daily",
  maintenanceMode: false,
}

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [offtakes, setOfftakes] = useState<MilkOfftake[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS)
  const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SETTINGS)
  const [searchQuery, setSearchQuery] = useState("")
  const [farmerFilter, setFarmerFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [showIntakeForm, setShowIntakeForm] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [showOfftakeForm, setShowOfftakeForm] = useState(false)
  const [selectedFarmerId, setSelectedFarmerId] = useState("")
  const [volume, setVolume] = useState("")
  const [quality, setQuality] = useState<"A" | "B" | "C">("A")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form states
  const [newEmployeeName, setNewEmployeeName] = useState("")
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("")
  const [newEmployeeRole, setNewEmployeeRole] = useState("")
  const [newEmployeeDepartment, setNewEmployeeDepartment] = useState("")
  const [newEmployeeSalary, setNewEmployeeSalary] = useState("")
  const [newEmployeePhone, setNewEmployeePhone] = useState("")

  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "bank" | "cash">("mpesa")
  const [paymentType, setPaymentType] = useState<"milk_payment" | "bonus" | "advance" | "penalty">("milk_payment")
  const [paymentDescription, setPaymentDescription] = useState("")

  // Offtake form states
  const [offtakeBuyer, setOfftakeBuyer] = useState("")
  const [offtakeVolume, setOfftakeVolume] = useState("")
  const [offtakePrice, setOfftakePrice] = useState("52")

  useEffect(() => {
    loadData()

    // Simulate live updates
    const interval = setInterval(() => {
      simulateAutoOfftake()
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)

      // Load farmers
      const farmersResponse = await fetch("/api/farmers")
      if (farmersResponse.ok) {
        const farmersData = await farmersResponse.json()
        setFarmers(farmersData.farmers || [])
      }

      // Load employees
      const employeesResponse = await fetch("/api/employees")
      if (employeesResponse.ok) {
        const employeesData = await employeesResponse.json()
        setEmployees(employeesData.employees || [])
      }

      // Load payments
      const paymentsResponse = await fetch("/api/payments")
      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json()
        setPayments(paymentsData.payments || [])
      }

      // Load offtakes
      const offtakesResponse = await fetch("/api/milk-offtake")
      if (offtakesResponse.ok) {
        const offtakesData = await offtakesResponse.json()
        setOfftakes(offtakesData.offtakes || [])
      }
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const simulateAutoOfftake = () => {
    const offtakeAmount = Math.floor(Math.random() * 150) + 100 // 100-250L
    const buyerNames = ["KCC", "Brookside", "New KCC", "Githunguri Dairy", "Fresh Dairy"]
    const buyer = buyerNames[Math.floor(Math.random() * buyerNames.length)]
    const pricePerLiter = 52

    const newOfftake: MilkOfftake = {
      id: Date.now().toString(),
      buyer,
      volume: offtakeAmount,
      pricePerLiter,
      totalAmount: offtakeAmount * pricePerLiter,
      timestamp: new Date().toISOString(),
      status: "completed",
      type: "auto",
      paymentMethod: "bank",
    }

    setOfftakes((prev) => [newOfftake, ...prev])
    setStats((prev) => ({
      ...prev,
      autoOfftake: prev.autoOfftake + offtakeAmount,
      currentStock: Math.max(0, prev.currentStock - offtakeAmount),
      todayRevenue: prev.todayRevenue + offtakeAmount * pricePerLiter,
      todayTransactions: prev.todayTransactions + 1,
    }))

    toast({
      title: "Auto Offtake Completed",
      description: `${offtakeAmount}L sold to ${buyer} - ${formatCurrency(offtakeAmount * pricePerLiter)}`,
    })
  }

  const handleRecordIntake = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFarmerId || !volume) {
      toast({
        title: "Validation Error",
        description: "Please select a farmer and enter volume",
        variant: "destructive",
      })
      return
    }

    const volumeNum = Number.parseFloat(volume)
    if (isNaN(volumeNum) || volumeNum <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid volume",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const selectedFarmer = farmers.find((f) => f.id === selectedFarmerId)
      if (!selectedFarmer) {
        throw new Error("Farmer not found")
      }

      const pricePerLiter =
        quality === "A" ? settings.gradeAPricing : quality === "B" ? settings.gradeBPricing : settings.gradeCPricing
      const totalAmount = volumeNum * pricePerLiter

      // Update farmer stats
      setFarmers((prev) =>
        prev.map((farmer) =>
          farmer.id === selectedFarmerId
            ? {
                ...farmer,
                totalDeliveries: (farmer.totalDeliveries || 0) + 1,
                totalVolume: (farmer.totalVolume || 0) + volumeNum,
                totalEarnings: (farmer.totalEarnings || 0) + totalAmount,
                lastDelivery: new Date().toISOString().split("T")[0],
              }
            : farmer,
        ),
      )

      // Update stats
      setStats((prev) => ({
        ...prev,
        totalIntake: prev.totalIntake + volumeNum,
        currentStock: prev.currentStock + volumeNum,
        todayRevenue: prev.todayRevenue + totalAmount,
        todayTransactions: prev.todayTransactions + 1,
      }))

      // Reset form
      setSelectedFarmerId("")
      setVolume("")
      setQuality("A")
      setShowIntakeForm(false)

      toast({
        title: "Success!",
        description: `Recorded ${volumeNum}L from ${selectedFarmer.name}`,
      })
    } catch (error) {
      console.error("Error recording intake:", error)
      toast({
        title: "Error",
        description: "Failed to record milk intake",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFarmerId || !paymentAmount) {
      toast({
        title: "Validation Error",
        description: "Please select a farmer and enter amount",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(paymentAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const selectedFarmer = farmers.find((f) => f.id === selectedFarmerId)
      if (!selectedFarmer) {
        throw new Error("Farmer not found")
      }

      const paymentData = {
        farmerId: selectedFarmerId,
        farmerName: selectedFarmer.name,
        amount,
        method: paymentMethod,
        type: paymentType,
        description: paymentDescription || `${paymentType.replace("_", " ")} payment`,
      }

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      if (response.ok) {
        const result = await response.json()
        setPayments((prev) => [result.payment, ...prev])
        setStats((prev) => ({
          ...prev,
          totalPayments: prev.totalPayments + 1,
          pendingPayments: prev.pendingPayments + 1,
        }))

        // Reset form
        setSelectedFarmerId("")
        setPaymentAmount("")
        setPaymentDescription("")
        setShowPaymentForm(false)

        toast({
          title: "Payment Initiated",
          description: `${formatCurrency(amount)} payment to ${selectedFarmer.name} is being processed`,
        })

        // Simulate payment completion after 3 seconds
        setTimeout(() => {
          setPayments((prev) =>
            prev.map((payment) => (payment.id === result.payment.id ? { ...payment, status: "completed" } : payment)),
          )
          setStats((prev) => ({
            ...prev,
            pendingPayments: prev.pendingPayments - 1,
            completedPayments: prev.completedPayments + 1,
          }))

          toast({
            title: "Payment Completed",
            description: `${formatCurrency(amount)} successfully sent to ${selectedFarmer.name}`,
          })
        }, 3000)
      } else {
        throw new Error("Failed to process payment")
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRecordOfftake = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!offtakeBuyer || !offtakeVolume) {
      toast({
        title: "Validation Error",
        description: "Please enter buyer and volume",
        variant: "destructive",
      })
      return
    }

    const volumeNum = Number.parseFloat(offtakeVolume)
    const priceNum = Number.parseFloat(offtakePrice)

    if (isNaN(volumeNum) || volumeNum <= 0 || isNaN(priceNum) || priceNum <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter valid volume and price",
        variant: "destructive",
      })
      return
    }

    if (volumeNum > stats.currentStock) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${formatNumber(stats.currentStock)}L available in stock`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const totalAmount = volumeNum * priceNum
      const commissionAmount = totalAmount * (settings.commissionRate / 100)
      const farmerPayment = totalAmount - commissionAmount

      const offtakeData = {
        buyer: offtakeBuyer,
        volume: volumeNum,
        pricePerLiter: priceNum,
        type: "manual",
        paymentMethod: "bank",
      }

      const response = await fetch("/api/milk-offtake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offtakeData),
      })

      if (response.ok) {
        const result = await response.json()
        setOfftakes((prev) => [result.offtake, ...prev])
        setStats((prev) => ({
          ...prev,
          autoOfftake: prev.autoOfftake + volumeNum,
          currentStock: Math.max(0, prev.currentStock - volumeNum),
          todayRevenue: prev.todayRevenue + totalAmount,
          todayTransactions: prev.todayTransactions + 1,
          commission: prev.commission + commissionAmount,
        }))

        // Reset form
        setOfftakeBuyer("")
        setOfftakeVolume("")
        setOfftakePrice("52")
        setShowOfftakeForm(false)

        toast({
          title: "Sale Recorded Successfully!",
          description: `${volumeNum}L sold to ${offtakeBuyer} • DairySight Commission: ${formatCurrency(commissionAmount)} • Farmer Payment: ${formatCurrency(farmerPayment)}`,
        })
      } else {
        throw new Error("Failed to record offtake")
      }
    } catch (error) {
      console.error("Error recording offtake:", error)
      toast({
        title: "Error",
        description: "Failed to record milk offtake",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApproveFarmer = async (farmerId: string, farmerName: string) => {
    try {
      const result = await approveFarmer(farmerId)
      if (result.success) {
        toast({
          title: "Farmer Approved",
          description: `${farmerName} has been approved successfully`,
        })

        // Update local state immediately
        setFarmers((prevFarmers) =>
          prevFarmers.map((farmer) => (farmer.id === farmerId ? { ...farmer, status: "active" as const } : farmer)),
        )
        setStats((prev) => ({
          ...prev,
          activeFarmers: prev.activeFarmers + 1,
          pendingApprovals: prev.pendingApprovals - 1,
        }))
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to approve farmer",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error approving farmer:", error)
      toast({
        title: "Error",
        description: "Failed to approve farmer",
        variant: "destructive",
      })
    }
  }

  const handleRejectFarmer = async (farmerId: string, farmerName: string) => {
    try {
      const result = await rejectFarmer(farmerId)
      if (result.success) {
        toast({
          title: "Farmer Rejected",
          description: `${farmerName} has been rejected`,
          variant: "destructive",
        })

        // Update local state immediately
        setFarmers((prevFarmers) =>
          prevFarmers.map((farmer) => (farmer.id === farmerId ? { ...farmer, status: "rejected" as const } : farmer)),
        )
        setStats((prev) => ({
          ...prev,
          pendingApprovals: prev.pendingApprovals - 1,
        }))
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to reject farmer",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error rejecting farmer:", error)
      toast({
        title: "Error",
        description: "Failed to reject farmer",
        variant: "destructive",
      })
    }
  }

  const handleAddEmployee = async () => {
    if (!newEmployeeName || !newEmployeeEmail || !newEmployeeRole || !newEmployeeDepartment) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required employee details",
        variant: "destructive",
      })
      return
    }

    try {
      const employeeData = {
        name: newEmployeeName,
        email: newEmployeeEmail,
        role: newEmployeeRole,
        department: newEmployeeDepartment,
        salary: newEmployeeSalary ? Number.parseFloat(newEmployeeSalary) : undefined,
        phone: newEmployeePhone || "+254700000000",
      }

      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      })

      if (response.ok) {
        const result = await response.json()
        setEmployees((prev) => [result.employee, ...prev])
        setStats((prev) => ({
          ...prev,
          totalEmployees: prev.totalEmployees + 1,
        }))

        toast({
          title: "Success!",
          description: "Employee added successfully",
        })

        // Reset form
        setNewEmployeeName("")
        setNewEmployeeEmail("")
        setNewEmployeeRole("")
        setNewEmployeeDepartment("")
        setNewEmployeeSalary("")
        setNewEmployeePhone("")
        setShowEmployeeForm(false)
      } else {
        throw new Error("Failed to add employee")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add employee",
        variant: "destructive",
      })
    }
  }

  const handleSaveSettings = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings Saved",
        description: "System settings have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "mpesa":
        return <Smartphone className="h-4 w-4 text-green-600" />
      case "bank":
        return <Building2 className="h-4 w-4 text-blue-600" />
      case "cash":
        return <Banknote className="h-4 w-4 text-orange-600" />
      default:
        return <CreditCard className="h-4 w-4 text-gray-600" />
    }
  }

  // Filter functions
  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || farmer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.date.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = paymentFilter === "all" || payment.status === paymentFilter
    return matchesSearch && matchesFilter
  })

  const pendingFarmers = farmers.filter((f) => f.status === "pending")
  const activeFarmers = farmers.filter((f) => f.status === "active")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DairySight Admin</h1>
                <p className="text-sm text-gray-600">Complete cooperative management</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Badge variant="outline" className="px-3 py-1">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date().toLocaleDateString()}
            </Badge>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">AD</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Administrator
                </p>
              </div>
            </div>

            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="farmers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Farmers
              {pendingFarmers.length > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {pendingFarmers.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Operations
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Employees
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Admin Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Administrator Access</h3>
                  <p className="text-sm text-blue-800 mt-1">
                    You have full access to all cooperative operations, financial data, farmer management, and system
                    settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Intake</p>
                      <p className="text-3xl font-bold text-blue-600">{formatNumber(stats.totalIntake)}L</p>
                      <p className="text-xs text-green-600 mt-1">+12.5% from yesterday</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Droplets className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                      <p className="text-xs text-blue-600 mt-1">All-time earnings</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Farmers</p>
                      <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.activeFarmers)}</p>
                      <p className="text-xs text-purple-600 mt-1">+8 new this month</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">DairySight Commission</p>
                      <p className="text-3xl font-bold text-orange-600">{formatCurrency(stats.commission)}</p>
                      <p className="text-xs text-green-600 mt-1">
                        DairySight profit • {settings.commissionRate}% belongs to DairySight
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <Button onClick={() => setShowIntakeForm(!showIntakeForm)}>
                <Plus className="h-4 w-4 mr-2" />
                Record Intake
              </Button>
              <Button onClick={() => setShowPaymentForm(!showPaymentForm)} variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
              <Button onClick={() => setShowOfftakeForm(!showOfftakeForm)} variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Record Offtake
              </Button>
              <Link href="/employee">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Employee View
                </Button>
              </Link>
            </div>

            {/* Quick Action Forms */}
            {showIntakeForm && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-blue-600" />
                    Record Milk Intake
                  </CardTitle>
                  <CardDescription>Record new milk delivery from farmer</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRecordIntake} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="farmer">Select Farmer</Label>
                      <Select value={selectedFarmerId} onValueChange={setSelectedFarmerId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose farmer" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeFarmers.map((farmer) => (
                            <SelectItem key={farmer.id} value={farmer.id}>
                              {farmer.name} - {farmer.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="volume">Volume (Liters)</Label>
                      <Input
                        id="volume"
                        type="number"
                        step="0.1"
                        min="0"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        placeholder="Enter volume"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quality">Quality Grade</Label>
                      <Select value={quality} onValueChange={(value: "A" | "B" | "C") => setQuality(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Grade A ({formatCurrency(settings.gradeAPricing)}/L)</SelectItem>
                          <SelectItem value="B">Grade B ({formatCurrency(settings.gradeBPricing)}/L)</SelectItem>
                          <SelectItem value="C">Grade C ({formatCurrency(settings.gradeCPricing)}/L)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end gap-2">
                      <Button type="submit" disabled={isSubmitting} className="flex-1">
                        {isSubmitting ? "Recording..." : "Record"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowIntakeForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {showPaymentForm && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-green-600" />
                    Process Payment
                  </CardTitle>
                  <CardDescription>Send payment to farmer</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProcessPayment} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="paymentFarmer">Select Farmer</Label>
                      <Select value={selectedFarmerId} onValueChange={setSelectedFarmerId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose farmer" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeFarmers.map((farmer) => (
                            <SelectItem key={farmer.id} value={farmer.id}>
                              {farmer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="paymentAmount">Amount (KSh)</Label>
                      <Input
                        id="paymentAmount"
                        type="number"
                        min="0"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div>
                      <Label htmlFor="paymentMethod">Method</Label>
                      <Select
                        value={paymentMethod}
                        onValueChange={(value: "mpesa" | "bank" | "cash") => setPaymentMethod(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mpesa">M-Pesa</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="paymentType">Type</Label>
                      <Select
                        value={paymentType}
                        onValueChange={(value: "milk_payment" | "bonus" | "advance" | "penalty") =>
                          setPaymentType(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="milk_payment">Milk Payment</SelectItem>
                          <SelectItem value="bonus">Bonus</SelectItem>
                          <SelectItem value="advance">Advance</SelectItem>
                          <SelectItem value="penalty">Penalty</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end gap-2">
                      <Button type="submit" disabled={isSubmitting} className="flex-1">
                        {isSubmitting ? "Processing..." : "Process"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowPaymentForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                  <div className="mt-4">
                    <Label htmlFor="paymentDescription">Description (Optional)</Label>
                    <Input
                      id="paymentDescription"
                      value={paymentDescription}
                      onChange={(e) => setPaymentDescription(e.target.value)}
                      placeholder="Payment description"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {showOfftakeForm && (
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    Record Milk Offtake
                  </CardTitle>
                  <CardDescription>Record milk sale to buyer</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRecordOfftake} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="buyer">Buyer Name</Label>
                      <Input
                        id="buyer"
                        value={offtakeBuyer}
                        onChange={(e) => setOfftakeBuyer(e.target.value)}
                        placeholder="Enter buyer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="offtakeVolume">Volume (Liters)</Label>
                      <Input
                        id="offtakeVolume"
                        type="number"
                        step="0.1"
                        min="0"
                        value={offtakeVolume}
                        onChange={(e) => setOfftakeVolume(e.target.value)}
                        placeholder="Enter volume"
                      />
                    </div>
                    <div>
                      <Label htmlFor="offtakePrice">Price per Liter (KSh)</Label>
                      <Input
                        id="offtakePrice"
                        type="number"
                        step="0.1"
                        min="0"
                        value={offtakePrice}
                        onChange={(e) => setOfftakePrice(e.target.value)}
                        placeholder="Enter price"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <Button type="submit" disabled={isSubmitting} className="flex-1">
                        {isSubmitting ? "Recording..." : "Record"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowOfftakeForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Farmer Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Pending Approvals
                    <Badge variant="outline" className="ml-auto">
                      {pendingFarmers.length} pending
                    </Badge>
                  </CardTitle>
                  <CardDescription>Farmer applications requiring approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {pendingFarmers.map((farmer) => (
                      <div
                        key={farmer.id}
                        className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{farmer.name}</p>
                            <p className="text-xs text-gray-600">{farmer.phone}</p>
                            <p className="text-xs text-gray-600">
                              {farmer.location} • {farmer.cattleCount} cattle
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveFarmer(farmer.id, farmer.name)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                            onClick={() => handleRejectFarmer(farmer.id, farmer.name)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {pendingFarmers.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No pending approvals</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Live Payment Stream */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Live Payment Stream
                    <Badge variant="outline" className="ml-auto">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Live
                    </Badge>
                  </CardTitle>
                  <CardDescription>Real-time payment processing updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {payments.slice(0, 10).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getPaymentIcon(payment.method)}
                          <div>
                            <p className="font-medium text-sm">{payment.farmerName}</p>
                            <p className="text-xs text-gray-600">{payment.id}</p>
                            <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleTimeString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{formatCurrency(payment.amount)}</p>
                          <Badge className={`text-xs ${getStatusColor(payment.status)}`}>{payment.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Farmers Tab */}
          <TabsContent value="farmers" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Farmers ({farmers.length})</SelectItem>
                    <SelectItem value="active">
                      Active ({farmers.filter((f) => f.status === "active").length})
                    </SelectItem>
                    <SelectItem value="pending">
                      Pending ({farmers.filter((f) => f.status === "pending").length})
                    </SelectItem>
                    <SelectItem value="suspended">
                      Suspended ({farmers.filter((f) => f.status === "suspended").length})
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Farmer
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Farmer Directory</CardTitle>
                <CardDescription>Manage all farmers in your cooperative</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search farmers by name, location, or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredFarmers.map((farmer) => (
                    <div key={farmer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{farmer.name}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {farmer.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {farmer.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {farmer.cattleCount} cattle
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>Deliveries: {farmer.totalDeliveries || 0}</span>
                            <span>Volume: {formatNumber(farmer.totalVolume || 0)}L</span>
                            <span>Earnings: {formatCurrency(farmer.totalEarnings || 0)}</span>
                            {farmer.averageQuality && farmer.averageQuality > 0 && (
                              <span>Quality: {formatDecimal(farmer.averageQuality, 1)}/5</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(farmer.status)}>{farmer.status}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {farmer.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveFarmer(farmer.id, farmer.name)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectFarmer(farmer.id, farmer.name)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operations Tab - Combined Intake/Offtake */}
          <TabsContent value="operations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Milk Operations Management</h3>
                <p className="text-gray-600">Monitor intake vs offtake balance and record transactions</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button onClick={() => setShowIntakeForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Record Intake
                </Button>
                <Button onClick={() => setShowOfftakeForm(true)} variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Record Sale
                </Button>
              </div>
            </div>

            {/* Balance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Intake Today</p>
                      <p className="text-2xl font-bold text-blue-600">{formatNumber(stats.totalIntake)}L</p>
                      <p className="text-xs text-blue-600">Milk received from farmers</p>
                    </div>
                    <Droplets className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Offtake Today</p>
                      <p className="text-2xl font-bold text-green-600">{formatNumber(stats.autoOfftake)}L</p>
                      <p className="text-xs text-green-600">Milk sold to buyers</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Stock</p>
                      <p className="text-2xl font-bold text-purple-600">{formatNumber(stats.currentStock)}L</p>
                      <p className="text-xs text-purple-600">Available inventory</p>
                    </div>
                    <Package className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border-l-4 ${stats.totalIntake >= stats.autoOfftake ? "border-l-green-500" : "border-l-red-500"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Balance Status</p>
                      <p
                        className={`text-2xl font-bold ${stats.totalIntake >= stats.autoOfftake ? "text-green-600" : "text-red-600"}`}
                      >
                        {stats.totalIntake >= stats.autoOfftake ? "BALANCED" : "DEFICIT"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {stats.totalIntake >= stats.autoOfftake
                          ? `+${formatNumber(stats.totalIntake - stats.autoOfftake)}L surplus`
                          : `${formatNumber(stats.autoOfftake - stats.totalIntake)}L shortage`}
                      </p>
                    </div>
                    {stats.totalIntake >= stats.autoOfftake ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Action Forms */}
            {showIntakeForm && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-blue-600" />
                    Record Milk Intake
                  </CardTitle>
                  <CardDescription>Record new milk delivery from farmer</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRecordIntake} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="farmer">Select Farmer</Label>
                      <Select value={selectedFarmerId} onValueChange={setSelectedFarmerId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose farmer" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeFarmers.map((farmer) => (
                            <SelectItem key={farmer.id} value={farmer.id}>
                              {farmer.name} - {farmer.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="volume">Volume (Liters)</Label>
                      <Input
                        id="volume"
                        type="number"
                        step="0.1"
                        min="0"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        placeholder="Enter volume"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quality">Quality Grade</Label>
                      <Select value={quality} onValueChange={(value: "A" | "B" | "C") => setQuality(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Grade A ({formatCurrency(settings.gradeAPricing)}/L)</SelectItem>
                          <SelectItem value="B">Grade B ({formatCurrency(settings.gradeBPricing)}/L)</SelectItem>
                          <SelectItem value="C">Grade C ({formatCurrency(settings.gradeCPricing)}/L)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end gap-2">
                      <Button type="submit" disabled={isSubmitting} className="flex-1">
                        {isSubmitting ? "Recording..." : "Record"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowIntakeForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {showOfftakeForm && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-green-600" />
                    Record Milk Sale
                  </CardTitle>
                  <CardDescription>Record manual milk sale to buyer</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRecordOfftake} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="buyer">Buyer/Company</Label>
                      <Select value={offtakeBuyer} onValueChange={setOfftakeBuyer}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select buyer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="KCC">Kenya Cooperative Creameries (KCC)</SelectItem>
                          <SelectItem value="Brookside">Brookside Dairy</SelectItem>
                          <SelectItem value="New KCC">New KCC</SelectItem>
                          <SelectItem value="Githunguri Dairy">Githunguri Dairy</SelectItem>
                          <SelectItem value="Fresh Dairy">Fresh Dairy</SelectItem>
                          <SelectItem value="Other">Other Buyer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="offtakeVolume">Volume (Liters)</Label>
                      <Input
                        id="offtakeVolume"
                        type="number"
                        step="0.1"
                        min="0"
                        max={stats.currentStock}
                        value={offtakeVolume}
                        onChange={(e) => setOfftakeVolume(e.target.value)}
                        placeholder="Enter volume"
                      />
                      <p className="text-xs text-gray-500 mt-1">Available: {formatNumber(stats.currentStock)}L</p>
                    </div>
                    <div>
                      <Label htmlFor="offtakePrice">Price per Liter (KSh)</Label>
                      <Input
                        id="offtakePrice"
                        type="number"
                        step="0.1"
                        min="0"
                        value={offtakePrice}
                        onChange={(e) => setOfftakePrice(e.target.value)}
                        placeholder="Enter price"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <Button type="submit" disabled={isSubmitting} className="flex-1">
                        {isSubmitting ? "Recording..." : "Record Sale"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowOfftakeForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                  {offtakeVolume && offtakePrice && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Total Sale Amount:</span>
                        <span className="font-bold">
                          {formatCurrency(
                            Number.parseFloat(offtakeVolume || "0") * Number.parseFloat(offtakePrice || "0"),
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>DairySight Commission ({settings.commissionRate}%):</span>
                        <span className="font-bold text-orange-600">
                          {formatCurrency(
                            Number.parseFloat(offtakeVolume || "0") *
                              Number.parseFloat(offtakePrice || "0") *
                              (settings.commissionRate / 100),
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>THEIR Payment ({100 - settings.commissionRate}%):</span>
                        <span className="font-bold text-green-600">
                          {formatCurrency(
                            Number.parseFloat(offtakeVolume || "0") *
                              Number.parseFloat(offtakePrice || "0") *
                              ((100 - settings.commissionRate) / 100),
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Intake vs Offtake Comparison Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Intake vs Offtake Comparison
                  </CardTitle>
                  <CardDescription>Daily volume comparison to track balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-end justify-between gap-2 px-4">
                    {[
                      { time: "06:00", intake: 450, offtake: 0 },
                      { time: "08:00", intake: 680, offtake: 200 },
                      { time: "10:00", intake: 520, offtake: 450 },
                      { time: "12:00", intake: 750, offtake: 680 },
                      { time: "14:00", intake: 620, offtake: 520 },
                      { time: "16:00", intake: 580, offtake: 750 },
                      { time: "18:00", intake: 490, offtake: 620 },
                    ].map((data, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        <div className="flex flex-col items-center gap-1 h-60 justify-end">
                          <div
                            className="w-8 bg-blue-500 rounded-t"
                            style={{ height: `${(data.intake / 800) * 240}px` }}
                            title={`Intake: ${data.intake}L`}
                          />
                          <div
                            className="w-8 bg-green-500 rounded-t"
                            style={{ height: `${(data.offtake / 800) * 240}px` }}
                            title={`Offtake: ${data.offtake}L`}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{data.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Intake (Received)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Offtake (Sold)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Simplified Revenue Info - No Commission Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Revenue Summary
                  </CardTitle>
                  <CardDescription>Total sales and farmer payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div>
                        <p className="font-bold text-blue-900">Total Sales Revenue</p>
                        <p className="text-sm text-blue-700">Complete income from all milk sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-blue-900">{formatCurrency(stats.totalRevenue)}</p>
                        <p className="text-sm text-blue-700">Gross sales income</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-900">Farmer Payments</p>
                        <p className="text-sm text-green-700">Total payments to milk suppliers</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-900">
                          {formatCurrency(stats.totalRevenue * ((100 - settings.commissionRate) / 100))}
                        </p>
                        <p className="text-sm text-green-700">Paid to farmers</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">Processing & Operations</p>
                          <p className="text-sm text-gray-700">System processing and operational costs</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">Handled automatically</p>
                          <p className="text-sm text-gray-700">Managed by system</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Intake */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    Recent Intake
                  </CardTitle>
                  <CardDescription>Latest milk deliveries from farmers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {[
                      { farmer: "John Kamau", volume: 25.5, quality: "A", amount: 1275, time: "08:30" },
                      { farmer: "Mary Wanjiku", volume: 32.0, quality: "A", amount: 1600, time: "08:15" },
                      { farmer: "Peter Mwangi", volume: 18.5, quality: "B", amount: 832, time: "08:00" },
                      { farmer: "Grace Njeri", volume: 28.0, quality: "A", amount: 1400, time: "07:45" },
                      { farmer: "Samuel Kiprotich", volume: 22.5, quality: "B", amount: 1012, time: "07:30" },
                    ].map((intake, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Droplets className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{intake.farmer}</p>
                            <p className="text-xs text-gray-600">
                              {intake.volume}L • Grade {intake.quality} • {intake.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{formatCurrency(intake.amount)}</p>
                          <Badge className="text-xs bg-blue-100 text-blue-800">recorded</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Offtake */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Recent Sales
                    <Badge variant="outline" className="ml-auto">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Live
                    </Badge>
                  </CardTitle>
                  <CardDescription>Latest milk sales to buyers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {offtakes.slice(0, 5).map((offtake) => (
                      <div key={offtake.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              offtake.type === "auto" ? "bg-green-100" : "bg-purple-100"
                            }`}
                          >
                            {offtake.type === "auto" ? (
                              <Zap className="h-5 w-5 text-green-600" />
                            ) : (
                              <Users className="h-5 w-5 text-purple-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{offtake.buyer}</p>
                            <p className="text-xs text-gray-600">
                              {formatNumber(offtake.volume)}L • {formatCurrency(offtake.pricePerLiter)}/L •{" "}
                              {new Date(offtake.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{formatCurrency(offtake.totalAmount)}</p>
                          <div className="text-xs text-orange-600 font-medium">
                            DairySight cut: {formatCurrency(offtake.totalAmount * (settings.commissionRate / 100))}
                          </div>
                        </div>
                      </div>
                    ))}
                    {offtakes.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No sales recorded yet</p>
                        <p className="text-sm">Milk sales will appear here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments ({payments.length})</SelectItem>
                    <SelectItem value="completed">Completed ({stats.completedPayments})</SelectItem>
                    <SelectItem value="pending">Pending ({stats.pendingPayments})</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed ({stats.failedPayments})</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={() => setShowPaymentForm(true)}>
                  <Send className="h-4 w-4 mr-2" />
                  Process Payment
                </Button>
              </div>
            </div>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Payments</p>
                      <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalPayments)}</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-green-900">{formatNumber(stats.completedPayments)}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-900">{formatNumber(stats.pendingPayments)}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Failed</p>
                      <p className="text-2xl font-bold text-red-900">{formatNumber(stats.failedPayments)}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Complete payment transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getPaymentIcon(payment.method)}
                        <div>
                          <p className="font-medium">{payment.farmerName}</p>
                          <p className="text-sm text-gray-600">{payment.id}</p>
                          <p className="text-xs text-gray-500">
                            {payment.description} • {new Date(payment.date).toLocaleString()}
                          </p>
                          {payment.processedBy && (
                            <p className="text-xs text-gray-500">Processed by: {payment.processedBy}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatCurrency(payment.amount)}</p>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                        <p className="text-xs text-gray-500 mt-1 capitalize">{payment.type?.replace("_", " ")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Employee Management</h3>
                <p className="text-gray-600">Manage cooperative staff and roles</p>
              </div>
              <Button onClick={() => setShowEmployeeForm(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>

            {showEmployeeForm && (
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-purple-600" />
                    Add New Employee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="employeeName">Full Name</Label>
                      <Input
                        id="employeeName"
                        value={newEmployeeName}
                        onChange={(e) => setNewEmployeeName(e.target.value)}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="employeeEmail">Email</Label>
                      <Input
                        id="employeeEmail"
                        type="email"
                        value={newEmployeeEmail}
                        onChange={(e) => setNewEmployeeEmail(e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="employeePhone">Phone Number</Label>
                      <Input
                        id="employeePhone"
                        type="tel"
                        value={newEmployeePhone}
                        onChange={(e) => setNewEmployeePhone(e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="employeeRole">Role</Label>
                      <Select value={newEmployeeRole} onValueChange={setNewEmployeeRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operator">Operator</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="accountant">Accountant</SelectItem>
                          <SelectItem value="quality_controller">Quality Controller</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="employeeDepartment">Department</Label>
                      <Select value={newEmployeeDepartment} onValueChange={setNewEmployeeDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Quality Control">Quality Control</SelectItem>
                          <SelectItem value="Administration">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="employeeSalary">Salary (Optional)</Label>
                      <Input
                        id="employeeSalary"
                        type="number"
                        value={newEmployeeSalary}
                        onChange={(e) => setNewEmployeeSalary(e.target.value)}
                        placeholder="Enter salary"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <Button onClick={handleAddEmployee} className="flex-1">
                        Add Employee
                      </Button>
                      <Button variant="outline" onClick={() => setShowEmployeeForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Current Employees ({employees.length})</CardTitle>
                <CardDescription>All cooperative staff members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <UserCheck className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.email}</p>
                          <p className="text-sm text-gray-600">{employee.phone}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>Dept: {employee.department}</span>
                            <span>Hired: {new Date(employee.joinDate).toLocaleDateString()}</span>
                            {employee.salary && <span>Salary: {formatCurrency(employee.salary)}</span>}
                            {employee.lastLogin && (
                              <span>Last login: {new Date(employee.lastLogin).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            employee.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : employee.role === "manager"
                                ? "bg-blue-100 text-blue-800"
                                : employee.role === "accountant"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                          }
                        >
                          {employee.role.replace("_", " ")}
                        </Badge>
                        <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Net Profit</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.netProfit)}</p>
                      <p className="text-xs text-green-600">+{formatDecimal(stats.monthlyGrowth, 1)}% growth</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Operating Costs</p>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(stats.operatingCosts)}</p>
                      <p className="text-xs text-red-600">Monthly expenses</p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Stock Value</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.stockValue)}</p>
                      <p className="text-xs text-blue-600">Current inventory</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Top Farmer</p>
                      <p className="text-lg font-bold text-purple-600">{stats.topFarmer}</p>
                      <p className="text-xs text-purple-600">Best performer</p>
                    </div>
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Distribution</CardTitle>
                  <CardDescription>How sales revenue is split between US and THEM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-900">THEIR Payments</p>
                        <p className="text-sm text-green-700">What FARMERS receive from milk sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-900">{100 - settings.commissionRate}%</p>
                        <p className="text-sm text-green-700">
                          {formatCurrency(stats.totalRevenue * ((100 - settings.commissionRate) / 100))}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                      <div>
                        <p className="font-bold text-orange-900">DairySight Commission</p>
                        <p className="text-sm text-orange-700">What DairySight (cooperative) earns from operations</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-900">{settings.commissionRate}%</p>
                        <p className="text-sm text-orange-700">{formatCurrency(stats.commission)}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-blue-900">Total Sales Revenue</p>
                          <p className="text-sm text-blue-700">Complete income from all milk sales</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-2xl text-blue-900">{formatCurrency(stats.totalRevenue)}</p>
                          <p className="text-sm text-blue-700">Gross sales income</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Distribution</CardTitle>
                  <CardDescription>Milk quality grades breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Grade A (Premium)</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Grade B (Standard)</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Grade C (Basic)</span>
                        <span>5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quality Control Tab */}
          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Quality</p>
                      <p className="text-3xl font-bold text-blue-600">{formatDecimal(stats.averageQuality, 1)}/5.0</p>
                      <p className="text-xs text-blue-600">Overall rating</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tests Today</p>
                      <p className="text-3xl font-bold text-green-600">47</p>
                      <p className="text-xs text-green-600">Quality tests</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Rejections</p>
                      <p className="text-3xl font-bold text-red-600">3</p>
                      <p className="text-xs text-red-600">Failed quality</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quality Standards</CardTitle>
                <CardDescription>Current quality thresholds and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Minimum Fat Content</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.1"
                        value={settings.qualityThresholds.fatMin}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            qualityThresholds: {
                              ...prev.qualityThresholds,
                              fatMin: Number.parseFloat(e.target.value),
                            },
                          }))
                        }
                      />
                      <span className="text-sm text-gray-600">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Protein Content</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.1"
                        value={settings.qualityThresholds.proteinMin}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            qualityThresholds: {
                              ...prev.qualityThresholds,
                              proteinMin: Number.parseFloat(e.target.value),
                            },
                          }))
                        }
                      />
                      <span className="text-sm text-gray-600">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Bacteria Count</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={settings.qualityThresholds.bacteriaMax}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            qualityThresholds: {
                              ...prev.qualityThresholds,
                              bacteriaMax: Number.parseInt(e.target.value),
                            },
                          }))
                        }
                      />
                      <span className="text-sm text-gray-600">CFU/ml</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic cooperative information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cooperativeName">Cooperative Name</Label>
                    <Input
                      id="cooperativeName"
                      value={settings.cooperativeName}
                      onChange={(e) => setSettings((prev) => ({ ...prev, cooperativeName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={settings.address}
                      onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Financial Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Settings</CardTitle>
                  <CardDescription>Revenue and payment configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      value={settings.commissionRate}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, commissionRate: Number.parseFloat(e.target.value) }))
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Current rate: {settings.commissionRate}% - Farmers keep {100 - settings.commissionRate}%
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="paymentSchedule">Payment Schedule</Label>
                    <Select
                      value={settings.paymentSchedule}
                      onValueChange={(value: "daily" | "weekly" | "monthly") =>
                        setSettings((prev) => ({ ...prev, paymentSchedule: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="minimumPayment">Minimum Payment (KSh)</Label>
                    <Input
                      id="minimumPayment"
                      type="number"
                      min="0"
                      value={settings.minimumPayment}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, minimumPayment: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Quality-based Pricing</CardTitle>
                  <CardDescription>Set prices per liter for different quality grades</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="gradeA">Grade A (Premium) - KSh per liter</Label>
                    <Input
                      id="gradeA"
                      type="number"
                      min="0"
                      step="0.5"
                      value={settings.gradeAPricing}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, gradeAPricing: Number.parseFloat(e.target.value) }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gradeB">Grade B (Standard) - KSh per liter</Label>
                    <Input
                      id="gradeB"
                      type="number"
                      min="0"
                      step="0.5"
                      value={settings.gradeBPricing}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, gradeBPricing: Number.parseFloat(e.target.value) }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gradeC">Grade C (Basic) - KSh per liter</Label>
                    <Input
                      id="gradeC"
                      type="number"
                      min="0"
                      step="0.5"
                      value={settings.gradeCPricing}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, gradeCPricing: Number.parseFloat(e.target.value) }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Receive updates via SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-approve Farmers</Label>
                      <p className="text-sm text-gray-600">Automatically approve new farmer registrations</p>
                    </div>
                    <Switch
                      checked={settings.autoApproval}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoApproval: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Enable/disable payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-green-600" />
                      <div>
                        <Label>M-Pesa Payments</Label>
                        <p className="text-sm text-gray-600">Mobile money payments</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.mpesaEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, mpesaEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <div>
                        <Label>Bank Transfer</Label>
                        <p className="text-sm text-gray-600">Direct bank transfers</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.bankTransferEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, bankTransferEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Banknote className="h-5 w-5 text-orange-600" />
                      <div>
                        <Label>Cash Payments</Label>
                        <p className="text-sm text-gray-600">Physical cash payments</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.cashPaymentEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, cashPaymentEnabled: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Save Settings Button */}
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} size="lg">
                <Settings className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
