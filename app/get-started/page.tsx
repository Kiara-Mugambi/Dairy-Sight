"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Droplets,
  Building2,
  Users,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  Shield,
  TrendingUp,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function GetStartedPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    cooperativeName: "",
    location: "",
    contactPerson: "",
    email: "",
    phone: "",
    memberCount: "",
    currentVolume: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Cooperative registration:", formData)

    // Redirect to success page or dashboard
    router.push("/signup/success")
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.cooperativeName && formData.location && formData.contactPerson
      case 2:
        return formData.email && formData.phone && formData.memberCount
      case 3:
        return formData.currentVolume
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
            <Link href="/" className="flex items-center gap-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DairySight</span>
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join DairySight Platform</h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your dairy cooperative with complete transparency and revenue sharing
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepNumber <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepNumber < step ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-1 mx-2 ${stepNumber < step ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {step === 1 && <Building2 className="h-5 w-5 text-blue-600" />}
                {step === 2 && <Users className="h-5 w-5 text-blue-600" />}
                {step === 3 && <TrendingUp className="h-5 w-5 text-blue-600" />}
                {step === 1 && "Cooperative Information"}
                {step === 2 && "Contact Details"}
                {step === 3 && "Operations Overview"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about your dairy cooperative"}
                {step === 2 && "How can we reach you?"}
                {step === 3 && "Help us understand your current operations"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Cooperative Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cooperativeName">Cooperative Name *</Label>
                    <Input
                      id="cooperativeName"
                      value={formData.cooperativeName}
                      onChange={(e) => handleInputChange("cooperativeName", e.target.value)}
                      placeholder="e.g., Kiambu Dairy Cooperative"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="e.g., Kiambu, Kenya"
                        className="pl-10 mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Primary Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                      placeholder="Full name of main contact"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Brief Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Tell us about your cooperative's mission and goals"
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="admin@yourcooperative.com"
                        className="pl-10 mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+254700123456"
                        className="pl-10 mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="memberCount">Number of Farmer Members *</Label>
                    <Select
                      value={formData.memberCount}
                      onValueChange={(value) => handleInputChange("memberCount", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select member count range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50 farmers</SelectItem>
                        <SelectItem value="51-100">51-100 farmers</SelectItem>
                        <SelectItem value="101-200">101-200 farmers</SelectItem>
                        <SelectItem value="201-500">201-500 farmers</SelectItem>
                        <SelectItem value="500+">500+ farmers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Operations Overview */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentVolume">Current Daily Milk Volume *</Label>
                    <Select
                      value={formData.currentVolume}
                      onValueChange={(value) => handleInputChange("currentVolume", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select daily volume range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-500">0-500 liters/day</SelectItem>
                        <SelectItem value="501-1000">501-1,000 liters/day</SelectItem>
                        <SelectItem value="1001-2000">1,001-2,000 liters/day</SelectItem>
                        <SelectItem value="2001-5000">2,001-5,000 liters/day</SelectItem>
                        <SelectItem value="5000+">5,000+ liters/day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Revenue Sharing Explanation */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Our Revenue Sharing Partnership
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm font-medium">Setup Fees</span>
                        <Badge className="bg-green-100 text-green-800">KSh 0</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="text-sm font-medium">Monthly Charges</span>
                        <Badge className="bg-green-100 text-green-800">KSh 0</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <span className="text-sm font-medium">Commission (only on sales)</span>
                        <Badge className="bg-blue-600">5%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-2 border-green-200">
                        <span className="text-sm font-medium">Your Revenue Share</span>
                        <Badge className="bg-green-600">95%</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      We only earn when you earn. Our success is directly tied to your cooperative's growth and
                      profitability.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
                  Previous
                </Button>

                {step < 3 ? (
                  <Button onClick={handleNext} disabled={!isStepValid()}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!isStepValid() || isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Complete Registration"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Complete Transparency</h3>
                <p className="text-sm text-gray-600">Track every drop from farm to sale with real-time monitoring</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Revenue Growth</h3>
                <p className="text-sm text-gray-600">
                  Maximize earnings with our partnership model and automated systems
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Real-Time Monitoring</h3>
                <p className="text-sm text-gray-600">3-hour collection tracking and automatic quality verification</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
