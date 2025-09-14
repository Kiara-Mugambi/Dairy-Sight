"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart, 
  Smartphone, 
  Wallet, 
  Shield, 
  Clock 
} from "lucide-react"

export default function GetStartedPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 to-green-500 text-white py-24">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-6"
          >
            Build Trust in Every Drop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Track milk intake with full transparency, eliminate hidden deductions, 
            and guarantee farmers fair payments through instant digital notifications 
            and cashless transfers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Choose DairySight?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Collector Mobile App</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Collectors record milk quantity, quality, and timestamp in real-time. 
                  Farmers receive SMS confirmations instantly — no more disputes, no hidden numbers.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Freshness Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Each delivery is tracked with a 3-hour freshness countdown. 
                  Milk past its window is automatically flagged, protecting quality and buyers' trust.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Cashless Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Payments are digital and instant. Offtakers pay online, our system deducts 
                  5% commission automatically, and the cooperative or farmer receives funds instantly.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Transparency & Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every liter is timestamped, visible, and verified. 
                  No guesswork, no delayed records — building confidence 
                  across farmers, cooperatives, and offtakers.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Smart Dashboards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor collections, payments, and performance metrics in one place. 
                  Data-driven decisions help you scale faster with clarity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Record & Confirm</h3>
              <p className="text-gray-600">
                Collectors record milk via app, farmers get SMS confirmation 
                with volume and timestamp instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Freshness</h3>
              <p className="text-gray-600">
                Each delivery has a 3-hour freshness countdown. Expired milk 
                is flagged automatically, ensuring only quality supply moves forward.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Wallet className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Paid Instantly</h3>
              <p className="text-gray-600">
                Offtakers pay digitally, system deducts commission, and 
                cooperatives or farmers receive their money instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Dairy?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join cooperatives and farmers building trust and scaling income 
            with transparency, freshness guarantees, and cashless payments.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  )
}
