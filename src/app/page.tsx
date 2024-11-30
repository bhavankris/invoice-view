import { Suspense } from "react"
import { InvoiceFilters } from "@/components/invoice-filters"
import { InvoiceTable } from "@/components/invoice-table"
import { EDIViewToggle } from "@/components/edi-view-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getInvoices, getEDITransactions, EDIView } from "@/lib/invoice-service"

interface TabData {
  id: 'invoices' | 'edi';
  label: string;
  description: string;
}

const tabs: TabData[] = [
  {
    id: 'invoices',
    label: 'Invoices',
    description: 'View all processed invoices'
  },
  {
    id: 'edi',
    label: 'EDI Transactions',
    description: 'View EDI transactions and errors'
  }
]

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const currentTab = (searchParams.tab || 'invoices') as 'invoices' | 'edi'
  const currentSearch = searchParams.search || ''
  const currentStatus = searchParams.status || ''
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1
  const currentEDIView = (searchParams.ediView || 'errors') as EDIView
  const currentSource = searchParams.source || 'all';

  const filterParams = {
    search: currentSearch,
    status: currentStatus,
    source: currentSource,
    page: currentPage,
    limit: 10,
    view: currentEDIView
  }

  const { invoices = [], total: invoiceTotal = 0 } = await getInvoices(filterParams) || {}
  const { ediTransactions = [], total: ediTotal = 0 } = await getEDITransactions(filterParams) || {}

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Management</CardTitle>
          <CardDescription>
            Manage invoices and view EDI transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue={currentTab} className="space-y-6">
            <TabsList>
              {tabs.map(tab => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {tabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {tab.label}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {tab.description}
                    {tab.id === 'invoices' && invoiceTotal > 0 && ` • ${invoiceTotal} total records`}
                    {tab.id === 'edi' && ediTotal > 0 && ` • ${ediTotal} total records`}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <InvoiceFilters view={tab.id} currentSource={currentSource} />
                  {tab.id === 'edi' && (
                    <EDIViewToggle currentEDIView={currentEDIView} />
                  )}
                </div>
                
                <Suspense fallback={<div>Loading...</div>}>
                  <InvoiceTable 
                    data={tab.id === 'invoices' ? invoices : ediTransactions}
                    view={tab.id}
                  />
                </Suspense>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

