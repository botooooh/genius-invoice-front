import { useState } from 'react';
import { Check, X, Shield, Download, CreditCard } from 'lucide-react';

export default function ClientView() {
  const [status, setStatus] = useState('pending'); // pending, signed, paid

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Devis N° DEV-2026-00001</h1>
            <p className="text-sm text-gray-500 mt-1">Émis par <span className="text-gray-700 font-bold">Entreprise Demo</span> le 25 Juil 2026</p>
          </div>
          <div className="space-x-3 flex flex-wrap justify-center gap-y-3">
            <button className="flex items-center px-5 py-2.5 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-all border border-gray-200 shadow-sm font-medium">
              <Download className="w-4 h-4 mr-2" /> PDF
            </button>
            
            {status === 'pending' && (
              <>
                <button className="flex items-center px-5 py-2.5 text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded-lg transition-all font-bold shadow-sm">
                  <X className="w-4 h-4 mr-2" /> Refuser
                </button>
                <button 
                  onClick={() => setStatus('signed')}
                  className="flex items-center px-5 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all font-bold"
                >
                  <Check className="w-4 h-4 mr-2" /> Accepter & Signer
                </button>
              </>
            )}

            {status === 'signed' && (
              <button 
                onClick={() => setStatus('paid')}
                className="flex items-center px-5 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all font-bold"
              >
                <CreditCard className="w-4 h-4 mr-2" /> Payer via GeniusPay
              </button>
            )}

            {status === 'paid' && (
              <span className="flex items-center px-5 py-2.5 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg font-bold shadow-sm">
                <Check className="w-4 h-4 mr-2" /> Payé avec succès
              </span>
            )}
          </div>
        </div>

        {/* Modal Signature Simulation */}
        {status === 'pending' && (
          <div className="bg-blue-50/80 border border-blue-100 p-5 rounded-2xl shadow-sm">
            <div className="flex">
              <div className="bg-white p-2 rounded-lg h-fit mr-4 border border-blue-100 shadow-sm">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-blue-900">Module de Signature (Genius Docs Sign™)</h3>
                <p className="mt-1.5 text-sm text-blue-800/80 leading-relaxed font-medium">
                  En cliquant sur "Accepter & Signer", une modale s'ouvrira avec un Canvas pour la signature manuscrite. 
                  Cela générera un journal de preuve (IP, Timestamp, Géolocalisation) et transformera le devis en facture certifiée.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Document Content - The "Paper" */}
        <div className="bg-white relative p-12 rounded-2xl shadow-sm border border-gray-100 min-h-[800px] overflow-hidden">
          {/* Decorative line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>

          <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-100 pb-10 relative z-10">
            <div>
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-bold mb-6 border border-gray-100 shadow-sm">LOGO</div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Entreprise Demo</h2>
              <p className="text-gray-500 font-medium mt-1">RCCM: CI-ABJ-2023-B-12345</p>
            </div>
            <div className="text-right mt-6 md:mt-0">
              <h1 className="text-5xl font-light text-gray-200 tracking-widest uppercase">Devis</h1>
              <p className="font-bold text-xl mt-4 text-gray-900">DEV-2026-00001</p>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 text-left inline-block">
                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">Destinataire</p>
                <p className="text-lg text-gray-900 font-bold">Tech Africa</p>
                <p className="text-gray-500 font-medium">contact@techafrica.com</p>
              </div>
            </div>
          </div>

          <div className="py-10 relative z-10">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-3 text-gray-400 font-bold uppercase text-xs tracking-wider">Description</th>
                  <th className="text-right py-3 text-gray-400 font-bold uppercase text-xs tracking-wider">Qté</th>
                  <th className="text-right py-3 text-gray-400 font-bold uppercase text-xs tracking-wider">Prix Unitaire</th>
                  <th className="text-right py-3 text-gray-400 font-bold uppercase text-xs tracking-wider">Total HT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="group">
                  <td className="py-6 text-gray-900 font-bold">Développement Application Web SaaS</td>
                  <td className="text-right py-6 text-gray-500 font-medium">1</td>
                  <td className="text-right py-6 text-gray-500 font-medium">2 000 000 XOF</td>
                  <td className="text-right py-6 text-gray-900 font-bold">2 000 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-6 relative z-10">
            <div className="w-80 space-y-4 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Total HT</span>
                <span className="text-gray-900 font-bold">2 000 000 XOF</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>TVA (18%)</span>
                <span className="text-gray-900 font-bold">360 000 XOF</span>
              </div>
              <div className="flex justify-between font-bold text-2xl border-t border-gray-200 pt-4 mt-2 text-gray-900">
                <span>Total TTC</span>
                <span className="text-indigo-600">2 360 000 XOF</span>
              </div>
            </div>
          </div>

          {status === 'signed' && (
            <div className="mt-16 pt-10 border-t border-gray-100 relative z-10 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="font-bold text-gray-900 mb-6 text-lg flex items-center">
                <Check className="w-5 h-5 text-emerald-500 mr-2" strokeWidth={3} />
                Signatures Électroniques
              </h3>
              <div className="flex space-x-12">
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Le Client</p>
                  <div className="w-56 h-28 bg-white border border-gray-200 rounded-xl flex items-center justify-center italic text-indigo-600/60 relative overflow-hidden shadow-sm">
                    <span className="text-2xl font-serif -rotate-6">Tech Africa</span>
                  </div>
                  <div className="mt-3 inline-block text-left bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500">Signé le <span className="text-gray-900 font-bold">25 Juil 2026 à 10:42</span></p>
                    <p className="text-xs text-gray-400 font-mono mt-1">IP: 192.168.1.1</p>
                    <p className="text-xs text-emerald-600 font-mono mt-1 font-bold">Hash: 0x9f8...2a1</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
