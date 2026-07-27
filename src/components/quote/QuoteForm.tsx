import { useState } from 'react';
import type { Quote, QuoteCreatePayload, QuoteItemInput } from '../../types';
import QuoteItemsEditor, { emptyItem } from './QuoteItemsEditor';

interface QuoteFormProps {
  initial?: Quote;
  onSubmit: (payload: QuoteCreatePayload) => Promise<void>;
  submitLabel: string;
}

export default function QuoteForm({ initial, onSubmit, submitLabel }: QuoteFormProps) {
  const [clientName, setClientName] = useState(initial?.client_name ?? '');
  const [clientEmail, setClientEmail] = useState(initial?.client_email ?? '');
  const [clientPhone, setClientPhone] = useState(initial?.client_phone ?? '');
  const [clientAddress, setClientAddress] = useState(initial?.client_address ?? '');
  const [expiryDate, setExpiryDate] = useState(initial?.expiry_date ?? '');
  const [conditions, setConditions] = useState(initial?.conditions ?? '');
  const [deliveryDelay, setDeliveryDelay] = useState(initial?.delivery_delay ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [currency, setCurrency] = useState(initial?.currency ?? 'XOF');
  const [items, setItems] = useState<QuoteItemInput[]>(
    initial?.items.map((i) => ({
      description: i.description,
      quantity: i.quantity,
      unit_price: i.unit_price,
      discount: i.discount,
      vat_rate: i.vat_rate,
    })) ?? [emptyItem()]
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName.trim() || items.length === 0) {
      setError('Le nom du client et au moins une ligne sont requis.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        client_name: clientName,
        client_email: clientEmail || undefined,
        client_phone: clientPhone || undefined,
        client_address: clientAddress || undefined,
        expiry_date: expiryDate || undefined,
        conditions: conditions || undefined,
        delivery_delay: deliveryDelay || undefined,
        notes: notes || undefined,
        currency: currency || undefined,
        items,
      });
    } catch {
      setError("Échec de l'enregistrement du devis.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client *</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email client</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone client</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse client</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={expiryDate ?? ''}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Lignes du devis</label>
        <QuoteItemsEditor items={items} onChange={setItems} currency={currency || 'XOF'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Conditions de paiement</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={conditions ?? ''}
            onChange={(e) => setConditions(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Délai de livraison</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={deliveryDelay ?? ''}
            onChange={(e) => setDeliveryDelay(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          rows={2}
          value={notes ?? ''}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white font-semibold rounded-md py-2.5 text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Enregistrement…' : submitLabel}
      </button>
    </form>
  );
}
