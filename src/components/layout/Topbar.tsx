import { useNavigate, useLocation } from 'react-router-dom';
import { clearSession, getSessionIdentity } from '../../services/session';

const PAGE_TITLES: { match: RegExp; title: string; subtitle: string }[] = [
  { match: /^\/app\/quotes/, title: 'Devis', subtitle: 'Gérez vos devis et leur cycle de vie' },
  { match: /^\/app\/invoices/, title: 'Factures', subtitle: 'Suivez la facturation et les encaissements' },
  { match: /^\/app\/payments/, title: 'Paiements', subtitle: 'Paiements GeniusPay et séquestres' },
  { match: /^\/app\/notifications/, title: 'Notifications & Relances', subtitle: "Historique des envois automatiques" },
  { match: /^\/app\/history/, title: 'Historique & Recherche', subtitle: 'Recherchez et vérifiez vos documents' },
  { match: /^\/app\/workspace/, title: 'Paramètres du workspace', subtitle: 'Informations légales et coordonnées' },
];

function useCurrentPageMeta() {
  const location = useLocation();
  const found = PAGE_TITLES.find((entry) => entry.match.test(location.pathname));
  return found ?? { title: 'Tableau de bord', subtitle: "Vue d'ensemble de votre activité marchand" };
}

export default function Topbar() {
  const { title, subtitle } = useCurrentPageMeta();
  const navigate = useNavigate();
  const identity = getSessionIdentity();

  function handleLogout() {
    clearSession();
    navigate('/login', { replace: true });
  }

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-6 md:px-8 bg-white border-b border-gray-200">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
        <p className="text-gray-500 text-xs md:text-sm">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {identity && (
          <span className="text-sm text-gray-600 hidden sm:inline">
            Connecté en tant que <strong>{identity.name || identity.email}</strong>
          </span>
        )}
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm font-semibold hover:bg-gray-50 transition-colors"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}
