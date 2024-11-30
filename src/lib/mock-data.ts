import { Invoice, EDITransaction, InvoiceStatus, InvoiceSource, EDIStatus } from '@/types/invoice';

const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

const invoiceStatuses: InvoiceStatus[] = ['accepted', 'accepted_with_warning', 'matched', 'paid', 'cancelled'];
const invoiceSources: InvoiceSource[] = ['edi', 'manual'];
const ediStatuses: EDIStatus[] = ['error', 'duplicate', 'processed'];

export const invoices: Invoice[] = Array.from({ length: 50 }, (_, index) => {
  const status = invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)];
  return {
    id: `INV-${index + 1}`,
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    vendorName: `Vendor ${index % 5 + 1}`,
    amount: Math.floor(Math.random() * 10000) / 100,
    poNumber: `PO-${Math.floor(Math.random() * 10000)}`,
    status,
    source: invoiceSources[Math.floor(Math.random() * invoiceSources.length)],
    createdAt: randomDate(new Date(2023, 0, 1), new Date()),
    lastUpdated: randomDate(new Date(2023, 0, 1), new Date()),
    ...(status === 'accepted_with_warning' ? { warningMessage: 'Minor discrepancy in line items' } : {})
  };
});

export const ediTransactions: EDITransaction[] = Array.from({ length: 100 }, (_, index) => {
  const status = ediStatuses[Math.floor(Math.random() * ediStatuses.length)];
  const hasValidInvoice = Math.random() > 0.3; // 70% chance of having a valid invoice
  return {
    id: `EDI-${index + 1}`,
    utr: `UTR-${Math.floor(Math.random() * 1000000)}`,
    invoiceNumber: `EDI-${Math.floor(Math.random() * 10000)}`,
    vendorName: `EDI Vendor ${index % 5 + 1}`,
    amount: Math.floor(Math.random() * 10000) / 100,
    poNumber: `PO-${Math.floor(Math.random() * 10000)}`,
    status,
    errorMessages: status === 'error' ? [
      'Invalid PO number',
      'Amount exceeds PO limit',
      'Vendor details mismatch'
    ] : [],
    createdAt: randomDate(new Date(2023, 0, 1), new Date()),
    lastUpdated: randomDate(new Date(2023, 0, 1), new Date()),
    hasValidInvoice
  };
});

