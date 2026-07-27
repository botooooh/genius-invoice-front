import { Plus, Trash2, Save, Send } from 'lucide-react';
import { useState } from 'react';

export default function CreateQuote() {
  const [lines, setLines] = useState([{ id: 1, description: '', quantity: 1, price: 0, tax: 18 }]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Créer un Devis <span className="text-gray-400 font-medium text-lg ml-2">(DV-01)</span></h1>
        <div className="space-x-4 flex">
          <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-900 transition-all flex items-center shadow-sm font-medium">
            <Save className="w-4 h-4 mr-2 text-gray-400" /> Brouillon
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all flex items-center font-bold">
            <Send className="w-4 h-4 mr-2" /> Publier & Envoyer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <h2 className="text-lg font-bold mb-6 text-gray-900 flex items-center">
             <span className="w-7 h-7 rounded-md bg-indigo-50 flex items-center justify-center mr-3 text-indigo-600 text-sm">1</span>
             Informations Client
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom du client</label>
              <input type="text" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" placeholder="Ex: Tech Africa" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input type="email" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" placeholder="contact@techafrica.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone / WhatsApp</label>
              <input type="text" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" placeholder="+225..." />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <h2 className="text-lg font-bold mb-6 text-gray-900 flex items-center">
             <span className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center mr-3 text-emerald-600 text-sm">2</span>
             Paramètres du devis
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date d'émission</label>
              <input type="date" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date d'expiration</label>
              <input type="date" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Conditions de paiement</label>
              <select className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm">
                <option>À réception</option>
                <option>50% acompte, 50% livraison</option>
                <option>Net 30 jours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
        <div className="p-6 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
             <span className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center mr-3 text-blue-600 text-sm">3</span>
             Lignes du devis
          </h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/2">Description</th>
                  <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Qté</th>
                  <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Prix unitaire</th>
                  <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">TVA (%)</th>
                  <th className="py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Total HT</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lines.map((line, idx) => (
                  <tr key={line.id} className="group">
                    <td className="py-4 pr-4">
                      <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" placeholder="Description du service..." />
                    </td>
                    <td className="py-4 pr-4">
                      <input type="number" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" defaultValue={1} />
                    </td>
                    <td className="py-4 pr-4">
                      <input type="number" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" placeholder="0.00" />
                    </td>
                    <td className="py-4 pr-4">
                      <input type="number" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" defaultValue={18} />
                    </td>
                    <td className="py-4 text-right font-bold text-gray-900">0.00 XOF</td>
                    <td className="py-4 text-center pl-2">
                      <button className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-start">
            <button className="text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-lg flex items-center font-bold transition-colors shadow-sm" onClick={() => setLines([...lines, { id: Date.now(), description: '', quantity: 1, price: 0, tax: 18 }])}>
              <Plus className="w-4 h-4 mr-2" /> Ajouter une ligne
            </button>
            
            <div className="w-80 space-y-3 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
              <div className="flex justify-between text-gray-500 font-medium"><span>Total HT</span><span className="text-gray-900 font-bold">0.00 XOF</span></div>
              <div className="flex justify-between text-gray-500 font-medium"><span>TVA (18%)</span><span className="text-gray-900 font-bold">0.00 XOF</span></div>
              <div className="flex justify-between font-bold text-xl border-t border-gray-200 pt-4 mt-2 text-gray-900">
                <span>Total TTC</span>
                <span className="text-indigo-600">0.00 XOF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
