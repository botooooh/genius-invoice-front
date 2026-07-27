import type { PublicQuote } from '../../types';

interface QuoteClientInfoProps {
  quote: PublicQuote;
}

export default function QuoteClientInfo({ quote }: QuoteClientInfoProps) {
  return (
    <div className="bg-white border-x border-gray-100 p-6 sm:p-8 border-b border-gray-100">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Facturé à :</p>
      <div className="space-y-0.5">
        <h4 className="font-bold text-gray-900 text-base">{quote.client_name}</h4>
        {quote.client_email && <p className="text-sm text-gray-500 font-medium">{quote.client_email}</p>}
        {quote.client_phone && <p className="text-sm text-gray-500 font-medium">{quote.client_phone}</p>}
        {quote.client_address && <p className="text-sm text-gray-500 font-medium">{quote.client_address}</p>}
      </div>
    </div>
  );
}
