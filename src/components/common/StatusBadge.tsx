const STATUS_STYLES: Record<string, string> = {
  // Quotes
  draft: 'bg-gray-100 text-gray-600',
  published: 'bg-blue-100 text-blue-700',
  accepted: 'bg-emerald-100 text-emerald-700',
  declined: 'bg-red-100 text-red-700',
  expired: 'bg-amber-100 text-amber-700',
  invoiced: 'bg-indigo-100 text-indigo-700',
  archived: 'bg-gray-100 text-gray-500',
  // Invoices
  created: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  pending_payment: 'bg-amber-100 text-amber-700',
  partially_paid: 'bg-amber-100 text-amber-700',
  paid: 'bg-emerald-100 text-emerald-700',
  overdue: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-100 text-gray-500',
  // Payments
  pending: 'bg-amber-100 text-amber-700',
  success: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-indigo-100 text-indigo-700',
  // Escrow
  held: 'bg-blue-100 text-blue-700',
  released: 'bg-emerald-100 text-emerald-700',
  disputed: 'bg-red-100 text-red-700',
};

const DEFAULT_STYLE = 'bg-gray-100 text-gray-600';

export default function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? DEFAULT_STYLE;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${style}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
