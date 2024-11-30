export type InvoiceStatus = 'accepted' | 'accepted_with_warning' | 'matched' | 'paid' | 'cancelled';
export type InvoiceSource = 'edi' | 'manual';
export type EDIStatus = 'error' | 'duplicate' | 'processed';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  amount: number;
  poNumber: string;
  status: InvoiceStatus;
  source: InvoiceSource;
  lastUpdated: string;
  createdAt: string;
  warningMessage?: string;
}

export interface EDITransaction {
  id: string;
  utr: string;
  invoiceNumber: string;
  vendorName: string;
  amount: number;
  poNumber: string;
  status: EDIStatus;
  errorMessages: string[];
  createdAt: string;
  lastUpdated: string;
  hasValidInvoice: boolean;
}

export interface InvoiceVersion {
  id: string;
  utr: string;
  version: number;
  timestamp: string;
  status: 'accepted' | 'failed' | 'processing';
  validationErrors?: Array<{
    type: string;
    message: string;
  }>;
}

