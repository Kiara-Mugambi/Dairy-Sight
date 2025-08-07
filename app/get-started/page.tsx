"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Star, Users, TrendingUp, Shield, Droplets, BarChart3, DollarSign, Calculator } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GetStartedPage() {
  const [milkVolume, setMilkVolume] = useState(1000)
  const [pricePerLiter, setPricePerLiter] = useState(50)
  
  const monthlyRevenue = milkVolume * pricePerLiter * 30
  const ourCommission = monthlyRevenue * 0.05
  const cooperativeEarnings = monthlyRevenue - ourCommission

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DairySight</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link href="/signup" className="text-gray-600 hover:text-gray-900">
                Sign Up
              </Link>
              <Button asChild>
                <Link href="/farmer/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Revenue Sharing Model - No Monthly Fees
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Dairy Cooperative with{" "}
            <span className="text-blue-600">Smart Technology</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Track milk intake, automate offtake, and grow your revenue with our commission-based platform. 
            We only succeed when you succeed - 5% commission on sales, 95% stays with your cooperative.
            No monthly fees, no setup costs, just shared growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/farmer/register">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link href="/login">View Demo Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Revenue Calculator */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Calculator className="h-6 w-6 text-green-600" />
                Revenue Calculator
              </CardTitle>
              <CardDescription>
                See how much your cooperative can earn with our revenue sharing model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="volume">Daily Milk Volume (Liters)</Label>
                    <Input
                      id="volume"
                      type="number"
                      value={milkVolume}
                      onChange={(e) => setMilkVolume(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per Liter (KSH)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={pricePerLiter}
                      onChange={(e) => setPricePerLiter(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Monthly Projections</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Revenue:</span>
                      <span className="font-bold">KSH {monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Our Commission (5%):</span>
                      <span className="font-bold">KSH {ourCommission.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-green-600 text-lg">
                        <span className="font-semibold">Your Earnings:</span>
                        <span className="font-bold">KSH {cooperativeEarnings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border">
                    <p className="text-sm text-gray-600">
                      <strong>vs Traditional Software:</strong> Save KSH 15,000+ monthly in subscription fees
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <Card className="max-w-4xl mx-auto border-2 border-green-200">
            <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="text-2xl text-green-800">Integrated Payment Processing</CardTitle>
              <CardDescription className="text-green-700">
                Seamless M-Pesa and bank integrations for instant revenue sharing
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="text-center">
                  <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">M-Pesa Integration</h3>
                  <p className="text-gray-600">
                    Instant payments to your M-Pesa account. Commission automatically deducted, 
                    95% of revenue sent directly to you within minutes of each sale.
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Bank Transfers</h3>
                  <p className="text-gray-600">
                    Daily or weekly bulk transfers to your cooperative's bank account. 
                    Full transparency with detailed transaction reports for every payment.
                  </p>
                </div>
              </div>
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-2">Why Revenue Sharing Works Better</h4>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div>
                    <p className="text-yellow-700 mb-2"><strong>Traditional Software:</strong></p>
                    <ul className="text-yellow-600 space-y-1">
                      <li>• Pay KSH 15,000+ monthly regardless of sales</li>
                      <li>• High setup and training costs</li>
                      <li>• Fixed costs hurt during slow months</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-700 mb-2"><strong>Our Revenue Sharing:</strong></p>
                    <ul className="text-yellow-600 space-y-1">
                      <li>• Pay only 5% when you make sales</li>
                      <li>• Zero setup or monthly fees</li>
                      <li>• We're invested in your success</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DairySight?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Real-Time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor milk intake and automatic offtake in real-time with live dashboards and instant notifications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Revenue Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No monthly fees or setup costs. We earn 5% commission only when you make sales. Your success is our success.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Bank-grade security with 99.9% uptime. Your data is protected with enterprise-level encryption.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Farmer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Easy farmer registration, approval workflows, and automated SMS notifications for seamless communication.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Growth Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Detailed reports and analytics to help you understand trends, optimize operations, and grow your business.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Quality Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built-in quality scoring system to maintain high standards and ensure premium pricing for your milk.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register Your Cooperative</h3>
              <p className="text-gray-600">
                Quick setup process with farmer registration and system configuration. Get started in minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Manage</h3>
              <p className="text-gray-600">
                Record milk intake, monitor quality, and watch automatic offtake happen in real-time.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn & Grow</h3>
              <p className="text-gray-600">
                Receive 95% of all sales revenue directly via M-Pesa or bank transfer. 
                We automatically collect our 5% commission and process your payments within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Cooperatives Across Kenya</h2>
            <p className="text-gray-600">Join hundreds of dairy cooperatives already using DairySight</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "DairySight transformed our operations. We've increased our revenue by 40% in just 3 months with their automated offtake system."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    JK
                  </div>
                  <div>
                    <p className="font-semibold">John Kamau</p>
                    <p className="text-sm text-gray-500">Manager, Kiambu Dairy Cooperative</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The revenue sharing model is brilliant. No upfront costs and we only pay when we make money. It's a win-win partnership."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    MW
                  </div>
                  <div>
                    <p className="font-semibold">Mary Wanjiku</p>
                    <p className="text-sm text-gray-500">Chairperson, Nakuru Farmers Cooperative</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Real-time tracking and farmer management features have streamlined our entire operation. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    PM
                  </div>
                  <div>
                    <p className="font-semibold">Peter Mwangi</p>
                    <p className="text-sm text-gray-500">Secretary, Meru Dairy Union</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Cooperative?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join the revolution in dairy cooperative management. Start earning more with our revenue sharing model.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                  <Link href="/farmer/register">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/login">View Live Demo</Link>
                </Button>
              </div>
              <p className="text-sm mt-6 opacity-75">
                No setup fees • No monthly charges • 5% commission only on successful sales
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">DairySight</span>
              </div>
              <p className="text-gray-400">
                Empowering dairy cooperatives with smart technology and revenue sharing partnerships.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Training</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DairySight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
