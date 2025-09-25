"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, MessageSquare, Phone, Mail, ArrowRight, Droplets } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RegistrationSuccess() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-center">
                <Badge className="mb-2 bg-blue-600">Farmer ID</Badge>
                <div className="text-3xl font-bold text-blue-600 mb-2">{farmerData.id}</div>
                <p className="text-sm text-blue-700">
                  This is your unique farmer identification number. You'll need this for all transactions.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{farmerData.name}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{farmerData.phone}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Status:</span>
                <Badge variant="secondary">Pending Approval</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              SMS Confirmation Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                📱 <strong>SMS sent to {farmerData.phone}</strong>
              </p>
              <p className="text-green-700 text-sm mt-2">
                "Welcome to DairySight! Your Farmer ID is {farmerData.id}. Your registration is under review. 
                You'll receive another SMS once approved. Contact support: +254700123456"
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Document Review</h4>
                  <p className="text-sm text-gray-600">
                    Our team will review your submitted documents and farm details within 24-48 hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium">SMS Notification</h4>
                  <p className="text-sm text-gray-600">
                    You'll receive an SMS confirmation once your registration is approved or if additional information is needed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Start Delivering</h4>
                  <p className="text-sm text-gray-600">
                    Once approved, you can start delivering milk to the cooperative and earning through our platform.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Contact us if you have any questions about your registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Call Support</p>
                  <p className="text-sm text-blue-600">+254700123456</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">WhatsApp</p>
                  <p className="text-sm text-green-600">+254700123456</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg md:col-span-2">
                <Mail className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-purple-800">Email Support</p>
                  <p className="text-sm text-purple-600">support@dairysight.com</p>
                </div>
              </div>
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
