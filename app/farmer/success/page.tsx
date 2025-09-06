"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Phone, Mail, Calendar, MapPin, ArrowRight, Droplets } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchParamsWrapper } from "@/components/search-params-wrapper"

function SuccessContent() {
  const searchParams = useSearchParams()
  const [farmerData, setFarmerData] = useState({
    id: '',
    name: '',
    phone: ''
  })

  useEffect(() => {
    setFarmerData({
      id: searchParams.get('id') || 'F0001',
      name: searchParams.get('name') || 'Farmer',
      phone: searchParams.get('phone') || '+254712345678'
    })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DairySight</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
          <p className="text-gray-600">
            Welcome to DairySight, {farmerData.name}! Your application has been submitted successfully.
          </p>
        </div>

        <Card className="shadow-xl border-0 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Your Farmer Details</CardTitle>
            <CardDescription>
              Please save these details for your records
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">{farmerData.name}</h3>
              <Badge variant="secondary" className="mt-1">
                Farmer ID: {farmerData.id}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">{farmerData.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Location: Kenya</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Registered: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your registration is under review</li>
                <li>• You'll receive SMS confirmation within 24 hours</li>
                <li>• Admin will verify your documents</li>
                <li>• Start delivering milk once approved</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Important:</h4>
              <p className="text-sm text-yellow-700">
                Save your Farmer ID: <strong>{farmerData.id}</strong>. You'll need this for all future transactions.
              </p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Email Copy
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Questions? Call our support line: <strong>+254 700 123 456</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/get-started">
              Back to Home <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

export default function RegistrationSuccess() {
  return (
    <SearchParamsWrapper>
      <SuccessContent />
    </SearchParamsWrapper>
  )
}
