import type { PublicQuote } from '../../types';

interface QuoteItemsTableProps {
  quote: PublicQuote;
  formatCurrency: (amount: number, currency: string) => string;
}

export default function QuoteItemsTable({ quote, formatCurrency }: QuoteItemsTableProps) {
  return (
    <div className="bg-white border-x border-gray-100 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700 min-w-[600px]">
        <thead>
          <tr className="border-b-2 border-gray-100 bg-gray-50/30">
            <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-left">
              Description
            </th>
            <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right w-20">
              Qté
            </th>
            <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right w-36">
              PU
            </th>
            <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right w-24">
              Remise
            </th>
            <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right w-36">
              Total HT
            </th>
          </tr>
        </thead>
        <tbody>
          {quote.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/20 transition-colors">
              <td className="py-4 px-6 font-medium text-gray-900 leading-relaxed">{item.description}</td>
              <td className="py-4 px-6 text-right text-gray-600 font-semibold">{item.quantity}</td>
              <td className="py-4 px-6 text-right text-gray-600 font-semibold">
                {formatCurrency(item.unit_price, quote.currency)}
              </td>
              <td className="py-4 px-6 text-right text-amber-600 font-semibold">
                {item.discount > 0 ? `${item.discount}%` : '-'}
              </td>
              <td className="py-4 px-6 text-right text-gray-900 font-bold">
                {formatCurrency(item.total_ht, quote.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
