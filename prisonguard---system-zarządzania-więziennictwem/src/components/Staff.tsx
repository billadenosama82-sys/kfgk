import React from 'react';
import { 
  UserCircle, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Briefcase,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { ROLE_LABELS } from '../constants';
import { UserRole } from '../types';

const Staff: React.FC = () => {
  const staffMembers = [
    { id: '1', name: 'Jan Kowalski', role: 'ADMIN' as UserRole, employeeId: 'ADM-001', department: 'Administracja', email: 'j.kowalski@prison.gov.pl' },
    { id: '2', name: 'Adam Nowak', role: 'GUARD' as UserRole, employeeId: 'GRD-154', department: 'Ochrona - Blok A', email: 'a.nowak@prison.gov.pl' },
    { id: '3', name: 'Anna Wiśniewska', role: 'MEDICAL' as UserRole, employeeId: 'MED-012', department: 'Służba Zdrowia', email: 'a.wisniewska@prison.gov.pl' },
    { id: '4', name: 'Piotr Zieliński', role: 'DIRECTOR' as UserRole, employeeId: 'DIR-001', department: 'Dyrekcja', email: 'p.zielinski@prison.gov.pl' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Zarządzanie Personelem</h2>
          <p className="text-slate-500">Przeglądaj i zarządzaj kontami pracowników.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
          <Plus size={20} />
          Dodaj Pracownika
        </button>
      </div>

      <div className="flex gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Szukaj pracowników..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staffMembers.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <UserCircle size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-sm text-emerald-600 font-medium">{ROLE_LABELS[member.role]}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase font-bold">Numer Służbowy</p>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Briefcase size={14} className="text-slate-400" />
                  {member.employeeId}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase font-bold">Dział</p>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Calendar size={14} className="text-slate-400" />
                  {member.department}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                <Mail size={16} />
                Email
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-medium transition-colors">
                <Phone size={16} />
                Kontakt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
