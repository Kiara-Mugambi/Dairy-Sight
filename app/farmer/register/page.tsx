"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Check, Droplets } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function FarmerRegistration() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    idNumber: "",
    
    // Farm Information
    farmName: "",
    location: "",
    county: "",
    farmSize: "",
    cattleCount: "",
    dailyMilkProduction: "",
    
    // Banking Information
    bankName: "",
    accountNumber: "",
    accountName: "",
    
    // Documents
    idCopy: null,
    farmCertificate: null,
    bankStatement: null,
    
    // Agreement
    termsAccepted: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const handleSubmit = () => {
    // Generate farmer ID and redirect to success page
    const farmerId = `F${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
    router.push(`/farmer/success?id=${farmerId}&name=${formData.firstName} ${formData.lastName}&phone=${formData.phone}`)
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.phone && formData.idNumber
      case 2:
        return formData.farmName && formData.location && formData.county && formData.cattleCount
      case 3:
        return formData.bankName && formData.accountNumber && formData.accountName
      case 4:
        return formData.termsAccepted
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/get-started" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
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
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step <= currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {step < currentStep ? <Check className="h-5 w-5" /> : step}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Personal Info</span>
            <span>Farm Details</span>
            <span>Banking Info</span>
            <span>Documents</span>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Farm Information"}
              {currentStep === 3 && "Banking Information"}
              {currentStep === 4 && "Documents & Agreement"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Provide details about your farm"}
              {currentStep === 3 && "Banking details for payments"}
              {currentStep === 4 && "Upload required documents and accept terms"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+254712345678"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="idNumber">National ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    placeholder="Enter your ID number"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Farm Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="farmName">Farm Name *</Label>
                  <Input
                    id="farmName"
                    value={formData.farmName}
                    onChange={(e) => handleInputChange('farmName', e.target.value)}
                    placeholder="Enter your farm name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location/Village *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="county">County *</Label>
                    <Select value={formData.county} onValueChange={(value) => handleInputChange('county', value)}>
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
                    <Label htmlFor="farmSize">Farm Size (Acres)</Label>
                    <Input
                      id="farmSize"
                      type="number"
                      value={formData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                      placeholder="Enter farm size"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cattleCount">Number of Cattle *</Label>
                    <Input
                      id="cattleCount"
                      type="number"
                      value={formData.cattleCount}
                      onChange={(e) => handleInputChange('cattleCount', e.target.value)}
                      placeholder="Enter cattle count"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dailyMilkProduction">Daily Milk Production (Liters)</Label>
                  <Input
                    id="dailyMilkProduction"
                    type="number"
                    value={formData.dailyMilkProduction}
                    onChange={(e) => handleInputChange('dailyMilkProduction', e.target.value)}
                    placeholder="Average daily production"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Banking Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Select value={formData.bankName} onValueChange={(value) => handleInputChange('bankName', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equity">Equity Bank</SelectItem>
                      <SelectItem value="kcb">KCB Bank</SelectItem>
                      <SelectItem value="coop">Co-operative Bank</SelectItem>
                      <SelectItem value="absa">Absa Bank</SelectItem>
                      <SelectItem value="standard">Standard Chartered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder="Enter your account number"
                  />
                </div>
                <div>
                  <Label htmlFor="accountName">Account Name *</Label>
                  <Input
                    id="accountName"
                    value={formData.accountName}
                    onChange={(e) => handleInputChange('accountName', e.target.value)}
                    placeholder="Account holder name"
                  />
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Revenue Sharing Payments</h4>
                  <p className="text-sm text-green-700 mb-2">
                    Your banking details will be used for direct revenue sharing payments. You'll receive 95% of all 
                    milk sales directly to this account, with only 5% commission deducted.
                  </p>
                  <div className="text-xs text-green-600 space-y-1">
                    <p>• Payments processed within 24 hours of each sale</p>
                    <p>• SMS notifications for every transaction</p>
                    <p>• Full transparency with detailed payment reports</p>
                    <p>• No monthly fees or hidden charges</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Documents & Agreement */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Required Documents</h4>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">National ID Copy *</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Farm Certificate (Optional)</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Bank Statement (Optional)</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Terms and Conditions</h4>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto text-sm">
                    <p className="mb-2">
                      By registering with DairySight, you agree to the following terms:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Provide accurate and truthful information</li>
                      <li>Maintain quality standards for milk delivery</li>
                      <li>Allow cooperative staff to verify your farm details</li>
                      <li>Receive payments through the provided banking details</li>
                      <li>Comply with cooperative rules and regulations</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions and privacy policy *
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
