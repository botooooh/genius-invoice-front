import type { QuoteItemInput } from '../../types';

interface QuoteItemsEditorProps {
  items: QuoteItemInput[];
  onChange: (items: QuoteItemInput[]) => void;
  currency: string;
}

function emptyItem(): QuoteItemInput {
  return { description: '', quantity: 1, unit_price: 0, discount: 0, vat_rate: 18 };
}

function lineTotals(item: QuoteItemInput) {
  const totalHt = item.quantity * item.unit_price * (1 - item.discount / 100);
  const totalTtc = totalHt * (1 + item.vat_rate / 100);
  return { totalHt, totalTtc };
}

export default function QuoteItemsEditor({ items, onChange, currency }: QuoteItemsEditorProps) {
  function updateItem(index: number, patch: Partial<QuoteItemInput>) {
    const next = items.map((item, i) => (i === index ? { ...item, ...patch } : item));
    onChange(next);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  const subtotalHt = items.reduce((sum, item) => sum + lineTotals(item).totalHt, 0);
  const totalTtc = items.reduce((sum, item) => sum + lineTotals(item).totalTtc, 0);
  const totalVat = totalTtc - subtotalHt;

  return (
    <div className="space-y-3">
      <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 uppercase px-1">
        <span className="col-span-4">Description</span>
        <span className="col-span-2">Qté</span>
        <span className="col-span-2">Prix unitaire</span>
        <span className="col-span-1">Remise %</span>
        <span className="col-span-1">TVA %</span>
        <span className="col-span-2 text-right">Total TTC</span>
      </div>

      {items.map((item, index) => {
        const { totalTtc: lineTtc } = lineTotals(item);
        return (
          <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50 rounded-lg p-2">
            <input
              className="col-span-12 md:col-span-4 border border-gray-300 rounded-md px-2 py-1.5 text-sm"
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(index, { description: e.target.value })}
            />
            <input
              type="number"
              min={0}
              step="0.01"
              className="col-span-4 md:col-span-2 border border-gray-300 rounded-md px-2 py-1.5 text-sm"
              value={item.quantity}
              onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })}
            />
            <input
              type="number"
              min={0}
              step="0.01"
              className="col-span-4 md:col-span-2 border border-gray-300 rounded-md px-2 py-1.5 text-sm"
              value={item.unit_price}
              onChange={(e) => updateItem(index, { unit_price: Number(e.target.value) })}
            />
            <input
              type="number"
              min={0}
              max={100}
              className="col-span-2 md:col-span-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm"
              value={item.discount}
              onChange={(e) => updateItem(index, { discount: Number(e.target.value) })}
            />
            <input
              type="number"
              min={0}
              className="col-span-2 md:col-span-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm"
              value={item.vat_rate}
              onChange={(e) => updateItem(index, { vat_rate: Number(e.target.value) })}
            />
            <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-end gap-3">
              <span className="text-sm font-semibold text-gray-700">
                {lineTtc.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} {currency}
              </span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 text-sm font-medium"
                onClick={() => removeItem(index)}
              >
                Supprimer
              </button>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
        onClick={() => onChange([...items, emptyItem()])}
      >
        + Ajouter une ligne
      </button>

      <div className="border-t border-gray-200 pt-3 flex flex-col items-end gap-1 text-sm">
        <p className="text-gray-500">
          Sous-total HT : <span className="font-medium text-gray-800">{subtotalHt.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} {currency}</span>
        </p>
        <p className="text-gray-500">
          TVA : <span className="font-medium text-gray-800">{totalVat.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} {currency}</span>
        </p>
        <p className="text-base font-bold text-gray-900">
          Total TTC : {totalTtc.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} {currency}
        </p>
      </div>
    </div>
  );
}

export { emptyItem };
