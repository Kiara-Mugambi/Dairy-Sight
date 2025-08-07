"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Droplets, ArrowLeft, Building2, User, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("cooperative")
  const router = useRouter()

  // Cooperative signup form
  const [cooperativeData, setCooperativeData] = useState({
    cooperativeName: "",
    registrationNumber: "",
    location: "",
    county: "",
    chairpersonName: "",
    chairpersonPhone: "",
    email: "",
    password: "",
    confirmPassword: "",
    bankName: "",
    accountNumber: "",
    termsAccepted: false,
  })

  // Individual farmer signup form
  const [farmerData, setFarmerData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    farmName: "",
    location: "",
    county: "",
    termsAccepted: false,
  })

  const handleCooperativeSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to success page or dashboard
    router.push("/signup/success?type=cooperative")
    setIsLoading(false)
  }

  const handleFarmerSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to farmer registration success
    router.push("/farmer/success?id=F0001&name=" + farmerData.firstName + " " + farmerData.lastName + "&phone=" + farmerData.phone)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DairySight</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join DairySight</h1>
          <p className="text-gray-600">Choose your account type to get started</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center">Create Your Account</CardTitle>
            <CardDescription className="text-center">
              Select the type of account that best fits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cooperative" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Cooperative
                </TabsTrigger>
                <TabsTrigger value="farmer" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Individual Farmer
                </TabsTrigger>
              </TabsList>

              {/* Cooperative Signup */}
              <TabsContent value="cooperative" className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Cooperative Account Benefits</h3>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Manage multiple farmers and employees</li>
                    <li>• Access to admin dashboard and analytics</li>
                    <li>• Revenue sharing: Keep 95% of all sales</li>
                    <li>• M-Pesa and bank payment integrations</li>
                  </ul>
                </div>

                <form onSubmit={handleCooperativeSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cooperativeName">Cooperative Name *</Label>
                      <Input
                        id="cooperativeName"
                        value={cooperativeData.cooperativeName}
                        onChange={(e) => setCooperativeData({...cooperativeData, cooperativeName: e.target.value})}
                        placeholder="Enter cooperative name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="registrationNumber">Registration Number</Label>
                      <Input
                        id="registrationNumber"
                        value={cooperativeData.registrationNumber}
                        onChange={(e) => setCooperativeData({...cooperativeData, registrationNumber: e.target.value})}
                        placeholder="Cooperative reg. number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={cooperativeData.location}
                        onChange={(e) => setCooperativeData({...cooperativeData, location: e.target.value})}
                        placeholder="Enter location"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="county">County *</Label>
                      <Select value={cooperativeData.county} onValueChange={(value) => setCooperativeData({...cooperativeData, county: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select county" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kiambu">Kiambu</SelectItem>
                          <SelectItem value="nakuru">Nakuru</SelectItem>
                          <SelectItem value="meru">Meru</SelectItem>
                          <SelectItem value="nyandarua">Nyandarua</SelectItem>
                          <SelectItem value="murang'a">Murang'a</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="chairpersonName">Chairperson Name *</Label>
                      <Input
                        id="chairpersonName"
                        value={cooperativeData.chairpersonName}
                        onChange={(e) => setCooperativeData({...cooperativeData, chairpersonName: e.target.value})}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="chairpersonPhone">Chairperson Phone *</Label>
                      <Input
                        id="chairpersonPhone"
                        value={cooperativeData.chairpersonPhone}
                        onChange={(e) => setCooperativeData({...cooperativeData, chairpersonPhone: e.target.value})}
                        placeholder="+254712345678"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={cooperativeData.email}
                      onChange={(e) => setCooperativeData({...cooperativeData, email: e.target.value})}
                      placeholder="cooperative@example.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={cooperativeData.password}
                          onChange={(e) => setCooperativeData({...cooperativeData, password: e.target.value})}
                          placeholder="Create password"
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={cooperativeData.confirmPassword}
                          onChange={(e) => setCooperativeData({...cooperativeData, confirmPassword: e.target.value})}
                          placeholder="Confirm password"
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cooperativeTerms"
                      checked={cooperativeData.termsAccepted}
                      onCheckedChange={(checked) => setCooperativeData({...cooperativeData, termsAccepted: checked as boolean})}
                    />
                    <Label htmlFor="cooperativeTerms" className="text-sm">
                      I agree to the <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full h-11" disabled={isLoading || !cooperativeData.termsAccepted}>
                    {isLoading ? "Creating Account..." : "Create Cooperative Account"}
                  </Button>
                </form>
              </TabsContent>

              {/* Individual Farmer Signup */}
              <TabsContent value="farmer" className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-blue-800">Individual Farmer Account</h3>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Direct access to milk delivery tracking</li>
                    <li>• Personal dashboard for your farm data</li>
                    <li>• Direct payments for your milk deliveries</li>
                    <li>• Quality scoring and feedback system</li>
                  </ul>
                </div>

                <form onSubmit={handleFarmerSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={farmerData.firstName}
                        onChange={(e) => setFarmerData({...farmerData, firstName: e.target.value})}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={farmerData.lastName}
                        onChange={(e) => setFarmerData({...farmerData, lastName: e.target.value})}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="farmerPhone">Phone Number *</Label>
                      <Input
                        id="farmerPhone"
                        value={farmerData.phone}
                        onChange={(e) => setFarmerData({...farmerData, phone: e.target.value})}
                        placeholder="+254712345678"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmerEmail">Email Address</Label>
                      <Input
                        id="farmerEmail"
                        type="email"
                        value={farmerData.email}
                        onChange={(e) => setFarmerData({...farmerData, email: e.target.value})}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="farmName">Farm Name</Label>
                      <Input
                        id="farmName"
                        value={farmerData.farmName}
                        onChange={(e) => setFarmerData({...farmerData, farmName: e.target.value})}
                        placeholder="Enter farm name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmerCounty">County *</Label>
                      <Select value={farmerData.county} onValueChange={(value) => setFarmerData({...farmerData, county: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select county" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kiambu">Kiambu</SelectItem>
                          <SelectItem value="nakuru">Nakuru</SelectItem>
                          <SelectItem value="meru">Meru</SelectItem>
                          <SelectItem value="nyandarua">Nyandarua</SelectItem>
                          <SelectItem value="murang'a">Murang'a</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="farmerLocation">Location/Village *</Label>
                    <Input
                      id="farmerLocation"
                      value={farmerData.location}
                      onChange={(e) => setFarmerData({...farmerData, location: e.target.value})}
                      placeholder="Enter your location"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="farmerPassword">Password *</Label>
                      <div className="relative">
                        <Input
                          id="farmerPassword"
                          type={showPassword ? "text" : "password"}
                          value={farmerData.password}
                          onChange={(e) => setFarmerData({...farmerData, password: e.target.value})}
                          placeholder="Create password"
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="farmerConfirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="farmerConfirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={farmerData.confirmPassword}
                          onChange={(e) => setFarmerData({...farmerData, confirmPassword: e.target.value})}
                          placeholder="Confirm password"
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="farmerTerms"
                      checked={farmerData.termsAccepted}
                      onCheckedChange={(checked) => setFarmerData({...farmerData, termsAccepted: checked as boolean})}
                    />
                    <Label htmlFor="farmerTerms" className="text-sm">
                      I agree to the <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full h-11" disabled={isLoading || !farmerData.termsAccepted}>
                    {isLoading ? "Creating Account..." : "Create Farmer Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
