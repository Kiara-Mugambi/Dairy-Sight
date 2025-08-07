"use client"

import { useState } from "react"
import { Calculator, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function RevenueCalculator() {
  const [milkVolume, setMilkVolume] = useState(1000)
  const [pricePerLiter, setPricePerLiter] = useState(50)
  const [commissionRate] = useState(5) // Fixed at 5%

  const totalRevenue = milkVolume * pricePerLiter
  const ourCommission = (totalRevenue * commissionRate) / 100
  const cooperativeEarnings = totalRevenue - ourCommission

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Revenue Calculator
        </CardTitle>
        <CardDescription>
          Calculate your earnings with our revenue sharing model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="volume">Monthly Milk Volume (Liters)</Label>
          <Input
            id="volume"
            type="number"
            value={milkVolume}
            onChange={(e) => setMilkVolume(Number(e.target.value))}
            min="0"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price per Liter (KSH)</Label>
          <Input
            id="price"
            type="number"
            value={pricePerLiter}
            onChange={(e) => setPricePerLiter(Number(e.target.value))}
            min="0"
          />
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Revenue:</span>
            <span className="font-medium">KSH {totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Our Commission (5%):</span>
            <span className="font-medium text-red-600">KSH {ourCommission.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-medium text-green-800">Your Earnings:</span>
            <span className="font-bold text-green-600 text-lg">KSH {cooperativeEarnings.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Monthly Savings</span>
          </div>
          <p className="text-xs text-green-700">
            Compared to $99/month traditional software, you save KSH {Math.max(0, 9900 - ourCommission).toLocaleString()} per month!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
