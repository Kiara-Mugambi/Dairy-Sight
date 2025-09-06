"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Milk } from "lucide-react"

interface Offtake {
  id: string
  farmer: string
  quantity: number
  date: string
}

const SEED_OFFTAKES: Offtake[] = [
  { id: "o1", farmer: "John Kamau", quantity: 20, date: "2025-09-01" },
  { id: "o2", farmer: "Mary Wanjiku", quantity: 15, date: "2025-09-02" },
]

export default function OfftakePage() {
  const [offtakes, setOfftakes] = useState(SEED_OFFTAKES)
  const [farmer, setFarmer] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [date, setDate] = useState("")

  const addOfftake = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: Offtake = {
      id: Date.now().toString(),
      farmer,
      quantity,
      date,
    }
    setOfftakes([newEntry, ...offtakes])
    setFarmer(""); setQuantity(0); setDate("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link href="/employee" className="text-blue-600 font-medium mb-4 inline-block">← Back to Dashboard</Link>

      <h1 className="text-2xl font-bold flex items-center gap-2"><Milk className="h-6 w-6"/> Milk Offtakes</h1>
      <p className="text-gray-600 mb-6">Record milk collected from farmers</p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Offtake</CardTitle>
          <CardDescription>Enter details of milk collected</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addOfftake} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><Label>Farmer</Label><Input value={farmer} onChange={e => setFarmer(e.target.value)} /></div>
            <div><Label>Quantity (L)</Label><Input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} /></div>
            <div><Label>Date</Label><Input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
            <div className="flex items-end"><Button type="submit">Save</Button></div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Offtake Records</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left"><th>Farmer</th><th>Quantity (L)</th><th>Date</th></tr></thead>
            <tbody>
              {offtakes.map(o => (
                <tr key={o.id} className="border-t">
                  <td className="py-2">{o.farmer}</td>
                  <td className="py-2">{o.quantity}</td>
                  <td className="py-2">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
