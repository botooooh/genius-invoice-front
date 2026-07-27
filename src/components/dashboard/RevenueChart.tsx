import type { RevenuePoint } from '../../types';

interface RevenueChartProps {
  revenue: RevenuePoint[];
  formatCurrency: (value: number) => string;
}

export default function RevenueChart({ revenue, formatCurrency }: RevenueChartProps) {
  const maxRevenue = Math.max(1, ...revenue.map((p) => p.total));

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-semibold text-gray-800 text-base">Évolution mensuelle du chiffre d'affaires</h3>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-end">
        {revenue.length === 0 ? (
          <p className="text-gray-400 text-sm text-center my-auto">Aucune facture payée pour le moment.</p>
        ) : (
          <div className="flex items-end gap-3 h-44">
            {revenue.map((point) => (
              <div key={point.month} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
                <div className="relative w-full flex justify-center h-full items-end">
                  <div
                    className="w-full max-w-[2.25rem] bg-blue-600 rounded-t-md min-h-[4px] transition-all duration-300 hover:bg-blue-700 cursor-pointer shadow-sm"
                    style={{ height: `${Math.max(4, (point.total / maxRevenue) * 100)}%` }}
                  />
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-[10px] font-semibold py-1 px-2 rounded whitespace-nowrap z-10 shadow-md">
                    {formatCurrency(point.total)}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{point.month.slice(5, 7)}/{point.month.slice(2, 4)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
