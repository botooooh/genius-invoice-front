import { useState } from 'react';
import type { Invoice } from '../../types';
import { recordManualPayment } from '../../services/api';

const METHODS = ['manual', 'bank_transfer', 'orange_money', 'mtn_momo', 'wave', 'card'];

export default function RecordPaymentForm({ invoice, onDone }: { invoice: Invoice; onDone: () => void }) {
  const remaining = invoice.total_ttc - invoice.paid_amount;
  const [amount, setAmount] = useState(remaining);
  const [method, setMethod] = useState('manual');
  const [merchantEmail, setMerchantEmail] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await recordManualPayment(invoice.id, { amount, method, merchant_email: merchantEmail, client_email: clientEmail });
      onDone();
    } catch {
      setError("Échec de l'enregistrement du paiement.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Montant ({invoice.currency})</label>
        <input
          type="number"
          min={0}
          step="0.01"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Moyen de paiement</label>
        <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" value={method} onChange={(e) => setMethod(e.target.value)}>
          {METHODS.map((m) => (
            <option key={m} value={m}>{m.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email marchand (notification)</label>
        <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" value={merchantEmail} onChange={(e) => setMerchantEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email client (reçu)</label>
        <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white font-semibold rounded-md py-2.5 text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Enregistrement…' : 'Enregistrer le paiement'}
      </button>
    </form>
  );
}
