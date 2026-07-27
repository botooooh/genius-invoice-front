import { ArrowDownLeft, ArrowUpRight, X, Download } from 'lucide-react';
import { useState } from 'react';

export default function PaymentsList() {
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const transactions = [
    { id: 'TX-1092', ref: 'FAC-2026-00042', client: 'Tech Africa', amount: '+ 450 000 XOF', type: 'in', date: 'Aujourd\'hui, 14:30', method: 'GeniusPay' },
    { id: 'TX-1091', ref: 'FAC-2026-00040', client: 'Startup Studio', amount: '+ 150 000 XOF', type: 'in', date: '22 Juil 2026, 09:15', method: 'Virement' },
    { id: 'TX-1090', ref: 'SUB-PRO', client: 'Abonnement Pro', amount: '- 15 000 XOF', type: 'out', date: '01 Juil 2026, 08:00', method: 'Carte' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Paiements & Transactions</h1>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-all">
          Exporter (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-1 md:col-span-2">
          <h3 className="text-gray-500 text-sm font-semibold mb-3">Solde Disponible</h3>
          <p className="text-[36px] font-bold text-gray-900 tracking-tight">3 245 000 <span className="text-lg text-gray-400 font-medium">XOF</span></p>
          <div className="mt-6 flex space-x-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm transition-all text-sm">
              Transférer vers ma banque
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
        <div className="p-8 pb-4">
          <h2 className="text-lg font-bold text-gray-900">Historique des transactions</h2>
        </div>
        <div className="overflow-x-auto px-2">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Méthode</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Montant</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {transactions.map((tx) => (
                <tr key={tx.id} onClick={() => setSelectedTx(tx)} className="hover:bg-gray-50/30 transition-colors cursor-pointer group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors ${tx.type === 'in' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}`}>
                        {tx.type === 'in' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{tx.client}</p>
                        <p className="text-xs text-gray-500 font-medium">{tx.ref}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{tx.date}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{tx.method}</td>
                  <td className={`px-6 py-5 whitespace-nowrap text-right text-sm font-bold ${tx.type === 'in' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over details */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedTx(null)}></div>
          <div className="relative w-full max-w-md bg-white shadow-2xl h-full animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-lg font-bold text-gray-900">Détails de la transaction</h2>
              <button onClick={() => setSelectedTx(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex flex-col items-center justify-center py-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${selectedTx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                  {selectedTx.type === 'in' ? <ArrowDownLeft className="w-8 h-8" /> : <ArrowUpRight className="w-8 h-8" />}
                </div>
                <h3 className={`text-3xl font-bold ${selectedTx.type === 'in' ? 'text-emerald-600' : 'text-gray-900'}`}>{selectedTx.amount}</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">{selectedTx.date}</p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                    <span className="text-sm text-gray-500 font-medium">Référence</span>
                    <span className="text-sm font-bold text-gray-900">{selectedTx.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                    <span className="text-sm text-gray-500 font-medium">Lié à</span>
                    <span className="text-sm font-bold text-gray-900">{selectedTx.ref}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                    <span className="text-sm text-gray-500 font-medium">Partie tierce</span>
                    <span className="text-sm font-bold text-gray-900">{selectedTx.client}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500 font-medium">Méthode</span>
                    <span className="text-sm font-bold text-gray-900">{selectedTx.method}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm">
                  <Download className="w-4 h-4 mr-2" /> Télécharger le reçu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
