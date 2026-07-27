import { FileText, MoreVertical, Send, DollarSign, X, ExternalLink, Download } from 'lucide-react';
import { useState } from 'react';

export default function InvoicesList() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const invoices = [
    { id: 'FAC-2026-00042', client: 'Tech Africa', amount: '450 000 XOF', status: 'Payé', date: 'Aujourd\'hui', color: 'emerald' },
    { id: 'FAC-2026-00041', client: 'Acme Corp', amount: '1 250 000 XOF', status: 'En attente', date: 'Hier', color: 'gray' },
    { id: 'FAC-2026-00040', client: 'Startup Studio', amount: '150 000 XOF', status: 'Payé', date: '22 Juil 2026', color: 'emerald' },
    { id: 'FAC-2026-00039', client: 'Web Solutions', amount: '800 000 XOF', status: 'En retard', date: '15 Juil 2026', color: 'red' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Factures</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
        <div className="overflow-x-auto px-2">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Référence</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Montant TTC</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {invoices.map((invoice) => (
                <tr key={invoice.id} onClick={() => setSelectedInvoice(invoice)} className="hover:bg-gray-50/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{invoice.client}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">{invoice.amount}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-left">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded bg-${invoice.color}-50 text-${invoice.color}-600`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{invoice.date}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      {invoice.status !== 'Payé' && (
                        <>
                          <button onClick={(e) => e.stopPropagation()} className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all opacity-0 group-hover:opacity-100" title="Marquer comme payé">
                            <DollarSign className="w-4 h-4" />
                          </button>
                          <button onClick={(e) => e.stopPropagation()} className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all opacity-0 group-hover:opacity-100" title="Relancer le client">
                            <Send className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button onClick={(e) => e.stopPropagation()} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over details */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedInvoice(null)}></div>
          <div className="relative w-full max-w-md bg-white shadow-2xl h-full animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-lg font-bold text-gray-900">Détails de la facture</h2>
              <button onClick={() => setSelectedInvoice(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex flex-col items-center justify-center py-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-${selectedInvoice.color}-50 text-${selectedInvoice.color}-600`}>
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{selectedInvoice.amount}</h3>
                <span className={`mt-3 inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-${selectedInvoice.color}-50 text-${selectedInvoice.color}-600`}>
                  {selectedInvoice.status}
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                    <span className="text-sm text-gray-500 font-medium">Référence</span>
                    <span className="text-sm font-bold text-gray-900">{selectedInvoice.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                    <span className="text-sm text-gray-500 font-medium">Client</span>
                    <span className="text-sm font-bold text-gray-900">{selectedInvoice.client}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                    <span className="text-sm text-gray-500 font-medium">Date d'émission</span>
                    <span className="text-sm font-bold text-gray-900">{selectedInvoice.date}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500 font-medium">Date d'échéance</span>
                    <span className="text-sm font-bold text-gray-900">Dans 30 jours</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                  <ExternalLink className="w-4 h-4 mr-2" /> Ouvrir la facture
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm">
                  <Download className="w-4 h-4 mr-2" /> Télécharger en PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
