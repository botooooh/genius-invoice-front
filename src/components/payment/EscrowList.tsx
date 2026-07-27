import { useState } from 'react';
import type { Escrow } from '../../types';
import StatusBadge from '../common/StatusBadge';
import { disputeEscrow, refundEscrow, releaseEscrow } from '../../services/api';

function formatAmount(value: number, currency: string): string {
  return `${value.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} ${currency}`;
}

export default function EscrowList({ escrows, onChange }: { escrows: Escrow[]; onChange: () => void }) {
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleAction(id: string, action: (id: string) => Promise<Escrow>) {
    setBusyId(id);
    try {
      await action(id);
      onChange();
    } finally {
      setBusyId(null);
    }
  }

  if (escrows.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">Aucun séquestre actif.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
            <th className="py-2 pr-4">Facture</th>
            <th className="py-2 pr-4">Statut</th>
            <th className="py-2 pr-4 text-right">Montant</th>
            <th className="py-2 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {escrows.map((escrow) => {
            const isBusy = busyId === escrow.id;
            const canAct = escrow.status === 'held' || escrow.status === 'disputed';
            return (
              <tr key={escrow.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 pr-4 font-mono text-xs text-gray-600">{escrow.invoice_id.slice(0, 8)}</td>
                <td className="py-3 pr-4">
                  <StatusBadge status={escrow.status} />
                </td>
                <td className="py-3 pr-4 text-right font-semibold text-gray-900">
                  {formatAmount(escrow.amount, escrow.currency)}
                </td>
                <td className="py-3 pr-4">
                  {canAct && (
                    <div className="flex gap-2">
                      <button
                        disabled={isBusy}
                        className="text-xs font-semibold text-emerald-600 hover:underline disabled:opacity-50"
                        onClick={() => handleAction(escrow.id, releaseEscrow)}
                      >
                        Libérer
                      </button>
                      <button
                        disabled={isBusy}
                        className="text-xs font-semibold text-indigo-600 hover:underline disabled:opacity-50"
                        onClick={() => handleAction(escrow.id, refundEscrow)}
                      >
                        Rembourser
                      </button>
                      {escrow.status === 'held' && (
                        <button
                          disabled={isBusy}
                          className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
                          onClick={() => handleAction(escrow.id, disputeEscrow)}
                        >
                          Contester
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
