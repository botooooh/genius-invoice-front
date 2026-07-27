import type { Reminder } from '../../types';
import StatusBadge from '../common/StatusBadge';

const TYPE_LABELS: Record<string, string> = {
  pre_due: 'J-3 (avant échéance)',
  due: 'J0 (échéance)',
  post_due_1: 'J+3',
  post_due_2: 'J+7',
  post_due_3: 'J+15',
  post_due_4: 'J+30',
  final: 'Mise en demeure',
};

export default function ReminderList({ reminders }: { reminders: Reminder[] }) {
  if (reminders.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">Aucune relance planifiée.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
            <th className="py-2 pr-4">Type</th>
            <th className="py-2 pr-4">Canal</th>
            <th className="py-2 pr-4">Destinataire</th>
            <th className="py-2 pr-4">Statut</th>
            <th className="py-2 pr-4">Planifiée pour</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((r) => (
            <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 pr-4 text-gray-800">{TYPE_LABELS[r.type] ?? r.type}</td>
              <td className="py-3 pr-4 text-gray-600 capitalize">{r.channel}</td>
              <td className="py-3 pr-4 text-gray-600">{r.recipient}</td>
              <td className="py-3 pr-4">
                <StatusBadge status={r.status} />
              </td>
              <td className="py-3 pr-4 text-gray-500">{new Date(r.scheduled_at).toLocaleDateString('fr-FR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
