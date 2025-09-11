"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface Collection {
  id: string
  farmer: string
  quantity: number
  date: string
}

export default function CollectorDashboard() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [farmer, setFarmer] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [date, setDate] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("collections")
    if (saved) setCollections(JSON.parse(saved))
  }, [])

  const addCollection = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: Collection = {
      id: Date.now().toString(),
      farmer,
      quantity,
      date,
    }
    const updated = [newEntry, ...collections]
    setCollections(updated)
    localStorage.setItem("collections", JSON.stringify(updated))

    setFarmer("")
    setQuantity(0)
    setDate("")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Collector Dashboard</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Record Milk Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addCollection} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Farmer</Label>
              <Input value={farmer} onChange={(e) => setFarmer(e.target.value)} />
            </div>
            <div>
              <Label>Quantity (L)</Label>
              <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>

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
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {collections.map(c => (
                <tr key={c.id} className="border-t">
                  <td className="py-2">{c.farmer}</td>
                  <td className="py-2">{c.quantity}</td>
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
