import type { Notification } from '../../types';
import StatusBadge from '../common/StatusBadge';

export default function NotificationList({ notifications }: { notifications: Notification[] }) {
  if (notifications.length === 0) {
    return <p className="text-sm text-gray-500 py-8 text-center">Aucune notification envoyée.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
            <th className="py-2 pr-4">Événement</th>
            <th className="py-2 pr-4">Canal</th>
            <th className="py-2 pr-4">Destinataire</th>
            <th className="py-2 pr-4">Statut</th>
            <th className="py-2 pr-4">Envoyé le</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((n) => (
            <tr key={n.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 pr-4 text-gray-800">{n.event.replace(/[._]/g, ' ')}</td>
              <td className="py-3 pr-4 text-gray-600 capitalize">{n.channel}</td>
              <td className="py-3 pr-4 text-gray-600">{n.recipient}</td>
              <td className="py-3 pr-4">
                <StatusBadge status={n.status} />
              </td>
              <td className="py-3 pr-4 text-gray-500">{n.sent_at ? new Date(n.sent_at).toLocaleString('fr-FR') : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
