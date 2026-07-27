import { CheckCircle2, FileEdit, Mail, Download } from 'lucide-react';

export default function History() {
  const events = [
    { id: 1, type: 'sign', text: 'Devis DEV-2026-00003 signé par Global Services', time: 'Aujourd\'hui, 10:42', icon: CheckCircle2, color: 'emerald' },
    { id: 2, type: 'send', text: 'Facture FAC-2026-00041 envoyée à Acme Corp', time: 'Hier, 15:30', icon: Mail, color: 'indigo' },
    { id: 3, type: 'create', text: 'Devis DEV-2026-00004 créé en brouillon', time: '24 Juil 2026, 09:15', icon: FileEdit, color: 'gray' },
    { id: 4, type: 'download', text: 'Export comptable généré (PDF)', time: '20 Juil 2026, 18:00', icon: Download, color: 'gray' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Historique des actions</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {events.map((event) => {
            const Icon = event.icon;
            return (
              <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-${event.color}-50 text-${event.color}-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-gray-900 text-sm">{event.text}</div>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{event.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
