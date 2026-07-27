import type { PipelineData } from '../../types';

interface PipelineListProps {
  pipeline: PipelineData | null;
}

export default function PipelineList({ pipeline }: PipelineListProps) {
  const badgeClasses: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    published: 'bg-blue-100 text-blue-800',
    accepted: 'bg-emerald-100 text-emerald-800',
    declined: 'bg-red-100 text-red-800',
    expired: 'bg-amber-100 text-amber-800',
    invoiced: 'bg-indigo-100 text-indigo-800',
    paid: 'bg-teal-100 text-teal-800',
  };

  const statusLabels: Record<string, string> = {
    draft: 'Brouillon',
    published: 'Publié',
    accepted: 'Accepté',
    declined: 'Refusé',
    expired: 'Expiré',
    invoiced: 'Facturé',
    paid: 'Payé',
  };

  const pipelineEntries = pipeline ? Object.entries(pipeline.pipeline) : [];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-semibold text-gray-800 text-base">Pipeline commercial</h3>
      </div>
      <div className="p-6 flex-1">
        {pipelineEntries.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">Aucun devis pour le moment.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {pipelineEntries.map(([status, count]) => (
              <li key={status} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeClasses[status] || 'bg-gray-100 text-gray-800'}`}>
                  {statusLabels[status] || status}
                </span>
                <span className="font-bold text-gray-700 text-sm">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
