import { Link } from 'react-router-dom';
import { Plus, Eye, MoreVertical, FileSignature, X, ExternalLink, Download, PenLine } from 'lucide-react';
import { useState } from 'react';

export default function QuotesList() {
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const quotes = [
    { id: 'DEV-2026-00001', client: 'Acme Corp', amount: '150 000 XOF', status: 'Brouillon', date: 'Aujourd\'hui', color: 'gray' },
    { id: 'DEV-2026-00002', client: 'Startup Studio', amount: '850 000 XOF', status: 'Envoyé', date: 'Hier', color: 'blue' },
    { id: 'DEV-2026-00003', client: 'Global Services', amount: '2 400 000 XOF', status: 'Signé', date: '22 Juil 2026', color: 'emerald' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Devis</h1>
        <Link 
          to="/create-quote" 
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm transition-all text-sm"
        >
          <Plus className="w-5 h-5 mr-2" /> Nouveau Devis
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
        <div className="overflow-x-auto px-2">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Référence</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Montant HT</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {quotes.map((quote) => (
                <tr key={quote.id} onClick={() => setSelectedQuote(quote)} className="hover:bg-gray-50/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">{quote.id}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{quote.client}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">{quote.amount}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-left">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded bg-${quote.color}-50 text-${quote.color}-600`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{quote.date}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link 
                        to={`/client/quote/${quote.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all opacity-0 group-hover:opacity-100" 
                        title="Aperçu Client"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
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
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedQuote(null)}></div>
          <div className="relative w-full max-w-md bg-white shadow-2xl h-full animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-lg font-bold text-gray-900">Détails du devis</h2>
              <button onClick={() => setSelectedQuote(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex flex-col items-center justify-center py-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-${selectedQuote.color}-50 text-${selectedQuote.color}-600`}>
                  <FileSignature className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{selectedQuote.amount}</h3>
                <span className={`mt-3 inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-${selectedQuote.color}-50 text-${selectedQuote.color}-600`}>
                  {selectedQuote.status}
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                    <span className="text-sm text-gray-500 font-medium">Référence</span>
                    <span className="text-sm font-bold text-gray-900">{selectedQuote.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                    <span className="text-sm text-gray-500 font-medium">Client</span>
                    <span className="text-sm font-bold text-gray-900">{selectedQuote.client}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500 font-medium">Date</span>
                    <span className="text-sm font-bold text-gray-900">{selectedQuote.date}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link to={`/client/quote/${selectedQuote.id}`} className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                  <ExternalLink className="w-4 h-4 mr-2" /> Aperçu Client
                </Link>
                <Link to="/create-quote" className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm">
                  <PenLine className="w-4 h-4 mr-2" /> Modifier le devis
                </Link>
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
