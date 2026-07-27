import { TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-semibold mb-3">Revenus Totaux</h3>
          <p className="text-[28px] font-bold text-gray-900 tracking-tight">2 478 000 <span className="text-sm text-gray-400 font-medium">XOF</span></p>
          <div className="flex items-center mt-4 text-emerald-600 text-xs font-bold bg-emerald-50/80 w-fit px-2 py-1 rounded">
            <TrendingUp className="w-3 h-3 mr-1" strokeWidth={3} />
            +12.5%
          </div>
        </div>
        {/* KPI 2 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-semibold mb-3">Encaissements en attente</h3>
          <p className="text-[28px] font-bold text-gray-900 tracking-tight">450 000 <span className="text-sm text-gray-400 font-medium">XOF</span></p>
          <div className="flex items-center mt-4 text-gray-500 text-xs font-bold bg-gray-50 w-fit px-2 py-1 rounded">
            <Clock className="w-3 h-3 mr-1" strokeWidth={3} />
            3 documents
          </div>
        </div>
        {/* KPI 3 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-semibold mb-3">Factures en retard</h3>
          <p className="text-[28px] font-bold text-gray-900 tracking-tight">1</p>
          <div className="flex items-center mt-4 text-red-600 text-xs font-bold bg-red-50/80 w-fit px-2 py-1 rounded">
            <TrendingDown className="w-3 h-3 mr-1" strokeWidth={3} />
            -150 000 XOF
          </div>
        </div>
        {/* KPI 4 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-semibold mb-3">Taux d'acceptation</h3>
          <p className="text-[28px] font-bold text-gray-900 tracking-tight">40%</p>
          <div className="flex items-center mt-4 text-emerald-600 text-xs font-bold bg-emerald-50/80 w-fit px-2 py-1 rounded">
            <CheckCircle className="w-3 h-3 mr-1" strokeWidth={3} />
            +5% vs mois dernier
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold text-gray-900">Évolution du Chiffre d'Affaires</h2>
          <select className="bg-gray-50/50 border border-gray-100 text-gray-600 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block px-4 py-2 outline-none font-medium">
            <option>Cette année</option>
            <option>An dernier</option>
          </select>
        </div>
        
        <div className="h-64 flex items-end justify-between space-x-4 pt-4 relative">
          {/* Guide lines */}
          <div className="absolute top-0 w-full border-t border-dashed border-gray-200"></div>
          <div className="absolute top-1/4 w-full border-t border-dashed border-gray-200"></div>
          <div className="absolute top-2/4 w-full border-t border-dashed border-gray-200"></div>
          <div className="absolute top-3/4 w-full border-t border-dashed border-gray-200"></div>
          <div className="absolute bottom-0 w-full border-t border-dashed border-gray-200"></div>

          {/* Bars */}
          {[40, 60, 30, 80, 50, 65, 90, 55, 45, 85, 55, 75].map((val, i) => (
            <div key={i} className="w-full relative flex flex-col justify-end h-full group z-10 px-1">
              <div 
                className={`w-full rounded-t-md transition-all duration-500 ${i === 6 ? 'bg-indigo-600' : 'bg-indigo-100 group-hover:bg-indigo-200'}`} 
                style={{ height: `${val}%` }}
              >
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none transition-opacity">
                  {(val * 10000).toLocaleString()} XOF
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-medium mt-6 px-1">
          <span className="w-full text-center">Jan</span>
          <span className="w-full text-center">Fév</span>
          <span className="w-full text-center">Mar</span>
          <span className="w-full text-center">Avr</span>
          <span className="w-full text-center">Mai</span>
          <span className="w-full text-center">Juin</span>
          <span className="w-full text-center">Juil</span>
          <span className="w-full text-center">Août</span>
          <span className="w-full text-center">Sep</span>
          <span className="w-full text-center">Oct</span>
          <span className="w-full text-center">Nov</span>
          <span className="w-full text-center">Déc</span>
        </div>
      </div>

      {/* Latest Sales Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 pb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Dernières Ventes</h2>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Voir tout</button>
        </div>
        <div className="overflow-x-auto px-2">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Référence</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {[
                { client: 'Tech Africa', ref: 'FAC-2026-042', date: 'Aujourd\'hui', amount: '450 000 XOF', status: 'Payé', color: 'emerald' },
                { client: 'Acme Corp', ref: 'FAC-2026-041', date: 'Hier', amount: '1 250 000 XOF', status: 'En attente', color: 'gray' },
                { client: 'Global Services', ref: 'DEV-2026-015', date: '25 Juil 2026', amount: '2 000 000 XOF', status: 'Accepté', color: 'indigo' },
                { client: 'Startup Studio', ref: 'FAC-2026-040', date: '22 Juil 2026', amount: '150 000 XOF', status: 'Payé', color: 'emerald' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">{row.client}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{row.ref}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{row.date}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">{row.amount}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded bg-${row.color}-50 text-${row.color}-600`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
