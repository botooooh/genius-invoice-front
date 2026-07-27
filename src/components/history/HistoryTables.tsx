import type { HistoryInvoice, HistoryPayment, HistoryQuote } from '../../types';
import StatusBadge from '../common/StatusBadge';
import { downloadInvoicePdf, downloadQuotePdf } from '../../services/api';

function formatAmount(value: number, currency: string): string {
  return `${value.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} ${currency}`;
}

function IntegrityHash({ hash }: { hash: string | null }) {
  if (!hash) return <span className="text-gray-300">—</span>;
  return <span className="font-mono text-[11px] text-gray-400" title={hash}>{hash.slice(0, 10)}…</span>;
}

export function HistoryQuoteTable({ quotes }: { quotes: HistoryQuote[] }) {
  if (quotes.length === 0) return <p className="text-sm text-gray-500 py-8 text-center">Aucun devis.</p>;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
          <th className="py-2 pr-4">Numéro</th>
          <th className="py-2 pr-4">Client</th>
          <th className="py-2 pr-4">Statut</th>
          <th className="py-2 pr-4 text-right">Total TTC</th>
          <th className="py-2 pr-4">Empreinte</th>
          <th className="py-2 pr-4"></th>
        </tr>
      </thead>
      <tbody>
        {quotes.map((q) => (
          <tr key={q.id} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 pr-4 font-medium text-gray-800">{q.number}</td>
            <td className="py-3 pr-4 text-gray-600">{q.client_name}</td>
            <td className="py-3 pr-4"><StatusBadge status={q.status} /></td>
            <td className="py-3 pr-4 text-right font-semibold text-gray-900">{formatAmount(q.total_ttc, q.currency)}</td>
            <td className="py-3 pr-4"><IntegrityHash hash={q.integrity_hash} /></td>
            <td className="py-3 pr-4 text-right">
              <button className="text-xs font-semibold text-blue-600 hover:underline" onClick={() => downloadQuotePdf(q.id, q.number)}>
                PDF
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function HistoryInvoiceTable({ invoices }: { invoices: HistoryInvoice[] }) {
  if (invoices.length === 0) return <p className="text-sm text-gray-500 py-8 text-center">Aucune facture.</p>;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
          <th className="py-2 pr-4">Numéro</th>
          <th className="py-2 pr-4">Statut</th>
          <th className="py-2 pr-4 text-right">Encaissé</th>
          <th className="py-2 pr-4 text-right">Total TTC</th>
          <th className="py-2 pr-4">Empreinte</th>
          <th className="py-2 pr-4"></th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv) => (
          <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 pr-4 font-medium text-gray-800">{inv.number}</td>
            <td className="py-3 pr-4"><StatusBadge status={inv.status} /></td>
            <td className="py-3 pr-4 text-right text-gray-700">{formatAmount(inv.paid_amount, inv.currency)}</td>
            <td className="py-3 pr-4 text-right font-semibold text-gray-900">{formatAmount(inv.total_ttc, inv.currency)}</td>
            <td className="py-3 pr-4"><IntegrityHash hash={inv.integrity_hash} /></td>
            <td className="py-3 pr-4 text-right">
              <button className="text-xs font-semibold text-blue-600 hover:underline" onClick={() => downloadInvoicePdf(inv.id, inv.number)}>
                PDF
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function HistoryPaymentTable({ payments }: { payments: HistoryPayment[] }) {
  if (payments.length === 0) return <p className="text-sm text-gray-500 py-8 text-center">Aucun paiement.</p>;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
          <th className="py-2 pr-4">Transaction</th>
          <th className="py-2 pr-4">Méthode</th>
          <th className="py-2 pr-4">Statut</th>
          <th className="py-2 pr-4 text-right">Montant</th>
          <th className="py-2 pr-4">Empreinte</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 pr-4 font-mono text-xs text-gray-600">{p.transaction_id ?? p.id.slice(0, 8)}</td>
            <td className="py-3 pr-4 text-gray-600 capitalize">{p.method.replace(/_/g, ' ')}</td>
            <td className="py-3 pr-4"><StatusBadge status={p.status} /></td>
            <td className="py-3 pr-4 text-right font-semibold text-gray-900">{p.amount.toLocaleString('fr-FR')}</td>
            <td className="py-3 pr-4"><IntegrityHash hash={p.integrity_hash} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
