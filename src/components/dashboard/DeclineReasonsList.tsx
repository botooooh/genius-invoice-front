import type { DeclineReason } from '../../types';

interface DeclineReasonsListProps {
  reasons: DeclineReason[];
}

export default function DeclineReasonsList({ reasons }: DeclineReasonsListProps) {
  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-semibold text-gray-800 text-base">Motifs de refus des devis</h3>
      </div>
      <div className="p-6">
        <ul className="flex flex-col gap-4">
          {reasons.map((item) => (
            <li key={item.reason} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
              <span className="text-gray-600 text-sm font-medium">{item.reason}</span>
              <span className="font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full text-xs">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
