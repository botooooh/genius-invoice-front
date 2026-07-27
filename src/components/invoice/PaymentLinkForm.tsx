import { useState } from 'react';
import type { Invoice } from '../../types';
import { createPaymentLink } from '../../services/api';

export default function PaymentLinkForm({ invoice, onDone }: { invoice: Invoice; onDone: () => void }) {
  const [customerEmail, setCustomerEmail] = useState('');
  const [escrow, setEscrow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await createPaymentLink({
        invoice_id: invoice.id,
        customer_email: customerEmail || undefined,
        escrow,
      });
      setLink(result.payment_url);
    } catch {
      setError('Échec de la génération du lien de paiement.');
    } finally {
      setSubmitting(false);
    }
  }

  if (link) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Lien de paiement GeniusPay généré :</p>
        <a href={link} target="_blank" rel="noreferrer" className="block break-all text-sm text-blue-600 hover:underline bg-blue-50 rounded-md p-3">
          {link}
        </a>
        <button
          className="w-full border border-gray-300 rounded-md py-2 text-sm font-medium hover:bg-gray-50"
          onClick={onDone}
        >
          Fermer
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email du client (optionnel)</label>
        <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={escrow} onChange={(e) => setEscrow(e.target.checked)} />
        Activer le séquestre (Escrow)
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white font-semibold rounded-md py-2.5 text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Génération…' : 'Générer le lien de paiement'}
      </button>
    </form>
  );
}
