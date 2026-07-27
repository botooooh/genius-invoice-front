import { Link } from 'react-router-dom';
import type { Quote } from '../../types';
import StatusBadge from '../common/StatusBadge';

function formatAmount(value: number, currency: string): string {
  return `${value.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} ${currency}`;
}

export default function QuoteList({ quotes }: { quotes: Quote[] }) {
  if (quotes.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">Aucun devis pour le moment.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
            <th className="py-2 pr-4">Numéro</th>
            <th className="py-2 pr-4">Client</th>
            <th className="py-2 pr-4">Statut</th>
            <th className="py-2 pr-4">Échéance</th>
            <th className="py-2 pr-4 text-right">Total TTC</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 pr-4">
                <Link to={`/app/quotes/${quote.id}`} className="font-medium text-blue-600 hover:underline">
                  {quote.number}
                </Link>
              </td>
              <td className="py-3 pr-4 text-gray-700">{quote.client_name}</td>
              <td className="py-3 pr-4">
                <StatusBadge status={quote.status} />
              </td>
              <td className="py-3 pr-4 text-gray-500">{quote.expiry_date ?? '—'}</td>
              <td className="py-3 pr-4 text-right font-semibold text-gray-900">
                {formatAmount(quote.total_ttc, quote.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
