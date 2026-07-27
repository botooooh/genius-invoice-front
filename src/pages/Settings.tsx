import { useState } from 'react';
import { Save, Building, Users, CreditCard, Puzzle } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Général', icon: Building },
    { id: 'billing', label: 'Facturation', icon: CreditCard },
    { id: 'team', label: 'Équipe', icon: Users },
    { id: 'integrations', label: 'Intégrations', icon: Puzzle },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Paramètres de l'espace</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm transition-all flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Enregistrer
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 flex items-center border-b-2 font-bold text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'general' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nom de l'entreprise</label>
                <input type="text" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" defaultValue="Entreprise Démo" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Numéro de SIRET / RCCM</label>
                <input type="text" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" defaultValue="CI-ABJ-2023-B-12345" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Adresse postale</label>
                <textarea className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm h-24" defaultValue="Cocody Riviera 3&#10;Abidjan, Côte d'Ivoire"></textarea>
              </div>
            </div>
          )}
          
          {activeTab === 'billing' && (
            <div className="space-y-6 max-w-2xl text-gray-500 font-medium">
              <p>Configurez ici vos informations bancaires et le taux de TVA par défaut.</p>
              {/* Contenu factice pour le moment */}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6 max-w-2xl text-gray-500 font-medium">
              <p>Invitez vos collaborateurs et gérez leurs permissions.</p>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6 max-w-2xl text-gray-500 font-medium">
              <p>Connectez votre espace à vos outils préférés (Stripe, Slack, etc.).</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
