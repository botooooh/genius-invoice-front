interface KpiCardProps {
  label: string;
  value: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export default function KpiCard({ label, value, tone = 'default' }: KpiCardProps) {
  const toneClasses = {
    default: 'border-l-gray-300',
    success: 'border-l-emerald-500',
    warning: 'border-l-amber-500',
    danger: 'border-l-red-500',
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${toneClasses[tone]}`}>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
