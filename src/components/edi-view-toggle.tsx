"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"

interface EDIViewToggleProps {
  currentEDIView: 'errors' | 'all'
}

export function EDIViewToggle({ currentEDIView }: EDIViewToggleProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleToggle = () => {
    const params = new URLSearchParams(searchParams)
    params.set('ediView', currentEDIView === 'errors' ? 'all' : 'errors')
    params.set('tab', 'edi')
    router.push(`/?${params.toString()}`)
  }

  return (
    <Button variant="outline" onClick={handleToggle}>
      {currentEDIView === 'errors' ? 'Show All EDI Versions' : 'Show Only Errors'}
    </Button>
  )
}

