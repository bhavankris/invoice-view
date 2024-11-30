import { getInvoiceById } from "@/lib/invoice-service"
import { InvoiceDetails } from "@/components/invoice-details"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { InvoiceTimeline } from "@/components/invoice-timeline";

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const invoice = await getInvoiceById(params.id);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <InvoiceDetails invoice={invoice} />
          <Card>
            <CardHeader>
              <CardTitle>EDI Details</CardTitle>
              <CardDescription>Transaction details from EDI 810</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Sender ID</div>
                    <div className="text-muted-foreground">SID123456</div>
                  </div>
                  <div>
                    <div className="font-medium">Receiver ID</div>
                    <div className="text-muted-foreground">RID789012</div>
                  </div>
                  <div>
                    <div className="font-medium">Control Number</div>
                    <div className="text-muted-foreground">CN456789</div>
                  </div>
                  <div>
                    <div className="font-medium">Transaction Set</div>
                    <div className="text-muted-foreground">810</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Version History</CardTitle>
            <CardDescription>Timeline of invoice processing attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceTimeline versions={[
              {
                id: "1",
                utr: "UTR001",
                version: 1,
                timestamp: "2023-06-01 09:00 AM",
                status: "failed",
                validationErrors: [
                  {
                    type: "po",
                    message: "PO number does not match our records",
                  },
                ],
              },
              {
                id: "2",
                utr: "UTR002",
                version: 2,
                timestamp: "2023-06-01 10:30 AM",
                status: "processing",
              },
              {
                id: "3",
                utr: "UTR003",
                version: 3,
                timestamp: "2023-06-01 11:45 AM",
                status: "accepted",
              },
            ]} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

