"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast"
import { recordMilkIntake } from "@/app/actions/milk-actions"
import { Droplets, Plus, Search, CheckCircle, Calendar, ArrowLeft, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

interface Farmer {
  id: string
  name: string
  phone: string
  location: string
  status: string
}

interface MilkIntake {
  id: string
  farmerId: string
  farmerName: string
  quantity: number
  quality: string
  date: string
  time: string
  price: number | null
}

export default function MilkIntakePage() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [recentIntakes, setRecentIntakes] = useState<MilkIntake[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [showAddFarmer, setShowAddFarmer] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Form state
  const [selectedFarmer, setSelectedFarmer] = useState("")
  const [quantity, setQuantity] = useState("")
  const [quality, setQuality] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Add farmer form state
  const [newFarmerName, setNewFarmerName] = useState("")
  const [newFarmerPhone, setNewFarmerPhone] = useState("")
  const [newFarmerLocation, setNewFarmerLocation] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)

      // Load farmers
      const farmersResponse = await fetch("/api/farmers?status=active")
      if (farmersResponse.ok) {
        const farmersData = await farmersResponse.json()
        setFarmers(farmersData.farmers || [])
      }

      // Load recent intakes
      const intakesResponse = await fetch("/api/milk-intake?limit=20")
      if (intakesResponse.ok) {
        const intakesData = await intakesResponse.json()
        setRecentIntakes(intakesData.intakes || [])
      }
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddFarmer = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newFarmerName || !newFarmerPhone || !newFarmerLocation) {
      toast({
        title: "Validation Error",
        description: "Please fill in all farmer details",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/farmers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newFarmerName,
          phone: newFarmerPhone,
          location: newFarmerLocation,
          status: "active",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Success!",
          description: `Farmer ${newFarmerName} added successfully`,
        })

        // Reset form
        setNewFarmerName("")
        setNewFarmerPhone("")
        setNewFarmerLocation("")
        setShowAddFarmer(false)

        // Reload farmers
        await loadData()
      } else {
        toast({
          title: "Error",
          description: "Failed to add farmer",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add farmer",
        variant: "destructive",
      })
    }
  }

  const handleRecordIntake = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFarmer || !quantity || !quality) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsRecording(true)

    const pricePerLiter = {
      A: 55,
      B: 50,
      C: 45,
    }[quality]

    const price = Number.parseFloat(quantity) * pricePerLiter

    try {
      const result = await recordMilkIntake({
        farmerId: selectedFarmer,
        quantity: Number.parseFloat(quantity),
        quality: quality as "A" | "B" | "C",
        price: price,
      })

      if (result.success) {
        toast({
          title: "Success!",
          description: `Recorded ${quantity}L of Grade ${quality} milk`,
        })

        // Reset form
        setSelectedFarmer("")
        setQuantity("")
        setQuality("")

        // Reload data
        await loadData()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to record milk intake",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record milk intake",
        variant: "destructive",
      })
    } finally {
      setIsRecording(false)
    }
  }

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getQualityColor = (quality: string | null) => {
    switch (quality) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-yellow-100 text-yellow-800"
      case "C":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Droplets className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading milk intake...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Milk Intake Management</h1>
                <p className="text-gray-600">Record and track daily milk collections from farmers</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Record Form */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Record New Intake
                  </CardTitle>
                  <CardDescription>Record milk collection from farmers</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRecordIntake} className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="farmer">Select Farmer</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddFarmer(!showAddFarmer)}
                          className="flex items-center gap-1 text-xs"
                        >
                          <UserPlus className="h-3 w-3" />
                          Add Farmer
                        </Button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search farmers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={selectedFarmer} onValueChange={setSelectedFarmer}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a farmer" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredFarmers.map((farmer) => (
                            <SelectItem key={farmer.id} value={farmer.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{farmer.name}</span>
                                <span className="text-sm text-gray-500">{farmer.location}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (Liters)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        step="0.1"
                        min="0"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quality">Quality Grade</Label>
                      <Select value={quality} onValueChange={setQuality}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Grade A - Premium (KSh 55/L)</SelectItem>
                          <SelectItem value="B">Grade B - Standard (KSh 50/L)</SelectItem>
                          <SelectItem value="C">Grade C - Basic (KSh 45/L)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full" disabled={isRecording}>
                      {isRecording ? "Recording..." : "Record Intake"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Add Farmer Form */}
              {showAddFarmer && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      Add New Farmer
                    </CardTitle>
                    <CardDescription>Register a new farmer to the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddFarmer} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="farmerName">Farmer Name</Label>
                        <Input
                          id="farmerName"
                          placeholder="Enter farmer name"
                          value={newFarmerName}
                          onChange={(e) => setNewFarmerName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="farmerPhone">Phone Number</Label>
                        <Input
                          id="farmerPhone"
                          placeholder="Enter phone number"
                          value={newFarmerPhone}
                          onChange={(e) => setNewFarmerPhone(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="farmerLocation">Location</Label>
                        <Input
                          id="farmerLocation"
                          placeholder="Enter location"
                          value={newFarmerLocation}
                          onChange={(e) => setNewFarmerLocation(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          Add Farmer
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowAddFarmer(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Recent Intakes */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Milk Intakes
                  </CardTitle>
                  <CardDescription>Latest milk collection records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentIntakes.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Droplets className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No milk intake records yet</p>
                        <p className="text-sm">Start by recording your first intake</p>
                      </div>
                    ) : (
                      recentIntakes.map((intake) => (
                        <div key={intake.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{intake.farmerName}</p>
                              <p className="text-sm text-gray-600">
                                {intake.date} at {intake.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <Badge className={getQualityColor(intake.quality)}>Grade {intake.quality}</Badge>
                              <span className="font-bold text-lg">{intake.quantity}L</span>
                            </div>
                            <p className="text-sm text-gray-600">KSh {(intake.price || 0).toFixed(2)}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
