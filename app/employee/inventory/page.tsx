"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  quantity: number
  unit: string
}

const SEED_INVENTORY: InventoryItem[] = [
  { id: "i1", name: "Milk Canisters", quantity: 12, unit: "pcs" },
  { id: "i2", name: "Cooler Bags", quantity: 5, unit: "pcs" },
  { id: "i3", name: "Testing Kits", quantity: 30, unit: "kits" },
]

export default function InventoryPage() {
  const [items, setItems] = useState(SEED_INVENTORY)
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState("")

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name,
      quantity,
      unit,
    }
    setItems([newItem, ...items])
    setName(""); setQuantity(0); setUnit("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link href="/employee" className="text-blue-600 font-medium mb-4 inline-block">← Back to Dashboard</Link>

      <h1 className="text-2xl font-bold flex items-center gap-2"><Package className="h-6 w-6"/> Inventory</h1>
      <p className="text-gray-600 mb-6">Track tools, materials, and supplies</p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Item</CardTitle>
          <CardDescription>Record new inventory item</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
            <div><Label>Quantity</Label><Input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} /></div>
            <div><Label>Unit</Label><Input value={unit} onChange={e => setUnit(e.target.value)} /></div>
            <div className="flex items-end"><Button type="submit">Save</Button></div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Inventory List</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left"><th>Name</th><th>Qty</th><th>Unit</th></tr></thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id} className="border-t">
                  <td className="py-2">{i.name}</td>
                  <td className="py-2">{i.quantity}</td>
                  <td className="py-2">{i.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
