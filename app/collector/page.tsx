"use client"

import { useState } from "react"
import { farmers } from "@/data/farmers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function CollectorPage() {
  const [farmerId, setFarmerId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [quality, setQuality] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here connect to backend API / database
    console.log({
      farmerId,
      quantity,
      quality,
    })

    alert("Milk record submitted successfully!")
    setFarmerId("")
    setQuantity("")
    setQuality("")
  }

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Milk Collection Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Farmer select */}
            <div>
              <Label>Select Farmer</Label>
              <Select value={farmerId} onValueChange={setFarmerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a farmer" />
                </SelectTrigger>
                <SelectContent>
                  {farmers.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <Label>Milk Quantity (litres)</Label>
              <Input
                type="number"
                placeholder="Enter litres"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            {/* Quality */}
            <div>
              <Label>Milk Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Grade A</SelectItem>
                  <SelectItem value="B">Grade B</SelectItem>
                  <SelectItem value="C">Grade C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Submit Entry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
