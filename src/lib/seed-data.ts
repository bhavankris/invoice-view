export const vendors = [
  { id: 'V001', name: 'Acme Supplies', ediId: 'EDI001' },
  { id: 'V002', name: 'Global Trading Co', ediId: 'EDI002' },
  { id: 'V003', name: 'Tech Solutions Inc', ediId: 'EDI003' },
  { id: 'V004', name: 'Office Supplies Ltd', ediId: 'EDI004' },
  { id: 'V005', name: 'Industrial Parts Co', ediId: 'EDI005' }
] as const;

export const locations = [
  'WAR-001-NYC',
  'WAR-002-LAX',
  'WAR-003-CHI',
  'WAR-004-MIA',
  'WAR-005-HOU'
] as const;

export const products = [
  { id: 'P001', name: 'Laptop', price: 999.99 },
  { id: 'P002', name: 'Desk Chair', price: 199.99 },
  { id: 'P003', name: 'Printer', price: 299.99 },
  { id: 'P004', name: 'Paper Supplies', price: 49.99 },
  { id: 'P005', name: 'Office Desk', price: 399.99 }
] as const;

