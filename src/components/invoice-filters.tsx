"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InvoiceFiltersProps {
  view: 'invoices' | 'edi';
  currentSource: string;
}

export function InvoiceFilters({ view, currentSource }: InvoiceFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [source, setSource] = useState(searchParams.get('source') || currentSource)


  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (search) params.set('search', search)
    else params.delete('search')
    if (status) params.set('status', status)
    else params.delete('status')
    if (source !== 'all' && source) params.set('source', source)
    else params.delete('source')
    params.set('tab', view)
    router.push(`/?${params.toString()}`)
  }, [search, status, source, router, searchParams, view])

  const statusOptions = view === 'invoices'
    ? ['All', 'Accepted', 'Accepted with Warning', 'Matched', 'Paid', 'Cancelled']
    : ['All', 'Error', 'Duplicate', 'Processed']

  const sourceOptions = ['All', 'EDI', 'Manual'];

  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-1/2">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by invoice number, vendor, or PO..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-1/3">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option} value={option.toLowerCase()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/3">
        <Select value={source} onValueChange={(value) => {
          const params = new URLSearchParams(searchParams);
          if (value !== 'All') params.set('source', value.toLowerCase());
          else params.delete('source');
          router.push(`/?${params.toString()}`);
        }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            {sourceOptions.map((option) => (
              <SelectItem key={option} value={option.toLowerCase()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

