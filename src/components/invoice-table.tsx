"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, AlertTriangle } from 'lucide-react'
import { Invoice, EDITransaction } from "../types/invoice"

interface InvoiceTableProps {
  data: (Invoice | EDITransaction)[]
  view: 'invoices' | 'edi'
}

export function InvoiceTable({ data, view }: InvoiceTableProps) {
  // const router = useRouter() //Removed as per update 3

  const getStatusBadgeVariant = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "matched":
      case "paid":
      case "processed":
        return "default"
      case "accepted_with_warning":
      case "duplicate":
        return "secondary"
      case "cancelled":
      case "error":
        return "destructive"
      default:
        return "default"
    }
  }

  // Removed handleViewInvoice function as per update 2

  const renderRow = (item: Invoice | EDITransaction, index: number) => {
    if (view === 'invoices') {
      const invoice = item as Invoice
      return (
        <TableRow key={invoice.id || `invoice-${index}`}>
          <TableCell className="font-medium">{invoice.invoiceNumber || 'N/A'}</TableCell>
          <TableCell>{invoice.vendorName || 'N/A'}</TableCell>
          <TableCell>${invoice.amount?.toFixed(2) ?? 'N/A'}</TableCell>
          <TableCell>{invoice.poNumber || 'N/A'}</TableCell>
          <TableCell>
            <Badge variant={getStatusBadgeVariant(invoice.status)}>
              {invoice.status ? invoice.status.replace('_', ' ').toUpperCase() : 'UNKNOWN'}
            </Badge>
            {invoice.status === 'accepted_with_warning' && (
              <AlertTriangle className="inline-block ml-2 h-4 w-4 text-yellow-500" />
            )}
          </TableCell>
          <TableCell>{invoice.source?.toUpperCase() || 'N/A'}</TableCell>
          <TableCell>{invoice.lastUpdated ? new Date(invoice.lastUpdated).toLocaleString() : 'N/A'}</TableCell>
          <TableCell className="text-right">
            <Button
              variant="ghost"
              size="icon"
              asChild
            >
              <a href={`/invoices/${invoice.id}`}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">View invoice</span>
              </a>
            </Button>
          </TableCell>
        </TableRow>
      )
    } else {
      const ediTransaction = item as EDITransaction
      return (
        <TableRow key={ediTransaction.id || `edi-${index}`}>
          <TableCell className="font-medium">{ediTransaction.invoiceNumber || 'N/A'}</TableCell>
          <TableCell>{ediTransaction.vendorName || 'N/A'}</TableCell>
          <TableCell>${ediTransaction.amount?.toFixed(2) ?? 'N/A'}</TableCell>
          <TableCell>{ediTransaction.poNumber || 'N/A'}</TableCell>
          <TableCell>
            <Badge variant={getStatusBadgeVariant(ediTransaction.status)}>
              {ediTransaction.status ? ediTransaction.status.toUpperCase() : 'UNKNOWN'}
            </Badge>
          </TableCell>
          <TableCell>{ediTransaction.utr || 'N/A'}</TableCell>
          <TableCell>{ediTransaction.errorMessages?.join(', ') || 'N/A'}</TableCell>
          <TableCell>{ediTransaction.lastUpdated ? new Date(ediTransaction.lastUpdated).toLocaleString() : 'N/A'}</TableCell>
        </TableRow>
      )
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>PO Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>{view === 'invoices' ? 'Source' : 'UTR'}</TableHead>
            <TableHead>{view === 'invoices' ? 'Last Updated' : 'Error Messages'}</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(renderRow)}
        </TableBody>
      </Table>
    </div>
  )
}

