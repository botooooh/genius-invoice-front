import type { PublicQuote } from '../../types';

interface QuoteTotalsProps {
  quote: PublicQuote;
  formatCurrency: (amount: number, currency: string) => string;
}

export default function QuoteTotals({ quote, formatCurrency }: QuoteTotalsProps) {
  return (
    <div className="flex flex-col">
      {/* Totals Section */}
      <div className="bg-white border-x border-gray-100 p-6 sm:p-8 flex flex-col items-end gap-2.5 border-b border-gray-100">
        <div className="flex justify-between w-64 text-sm">
          <span className="text-gray-500 font-medium">Total HT</span>
          <span className="text-gray-800 font-bold">{formatCurrency(quote.subtotal_ht, quote.currency)}</span>
        </div>
        <div className="flex justify-between w-64 text-sm">
          <span className="text-gray-500 font-medium">TVA</span>
          <span className="text-gray-800 font-bold">{formatCurrency(quote.total_vat, quote.currency)}</span>
        </div>
        <div className="flex justify-between w-64 border-t-2 border-gray-100 pt-3 text-base font-black text-gray-950">
          <span>Total TTC</span>
          <span className="text-blue-600">{formatCurrency(quote.total_ttc, quote.currency)}</span>
        </div>
      </div>

      {/* Payment Conditions & Notes */}
      {(quote.conditions || quote.delivery_delay || quote.notes) && (
        <div className="bg-gray-50/50 border-x border-b border-gray-100 p-6 sm:p-8 rounded-b-xl space-y-2">
          {quote.conditions && (
            <p className="text-xs text-gray-600">
              <strong className="text-gray-700 font-bold">Conditions de paiement :</strong> {quote.conditions}
            </p>
          )}
          {quote.delivery_delay && (
            <p className="text-xs text-gray-600">
              <strong className="text-gray-700 font-bold">Délai de livraison :</strong> {quote.delivery_delay}
            </p>
          )}
          {quote.notes && (
            <p className="text-xs text-gray-500 italic pt-1 border-t border-gray-100">
              {quote.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
