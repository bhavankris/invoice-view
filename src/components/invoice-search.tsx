"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function InvoiceSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSearch = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set('search', query)
    } else {
      params.delete('search')
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by invoice number, vendor, or PO..."
          className="pl-8"
          defaultValue={searchParams.get('search') || ''}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  )
}

