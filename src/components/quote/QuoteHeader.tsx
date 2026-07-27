import type { PublicQuote } from '../../types';

interface QuoteHeaderProps {
  quote: PublicQuote;
  formatDate: (dateStr: string) => string;
}

export default function QuoteHeader({ quote, formatDate }: QuoteHeaderProps) {
  const isExpired = quote.is_expired || quote.status === 'expired';

  const badgeClasses: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    published: 'bg-blue-100 text-blue-800',
    accepted: 'bg-emerald-100 text-emerald-800',
    declined: 'bg-red-100 text-red-800',
    expired: 'bg-amber-100 text-amber-800',
    invoiced: 'bg-indigo-100 text-indigo-800',
    paid: 'bg-emerald-100 text-emerald-800',
  };

  const statusLabels: Record<string, string> = {
    draft: 'Brouillon',
    published: 'Publié',
    accepted: 'Accepté',
    declined: 'Refusé',
    expired: 'Expiré',
    invoiced: 'Facturé',
    paid: 'Payé',
  };

  const currentStatus = isExpired ? 'expired' : quote.status;

  return (
    <div className="flex flex-col gap-4">
      {/* Workspace Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
        {quote.workspace.logo ? (
          <img
            src={quote.workspace.logo}
            alt={quote.workspace.name}
            className="w-12 h-12 rounded-lg object-contain bg-gray-50 border border-gray-150 p-1 shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg uppercase shrink-0">
            {quote.workspace.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900 truncate">{quote.workspace.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 truncate leading-relaxed">
            {quote.workspace.address}
            {quote.workspace.rccm && ` • RCCM: ${quote.workspace.rccm}`}
            {quote.workspace.nif && ` • NIF: ${quote.workspace.nif}`}
          </p>
        </div>
      </div>

      {/* Quote Meta Header */}
      <div className="bg-white rounded-t-xl border-t border-x border-gray-100 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950">Devis {quote.number}</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-semibold">
              Émis le {formatDate(quote.issue_date)}
              {quote.expiry_date && ` — Expire le ${formatDate(quote.expiry_date)}`}
            </p>
          </div>
          <span className={`self-start sm:self-center inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeClasses[currentStatus] || 'bg-gray-100 text-gray-800'}`}>
            {statusLabels[currentStatus] || currentStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
