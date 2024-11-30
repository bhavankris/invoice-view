import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Invoice } from "@/types/invoice"

interface InvoiceDetailsProps {
  invoice: Invoice;
}

export function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="font-medium">Invoice Number</dt>
            <dd>{invoice.invoiceNumber}</dd>
          </div>
          <div>
            <dt className="font-medium">Vendor</dt>
            <dd>{invoice.vendorName}</dd>
          </div>
          <div>
            <dt className="font-medium">Amount</dt>
            <dd>${invoice.amount.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="font-medium">PO Number</dt>
            <dd>{invoice.poNumber}</dd>
          </div>
          <div>
            <dt className="font-medium">Status</dt>
            <dd>{invoice.status}</dd>
          </div>
          <div>
            <dt className="font-medium">Source</dt>
            <dd>{invoice.source}</dd>
          </div>
          <div>
            <dt className="font-medium">Created At</dt>
            <dd>{new Date(invoice.createdAt).toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-medium">Last Updated</dt>
            <dd>{new Date(invoice.lastUpdated).toLocaleString()}</dd>
          </div>
          {invoice.warningMessage && (
            <div className="col-span-2">
              <dt className="font-medium">Warning</dt>
              <dd>{invoice.warningMessage}</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}

