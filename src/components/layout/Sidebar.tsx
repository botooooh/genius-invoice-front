import { NavLink } from 'react-router-dom';

interface NavItem {
  label: string;
  path?: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Tableau de bord', path: '/app', icon: '📊' },
  { label: 'Devis', path: '/app/quotes', icon: '📋' },
  { label: 'Factures', path: '/app/invoices', icon: '🧾' },
  { label: 'Paiements', path: '/app/payments', icon: '💳' },
  { label: 'Notifications', path: '/app/notifications', icon: '🔔' },
  { label: 'Historique', path: '/app/history', icon: '🕘' },
  { label: 'Espace de travail', path: '/app/workspace', icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-60 shrink-0 bg-gray-900 text-white flex flex-col md:h-screen p-4 md:p-6 sticky top-0 border-b md:border-b-0 md:border-r border-gray-800">
      <div className="hidden md:flex items-center gap-3 pb-6 mb-4 border-b border-gray-800">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 font-bold text-sm text-white">
          GI
        </span>
        <span className="font-semibold text-lg tracking-tight">Genius Invoice</span>
      </div>
      <nav className="flex flex-row md:flex-col gap-2 md:gap-1 overflow-x-auto md:overflow-x-visible w-full no-scrollbar">
        {NAV_ITEMS.map((item) =>
          item.path ? (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                `flex items-center gap-2 md:gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ) : (
            <span
              key={item.label}
              className="flex items-center gap-2 md:gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed shrink-0"
              title="Module en cours de développement"
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
              <span className="ml-auto hidden md:inline-block text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full font-semibold">
                Bientôt
              </span>
            </span>
          )
        )}
      </nav>
    </aside>
  );
}
