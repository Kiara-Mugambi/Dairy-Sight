"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Building2, User, ArrowRight, Droplets } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SignupSuccess() {
  const searchParams = useSearchParams()
  const [accountType, setAccountType] = useState('cooperative')

  useEffect(() => {
    setAccountType(searchParams.get('type') || 'cooperative')
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Created Successfully!</h1>
          <p className="text-gray-600">
            Welcome to DairySight! Your {accountType} account has been created.
          </p>
        </div>

        <Card className="shadow-xl border-0 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              {accountType === 'cooperative' ? (
                <>
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Cooperative Account
                </>
              ) : (
                <>
                  <User className="h-5 w-5 text-green-600" />
                  Farmer Account
                </>
              )}
            </CardTitle>
            <CardDescription>
              Your account is ready to use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {accountType === 'cooperative' ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-3">What's Next for Your Cooperative?</h3>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      Set up your payment integrations (M-Pesa & Bank)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      Add employees and assign roles
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      Start registering farmers
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      Begin tracking milk intake and offtake
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Revenue Sharing Active</h4>
                  <p className="text-sm text-green-700">
                    Your 5% commission model is now active. You'll keep 95% of all milk sales revenue 
                    with automatic payments to your account.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3">What's Next for Your Farm?</h3>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                      Complete your farm profile and banking details
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                      Wait for cooperative approval
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                      Start delivering milk to your cooperative
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                      Track your deliveries and earnings
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Direct Payments</h4>
                  <p className="text-sm text-blue-700">
                    Once approved, you'll receive direct payments for your milk deliveries 
                    with full transparency and real-time tracking.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button className="flex-1" asChild>
                <Link href="/login">
                  Sign In to Dashboard <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/get-started">
                  Learn More
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Need help getting started? Contact our support team.
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="text-gray-600">📞 +254 700 123 456</span>
            <span className="text-gray-600">✉️ support@dairysight.com</span>
          </div>
        </div>
      </main>
    </div>
  )
}
