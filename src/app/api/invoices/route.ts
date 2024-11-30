import { NextRequest, NextResponse } from "next/server"
import { getInvoices } from "@/lib/db/invoice-service"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search') || undefined
  const type = searchParams.get('type') as 'edi' | 'manual' | 'all' | undefined
  const status = searchParams.get('status') || undefined
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    const invoices = await getInvoices({
      search,
      type,
      status,
      page,
      limit
    })

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}

