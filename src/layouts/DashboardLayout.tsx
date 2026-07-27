import { useState } from 'react';
import { Home, FileText, CreditCard, FileSignature, Clock, Settings, User, Bell, Search, LogOut, HelpCircle, ChevronDown, Check, X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getLinkClass = (path: string) => {
    const isActive = location.pathname.startsWith(path);
    return `flex items-center py-2.5 rounded-lg font-medium transition-all group ${isSidebarCollapsed ? 'justify-center px-0 mx-2' : 'px-4'} ${
      isActive 
        ? 'text-indigo-600 bg-indigo-50/80' 
        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
    }`;
  };

  const getIconClass = (path: string) => {
    const isActive = location.pathname.startsWith(path);
    return `w-5 h-5 transition-colors shrink-0 ${isSidebarCollapsed ? '' : 'mr-3'} ${
      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
    }`;
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-gray-50/30 border-r border-gray-100 flex flex-col transition-all duration-300 z-20 relative shrink-0`}>
        {/* Header Sidebar */}
        <div className="p-6">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center flex-col space-y-4' : 'justify-between'} mb-8`}>
            <div className={`flex items-center ${isSidebarCollapsed ? '' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm shrink-0">
                <span className="text-white font-bold text-sm">GI</span>
              </div>
              {!isSidebarCollapsed && (
                <span className="text-xl font-bold text-gray-900 tracking-tight whitespace-nowrap">Genius Invoice</span>
              )}
            </div>
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-400 hover:text-indigo-600 transition-colors"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="relative flex justify-center">
            <button 
              onClick={() => !isSidebarCollapsed && setIsWorkspaceOpen(!isWorkspaceOpen)}
              className={`flex items-center bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm ${isSidebarCollapsed ? 'w-8 h-8 p-0 justify-center cursor-default' : 'w-full py-2 px-3 justify-between'}`}
              title="Entreprise Démo"
            >
              <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full h-full' : ''}`}>
                <div className={`bg-indigo-50 text-indigo-700 rounded flex items-center justify-center font-bold text-xs shrink-0 ${isSidebarCollapsed ? 'w-full h-full' : 'w-6 h-6 mr-2'}`}>ED</div>
                {!isSidebarCollapsed && <span className="font-medium truncate">Entreprise Démo</span>}
              </div>
              {!isSidebarCollapsed && <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isWorkspaceOpen ? 'rotate-180' : ''}`} />}
            </button>

            {isWorkspaceOpen && !isSidebarCollapsed && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <button className="w-full text-left px-4 py-2 text-sm font-bold text-gray-900 bg-gray-50 flex items-center justify-between">
                  Entreprise Démo
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                </button>
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center">
                  Startup Studio
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="w-full text-left px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 flex items-center">
                  <Plus className="w-4 h-4 mr-2 shrink-0" />
                  Créer un espace
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Menu Principal */}
        <nav className="px-2 space-y-2 flex-1 overflow-y-auto">
          <Link to="/dashboard" className={getLinkClass('/dashboard')} title="Aperçu">
            <Home className={getIconClass('/dashboard')} />
            {!isSidebarCollapsed && <span>Aperçu</span>}
          </Link>
          <Link to="/invoices" className={getLinkClass('/invoices')} title="Factures">
            <FileText className={getIconClass('/invoices')} />
            {!isSidebarCollapsed && <span>Factures</span>}
          </Link>
          <Link to="/payments" className={getLinkClass('/payments')} title="Paiement">
            <CreditCard className={getIconClass('/payments')} />
            {!isSidebarCollapsed && <span>Paiement</span>}
          </Link>
          <Link to="/quotes" className={getLinkClass('/quotes')} title="Devis">
            <FileSignature className={getIconClass('/quotes')} />
            {!isSidebarCollapsed && <span>Devis</span>}
          </Link>
          <Link to="/history" className={getLinkClass('/history')} title="Historique">
            <Clock className={getIconClass('/history')} />
            {!isSidebarCollapsed && <span>Historique</span>}
          </Link>
          
          <div className="pt-4 mt-4">
            <Link to="/settings" className={getLinkClass('/settings')} title="Paramètres de l'espace">
              <Settings className={getIconClass('/settings')} />
              {!isSidebarCollapsed && <span>Paramètres de l'espace</span>}
            </Link>
          </div>
        </nav>

        {/* Section Profil */}
        <div className="p-4">
          <div className={`bg-white border border-gray-100 shadow-sm flex items-center mx-auto mb-4 ${isSidebarCollapsed ? 'w-10 h-10 p-0 justify-center rounded-xl' : 'p-3 rounded-xl w-full'}`} title="Hecham G. (Admin)">
            <div className={`font-bold flex items-center justify-center shrink-0 bg-cyan-200 text-cyan-800 ${isSidebarCollapsed ? 'w-full h-full rounded-xl' : 'w-10 h-10 rounded-full mr-3'}`}>
              H
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Admin</span>
                <span className="text-sm font-bold text-gray-900 truncate">Hecham G.</span>
              </div>
            )}
          </div>
          <div className="space-y-1 px-2">
            <Link to="/profile" className={`w-full flex items-center py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'}`} title="Mon Profil">
              <User className={`w-4 h-4 text-gray-400 shrink-0 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
              {!isSidebarCollapsed && "Mon Profil"}
            </Link>
            <button className={`w-full flex items-center py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'}`} title="Aide">
              <HelpCircle className={`w-4 h-4 text-gray-400 shrink-0 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
              {!isSidebarCollapsed && "Aide"}
            </button>
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className={`w-full flex items-center py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2 ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'}`}
              title="Déconnexion"
            >
              <LogOut className={`w-4 h-4 text-red-400 shrink-0 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
              {!isSidebarCollapsed && "Déconnexion"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-white">
        {/* Header */}
        <header className="h-24 bg-white flex items-center justify-between px-10 sticky top-0 z-10">
          <h1 className="text-[22px] font-bold text-gray-900">Aperçu de l'Activité : Entreprise Démo</h1>
          
          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Rechercher (devis, client...)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-72 text-gray-700 placeholder-gray-400 shadow-sm"
              />
              
              {/* Menu de recherche */}
              {searchQuery && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-100 shadow-xl rounded-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Résultats pour "{searchQuery}"</p>
                    <div className="space-y-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-900 font-medium hover:bg-gray-50 rounded-lg">
                        <span className="text-indigo-600 font-bold mr-2">DEV-2026</span> - Tech Africa
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-900 font-medium hover:bg-gray-50 rounded-lg">
                        <span className="text-indigo-600 font-bold mr-2">CLIENT</span> - Acme Corp
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4 relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="text-gray-400 hover:text-indigo-600 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Menu Notifications */}
              {isNotificationsOpen && (
                <div className="absolute top-full right-8 mt-4 w-80 bg-white border border-gray-100 shadow-xl rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Notifications</span>
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-bold">2 nouvelles</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50/50">
                      <p className="text-sm font-bold text-gray-900">Nouveau paiement reçu</p>
                      <p className="text-xs text-gray-500 mt-1">Tech Africa a payé la facture FAC-00042</p>
                      <p className="text-xs text-indigo-600 font-bold mt-1">Il y a 5 min</p>
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">Devis signé</p>
                      <p className="text-xs text-gray-500 mt-1">Acme Corp a accepté DEV-00001</p>
                      <p className="text-xs text-gray-400 font-bold mt-1">Hier</p>
                    </button>
                  </div>
                </div>
              )}

              <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto px-10 pb-10 relative z-0 bg-white">
          <Outlet />
        </div>
      </main>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Déconnexion</h2>
            <p className="text-gray-500 font-medium mb-6">Êtes-vous sûr de vouloir vous déconnecter de votre session ?</p>
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2.5 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-bold transition-all shadow-sm"
              >
                Annuler
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all shadow-sm"
              >
                Me déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
