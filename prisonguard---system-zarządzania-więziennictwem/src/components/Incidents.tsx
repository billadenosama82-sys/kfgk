import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Users,
  ChevronRight,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { INCIDENT_CATEGORIES, THREAT_LEVELS } from '../constants';

const Incidents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const incidents = [
    { 
      id: '1', 
      date: '2024-03-09', 
      time: '14:30', 
      location: 'Blok A, Cele 102-105', 
      category: 'FIGHT', 
      threatLevel: 'HIGH', 
      status: 'INVESTIGATING',
      description: 'Bójka między dwoma osadzonymi podczas wydawania posiłków.'
    },
    { 
      id: '2', 
      date: '2024-03-09', 
      time: '09:15', 
      location: 'Punkt kontrolny B', 
      category: 'SMUGGLING', 
      threatLevel: 'MEDIUM', 
      status: 'CLOSED',
      description: 'Próba wniesienia niedozwolonych substancji przez odwiedzającego.'
    },
    { 
      id: '3', 
      date: '2024-03-08', 
      time: '22:00', 
      location: 'Sektor C', 
      category: 'REGULATION_VIOLATION', 
      threatLevel: 'LOW', 
      status: 'CLOSED',
      description: 'Niezastosowanie się do poleceń funkcjonariusza podczas apelu wieczornego.'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Raporty Incydentów</h2>
          <p className="text-slate-500">Monitoruj i zgłaszaj zdarzenia naruszające bezpieczeństwo.</p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20">
          <Plus size={20} />
          Zgłoś Incydent
        </button>
      </div>

      <div className="flex gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Szukaj incydentów..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter size={18} />
          Filtry
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {incidents.map((incident) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-200 transition-all group"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    incident.threatLevel === 'HIGH' ? 'bg-red-100 text-red-700' : 
                    incident.threatLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Zagrożenie: {THREAT_LEVELS[incident.threatLevel as keyof typeof THREAT_LEVELS]}
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                    {INCIDENT_CATEGORIES[incident.category as keyof typeof INCIDENT_CATEGORIES]}
                  </span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    incident.status === 'CLOSED' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {incident.status === 'CLOSED' ? 'Zamknięte' : 'W toku'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900">{incident.description}</h3>
                
                <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    <span>{incident.date} {incident.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    <span>{incident.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400" />
                    <span>2 osadzonych, 1 funkcjonariusz</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-medium transition-colors">
                  <FileText size={18} />
                  Szczegóły
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Incidents;
