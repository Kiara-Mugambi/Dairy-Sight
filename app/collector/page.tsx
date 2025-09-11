"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

// Temporary farmer list (replace with API later)
const farmers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Mary Wambui" },
  { id: "3", name: "Peter Mwangi" },
]

interface Collection {
  id: string
  farmer: string
  quantity: number
  quality: string
  date: string
}

export default function CollectorDashboard() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [farmer, setFarmer] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [quality, setQuality] = useState("")
  const [date, setDate] = useState("")

  // Fetch collections from API (instead of localStorage)
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/collections")
        if (res.ok) {
          const data = await res.json()
          setCollections(data)
        }
      } catch (err) {
        console.error("Error fetching collections:", err)
      }
    }
    fetchCollections()
  }, [])

  const addCollection = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!farmer || !quantity || !quality || !date) {
      alert("Please fill all fields")
      return
    }

    const newEntry: Collection = {
      id: Date.now().toString(),
      farmer,
      quantity,
      quality,
      date,
    }

    try {
      const res = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      })

      if (res.ok) {
        setCollections([newEntry, ...collections]) // update UI
        setFarmer("")
        setQuantity(0)
        setQuality("")
        setDate("")
      } else {
        console.error("Failed to save collection")
      }
    } catch (err) {
      console.error("Error saving collection:", err)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Collector Dashboard</h1>

      {/* Record Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Record Milk Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={addCollection}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            {/* Farmer */}
            <div>
              <Label>Farmer</Label>
              <Select value={farmer} onValueChange={setFarmer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select farmer" />
                </SelectTrigger>
                <SelectContent>
                  {farmers.map((f) => (
                    <SelectItem key={f.id} value={f.name}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <Label>Quantity (L)</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            {/* Quality */}
            <div>
              <Label>Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Grade A</SelectItem>
                  <SelectItem value="B">Grade B</SelectItem>
                  <SelectItem value="C">Grade C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Records</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th>Farmer</th>
                <th>Quantity (L)</th>
                <th>Quality</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="py-2">{c.farmer}</td>
                  <td className="py-2">{c.quantity}</td>
                  <td className="py-2">{c.quality}</td>
                  <td className="py-2">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
