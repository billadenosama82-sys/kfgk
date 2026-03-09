import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  User, 
  FileText, 
  History, 
  Shield,
  ChevronRight,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';

const Inmates: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inmates, setInmates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/inmates')
      .then(res => res.json())
      .then(data => {
        setInmates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching inmates:', err);
        setLoading(false);
      });
  }, []);

  const filteredInmates = inmates.filter(inmate => 
    `${inmate.firstName} ${inmate.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inmate.inmateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inmate.cellNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Kartoteka Osadzonych</h2>
          <p className="text-slate-500">Zarządzaj profilami i dokumentacją osadzonych.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
          <Plus size={20} />
          Dodaj Osadzonego
        </button>
      </div>

      <div className="flex gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Szukaj po nazwisku, numerze ID lub celi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter size={18} />
          Filtry
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
          <Download size={18} />
          Eksportuj
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Osadzony</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Numer ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lokalizacja</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Poziom Bezp.</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredInmates.map((inmate) => (
              <tr key={inmate.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User size={20} />
                    </div>
                    <span className="font-bold text-slate-900">{inmate.firstName} {inmate.lastName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-mono text-sm">{inmate.inmateNumber}</td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="font-medium text-slate-900">{inmate.cellNumber}</p>
                    <p className="text-slate-500 text-xs">{inmate.wardId}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 w-fit ${
                    inmate.securityLevel === 'HIGH' ? 'bg-red-100 text-red-700' : 
                    inmate.securityLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <Shield size={12} />
                    {inmate.securityLevel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    {inmate.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Profil">
                      <FileText size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Historia">
                      <History size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inmates;
