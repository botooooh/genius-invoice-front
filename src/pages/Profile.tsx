import { User, Mail, Shield, Save } from 'lucide-react';

export default function Profile() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mon Profil</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm transition-all flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Mettre à jour
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center border-4 border-white shadow-sm">
            <span className="text-3xl font-bold text-indigo-600">HG</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Hecham G.</h2>
            <p className="text-gray-500 font-medium">Administrateur</p>
            <button className="mt-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Modifier la photo</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Informations Personnelles</h3>
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5"><User className="w-4 h-4 mr-2 text-gray-400" /> Prénom & Nom</label>
              <input type="text" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" defaultValue="Hecham G." />
            </div>
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5"><Mail className="w-4 h-4 mr-2 text-gray-400" /> Adresse Email</label>
              <input type="email" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" defaultValue="equipe@geniusinvoice.africa" />
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Sécurité</h3>
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5"><Shield className="w-4 h-4 mr-2 text-gray-400" /> Mot de passe actuel</label>
              <input type="password" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" placeholder="••••••••" />
            </div>
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5"><Shield className="w-4 h-4 mr-2 text-gray-400" /> Nouveau mot de passe</label>
              <input type="password" className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm" placeholder="Laisser vide pour ne pas changer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
