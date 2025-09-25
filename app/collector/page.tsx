"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Smartphone,
  Droplets,
  Users,
  Clock,
  Star,
  Plus,
  CheckCircle,
  Activity,
  LogOut,
  Navigation,
  Timer,
} from "lucide-react"

// Sample data for collector app
const collectorInfo = {
  name: "Peter Mwangi",
  id: "COL001",
  route: "Route A",
  phone: "+254712345678",
  startTime: "06:00",
  targetVolume: 500,
}

const assignedFarmers = [
  {
    id: "F001",
    name: "John Kamau",
    location: "Farm 1A",
    phone: "+254712345678",
    expectedVolume: 25,
    status: "pending",
  },
  {
    id: "F002",
    name: "Mary Wanjiku",
    location: "Farm 2A",
    phone: "+254723456789",
    expectedVolume: 30,
    status: "pending",
  },
  {
    id: "F003",
    name: "Grace Njeri",
    location: "Farm 3A",
    phone: "+254734567890",
    expectedVolume: 22,
    status: "pending",
  },
  {
    id: "F004",
    name: "Samuel Kiprotich",
    location: "Farm 4A",
    phone: "+254745678901",
    expectedVolume: 28,
    status: "pending",
  },
  {
    id: "F005",
    name: "Alice Wambui",
    location: "Farm 5A",
    phone: "+254756789012",
    expectedVolume: 35,
    status: "pending",
  },
]

const collectionHistory = [
  { farmerId: "F001", farmerName: "John Kamau", volume: 25.5, quality: 4.2, time: "06:30", date: "2024-01-15" },
  { farmerId: "F002", farmerName: "Mary Wanjiku", volume: 32.0, quality: 4.5, time: "07:00", date: "2024-01-15" },
  { farmerId: "F003", farmerName: "Grace Njeri", volume: 28.0, quality: 4.1, time: "07:30", date: "2024-01-15" },
]

export default function CollectorApp() {
  const [selectedFarmerId, setSelectedFarmerId] = useState("")
  const [volume, setVolume] = useState("")
  const [qualityScore, setQualityScore] = useState("")
  const [showRecordDialog, setShowRecordDialog] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [collectionStarted, setCollectionStarted] = useState(false)
  const [totalCollected, setTotalCollected] = useState(0)
  const [farmersVisited, setFarmersVisited] = useState(0)
  const [collections, setCollections] = useState(collectionHistory)

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleStartCollection = () => {
    setCollectionStarted(true)
  }

  const handleRecordCollection = () => {
    if (!selectedFarmerId || !volume || !qualityScore) {
      alert("Please fill in all fields")
      return
    }

    const selectedFarmer = assignedFarmers.find((f) => f.id === selectedFarmerId)
    if (!selectedFarmer) return

    const newCollection = {
      farmerId: selectedFarmerId,
      farmerName: selectedFarmer.name,
      volume: Number.parseFloat(volume),
      quality: Number.parseFloat(qualityScore),
      time: currentTime.toLocaleTimeString(),
      date: currentTime.toISOString().split("T")[0],
    }

    setCollections((prev) => [newCollection, ...prev])
    setTotalCollected((prev) => prev + Number.parseFloat(volume))
    setFarmersVisited((prev) => prev + 1)

    // Reset form
    setSelectedFarmerId("")
    setVolume("")
    setQualityScore("")
    setShowRecordDialog(false)
  }

  const handleLogout = () => {
    window.location.href = "/login"
  }

  const getQualityColor = (score: number) => {
    if (score >= 4.5) return "text-green-600"
    if (score >= 4.0) return "text-yellow-600"
    return "text-red-600"
  }

  const getQualityStars = (score: number) => {
    return Math.round(score)
  }

  const remainingFarmers = assignedFarmers.length - farmersVisited
  const collectionProgress = (farmersVisited / assignedFarmers.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Collector App</h1>
              <p className="text-sm text-gray-600">{collectorInfo.route}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Collector Info Card */}
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-lg">{collectorInfo.name}</h2>
                <p className="text-sm text-gray-600">
                  {collectorInfo.id} • {collectorInfo.route}
                </p>
              </div>
              <Badge className={collectionStarted ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {collectionStarted ? "Active" : "Ready"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-gray-400" />
                <span>{collectorInfo.route}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-gray-400" />
                <span>
                  {totalCollected}L / {collectorInfo.targetVolume}L
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span>
                  {farmersVisited} / {assignedFarmers.length} farmers
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Collection Progress</span>
                <span>{Math.round(collectionProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${collectionProgress}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {!collectionStarted ? (
            <Button onClick={handleStartCollection} className="col-span-2">
              <Timer className="h-4 w-4 mr-2" />
              Start Collection Route
            </Button>
          ) : (
            <>
              <Dialog open={showRecordDialog} onOpenChange={setShowRecordDialog}>
                <DialogTrigger asChild>
                  <Button className="col-span-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Record Milk Collection
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Record Milk Collection</DialogTitle>
                    <DialogDescription>Record milk intake from farmer with quality assessment</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="farmer">Select Farmer</Label>
                      <Select value={selectedFarmerId} onValueChange={setSelectedFarmerId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose farmer" />
                        </SelectTrigger>
                        <SelectContent>
                          {assignedFarmers.map((farmer) => (
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
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        placeholder="Enter volume"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quality">Quality Score (1-5)</Label>
                      <Select value={qualityScore} onValueChange={setQualityScore}>
                        <SelectTrigger>
                          <SelectValue placeholder="Rate quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 - Excellent</SelectItem>
                          <SelectItem value="4.5">4.5 - Very Good</SelectItem>
                          <SelectItem value="4">4 - Good</SelectItem>
                          <SelectItem value="3.5">3.5 - Fair</SelectItem>
                          <SelectItem value="3">3 - Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Auto-recorded:</strong> Time: {currentTime.toLocaleTimeString()}, Date:{" "}
                        {currentTime.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleRecordCollection}>Record Collection</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>

        {/* Assigned Farmers */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Assigned Farmers ({assignedFarmers.length})
            </CardTitle>
            <CardDescription>Your collection route for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assignedFarmers.map((farmer) => {
                const isVisited = collections.some(
                  (c) => c.farmerId === farmer.id && c.date === currentTime.toISOString().split("T")[0],
                )
                return (
                  <div
                    key={farmer.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${isVisited ? "bg-green-50 border-green-200" : "bg-white"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${isVisited ? "bg-green-100" : "bg-gray-100"}`}
                      >
                        {isVisited ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Users className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{farmer.name}</p>
                        <p className="text-xs text-gray-600">{farmer.location}</p>
                        <p className="text-xs text-gray-500">Expected: {farmer.expectedVolume}L</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {isVisited ? (
                        <Badge className="bg-green-100 text-green-800">Collected</Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Collection History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Today's Collections (
              {collections.filter((c) => c.date === currentTime.toISOString().split("T")[0]).length})
            </CardTitle>
            <CardDescription>Recorded milk collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {collections
                .filter((c) => c.date === currentTime.toISOString().split("T")[0])
                .map((collection, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{collection.farmerName}</p>
                        <p className="text-xs text-gray-600">
                          {collection.volume}L • {collection.time}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < getQualityStars(collection.quality) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                          <span className={`text-xs ml-1 ${getQualityColor(collection.quality)}`}>
                            {collection.quality}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Recorded</Badge>
                  </div>
                ))}

              {collections.filter((c) => c.date === currentTime.toISOString().split("T")[0]).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Droplets className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No collections recorded yet</p>
                  <p className="text-sm">Start your collection route to begin</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
