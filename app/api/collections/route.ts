import { NextResponse } from "next/server"

let collections: any[] = []

export async function GET() {
  return NextResponse.json(collections)
}

export async function POST(req: Request) {
  const data = await req.json()

  const newEntry = {
    id: Date.now().toString(),
    farmer: data.farmer,
    quantity: data.quantity,
    quality: data.quality,  // 👈 make sure quality is captured
    date: data.date,
  }

  collections.unshift(newEntry)
  return NextResponse.json({ success: true, entry: newEntry })
}
