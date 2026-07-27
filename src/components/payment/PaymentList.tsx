import type { Payment } from '../../types';
import StatusBadge from '../common/StatusBadge';

function formatAmount(value: number, currency = ''): string {
  return `${value.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} ${currency}`.trim();
}

export default function PaymentList({ payments }: { payments: Payment[] }) {
  if (payments.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">Aucun paiement pour le moment.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
            <th className="py-2 pr-4">Transaction</th>
            <th className="py-2 pr-4">Méthode</th>
            <th className="py-2 pr-4">Statut</th>
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4 text-right">Montant</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 pr-4 font-mono text-xs text-gray-600">{payment.transaction_id ?? payment.id.slice(0, 8)}</td>
              <td className="py-3 pr-4 text-gray-700">{payment.method.replace(/_/g, ' ')}</td>
              <td className="py-3 pr-4">
                <StatusBadge status={payment.status} />
              </td>
              <td className="py-3 pr-4 text-gray-500">{payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('fr-FR') : '—'}</td>
              <td className="py-3 pr-4 text-right font-semibold text-gray-900">{formatAmount(payment.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
