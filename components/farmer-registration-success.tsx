"use client"

import { CheckCircle, Phone, Mail, Calendar, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FarmerRegistrationSuccessProps {
  farmerName: string
  farmerId: string
  phone: string
  location: string
  registrationDate: string
}

export function FarmerRegistrationSuccess({ 
  farmerName, 
  farmerId, 
  phone, 
  location, 
  registrationDate 
}: FarmerRegistrationSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">Registration Successful!</CardTitle>
          <CardDescription>
            Welcome to DairySight Cooperative Platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">{farmerName}</h3>
            <Badge variant="secondary" className="mt-1">
              Farmer ID: {farmerId}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">{phone}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">{location}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Registered: {registrationDate}</span>
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
              Save your Farmer ID: <strong>{farmerId}</strong>. You'll need this for all future transactions.
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
    </div>
  )
}
