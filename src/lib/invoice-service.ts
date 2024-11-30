import { Invoice, EDITransaction, InvoiceStatus, InvoiceSource, EDIStatus } from "@/types/invoice"

export type EDIView = 'errors' | 'all';

interface FilterParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  view?: EDIView;
}

export async function getInvoices(params: FilterParams): Promise<{
  invoices: Invoice[];
  total: number;
}> {
  try {
    let filteredInvoices = [...invoices];

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredInvoices = filteredInvoices.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
        invoice.vendorName.toLowerCase().includes(searchLower) ||
        invoice.poNumber.toLowerCase().includes(searchLower)
      );
    }

    if (params.status && params.status !== 'all') {
      filteredInvoices = filteredInvoices.filter(invoice => 
        invoice.status.toLowerCase() === params.status?.toLowerCase()
      );
    }

    filteredInvoices.sort((a, b) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );

    const total = filteredInvoices.length;
    const startIndex = ((params.page || 1) - 1) * (params.limit || 10);
    const endIndex = startIndex + (params.limit || 10);
    const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

    return {
      invoices: paginatedInvoices,
      total
    };
  } catch (error) {
    console.error('Error in getInvoices:', error);
    return {
      invoices: [],
      total: 0
    };
  }
}

export async function getEDITransactions(params: FilterParams): Promise<{
  ediTransactions: EDITransaction[];
  total: number;
}> {
  try {
    let filteredTransactions = [...ediTransactions];

    if (params.view === 'errors' || params.view === undefined) {
      filteredTransactions = filteredTransactions.filter(transaction => 
        (transaction.status === 'error' || transaction.status === 'duplicate') && !transaction.hasValidInvoice
      );
    }

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredTransactions = filteredTransactions.filter(transaction => 
        transaction.invoiceNumber.toLowerCase().includes(searchLower) ||
        transaction.vendorName.toLowerCase().includes(searchLower) ||
        transaction.poNumber.toLowerCase().includes(searchLower)
      );
    }

    if (params.status && params.status !== 'all') {
      filteredTransactions = filteredTransactions.filter(transaction => 
        transaction.status.toLowerCase() === params.status?.toLowerCase()
      );
    }

    // Group transactions by invoiceNumber, vendorName, and poNumber
    const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
      const key = `${transaction.invoiceNumber}-${transaction.vendorName}-${transaction.poNumber}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(transaction);
      return acc;
    }, {} as Record<string, EDITransaction[]>);

    // Sort transactions within each group by lastUpdated (newest first)
    Object.values(groupedTransactions).forEach(group => {
      group.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    });

    // Flatten the grouped transactions back into a single array
    const sortedTransactions = Object.values(groupedTransactions).flat();

    const total = sortedTransactions.length;
    const startIndex = ((params.page || 1) - 1) * (params.limit || 10);
    const endIndex = startIndex + (params.limit || 10);
    const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex);

    return {
      ediTransactions: paginatedTransactions,
      total
    };
  } catch (error) {
    console.error('Error in getEDITransactions:', error);
    return {
      ediTransactions: [],
      total: 0
    };
  }
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  const invoice = invoices.find(inv => inv.id === id);
  if (!invoice) {
    console.log(`Invoice with id ${id} not found`);
    return null;
  }
  console.log(`Found invoice:`, invoice);
  return invoice;
}

export const invoices: Invoice[] = [
  {
    id: "INV-001",
    invoiceNumber: "INV-2023-001",
    vendorName: "Acme Supplies",
    amount: 1500.00,
    poNumber: "PO-2023-001",
    status: "accepted" as InvoiceStatus,
    source: "edi" as InvoiceSource,
    lastUpdated: "2023-05-15T10:30:00Z",
    createdAt: "2023-05-15T09:00:00Z"
  },
  {
    id: "INV-002",
    invoiceNumber: "INV-2023-002",
    vendorName: "Global Trading Co",
    amount: 2750.50,
    poNumber: "PO-2023-002",
    status: "accepted_with_warning" as InvoiceStatus,
    source: "manual" as InvoiceSource,
    lastUpdated: "2023-05-16T14:45:00Z",
    createdAt: "2023-05-16T13:30:00Z",
    warningMessage: "Amount exceeds PO by $250.50"
  },
  {
    id: "INV-003",
    invoiceNumber: "INV-2023-003",
    vendorName: "Tech Solutions Inc",
    amount: 5000.00,
    poNumber: "PO-2023-003",
    status: "matched" as InvoiceStatus,
    source: "edi" as InvoiceSource,
    lastUpdated: "2023-05-17T11:15:00Z",
    createdAt: "2023-05-17T10:00:00Z"
  }
];

export const ediTransactions: EDITransaction[] = [
  {
    id: "EDI-001",
    utr: "UTR-2023-001",
    invoiceNumber: "INV-2023-001",
    vendorName: "Acme Supplies",
    amount: 1500.00,
    poNumber: "PO-2023-001",
    status: "processed" as EDIStatus,
    errorMessages: [],
    createdAt: "2023-05-15T09:00:00Z",
    lastUpdated: "2023-05-15T09:05:00Z",
    hasValidInvoice: true
  },
  {
    id: "EDI-002",
    utr: "UTR-2023-002",
    invoiceNumber: "INV-2023-004",
    vendorName: "Office Supplies Ltd",
    amount: 750.25,
    poNumber: "PO-2023-004",
    status: "error" as EDIStatus,
    errorMessages: ["Invalid PO number"],
    createdAt: "2023-05-18T08:30:00Z",
    lastUpdated: "2023-05-18T08:35:00Z",
    hasValidInvoice: false
  },
  {
    id: "EDI-003",
    utr: "UTR-2023-003",
    invoiceNumber: "INV-2023-003",
    vendorName: "Tech Solutions Inc",
    amount: 5000.00,
    poNumber: "PO-2023-003",
    status: "processed" as EDIStatus,
    errorMessages: [],
    createdAt: "2023-05-17T10:00:00Z",
    lastUpdated: "2023-05-17T10:05:00Z",
    hasValidInvoice: true
  }
];

