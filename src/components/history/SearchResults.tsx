import type { UnifiedDocument } from '../../types';
import StatusBadge from '../common/StatusBadge';

const TYPE_LABELS: Record<string, string> = {
  quote: 'Devis',
  invoice: 'Facture',
  payment: 'Paiement',
};

export default function SearchResults({ results }: { results: UnifiedDocument[] }) {
  if (results.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">Aucun résultat.</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
          <th className="py-2 pr-4">Type</th>
          <th className="py-2 pr-4">Référence</th>
          <th className="py-2 pr-4">Statut</th>
          <th className="py-2 pr-4 text-right">Montant</th>
        </tr>
      </thead>
      <tbody>
        {results.map((doc) => (
          <tr key={`${doc.document_type}-${doc.id}`} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 pr-4 text-gray-600">{TYPE_LABELS[doc.document_type] ?? doc.document_type}</td>
            <td className="py-3 pr-4 font-medium text-gray-800">{doc.reference}</td>
            <td className="py-3 pr-4"><StatusBadge status={doc.status} /></td>
            <td className="py-3 pr-4 text-right font-semibold text-gray-900">
              {doc.amount.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} {doc.currency}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
