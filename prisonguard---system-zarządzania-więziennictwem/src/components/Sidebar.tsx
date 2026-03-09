import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  Stethoscope, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  UserCircle,
  ClipboardList,
  DoorOpen,
  History
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserRole } from '../types';
import { ROLE_LABELS } from '../constants';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onLogout, userName }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Panel Główny', icon: LayoutDashboard, roles: ['ADMIN', 'DIRECTOR', 'GUARD', 'MEDICAL', 'ADMIN_STAFF'] },
    { id: 'inmates', label: 'Osadzeni', icon: Users, roles: ['ADMIN', 'DIRECTOR', 'GUARD', 'MEDICAL', 'ADMIN_STAFF'] },
    { id: 'incidents', label: 'Incydenty', icon: ShieldAlert, roles: ['ADMIN', 'DIRECTOR', 'GUARD'] },
    { id: 'medical', label: 'Medyczny', icon: Stethoscope, roles: ['ADMIN', 'MEDICAL'] },
    { id: 'staff', label: 'Personel', icon: UserCircle, roles: ['ADMIN', 'DIRECTOR'] },
    { id: 'schedule', label: 'Harmonogram', icon: Calendar, roles: ['ADMIN', 'DIRECTOR', 'GUARD', 'ADMIN_STAFF'] },
    { id: 'cells', label: 'Cele i Oddziały', icon: DoorOpen, roles: ['ADMIN', 'DIRECTOR', 'GUARD'] },
    { id: 'visits', label: 'Wizyty', icon: ClipboardList, roles: ['ADMIN', 'GUARD', 'ADMIN_STAFF'] },
    { id: 'messages', label: 'Wiadomości', icon: MessageSquare, roles: ['ADMIN', 'DIRECTOR', 'GUARD', 'MEDICAL', 'ADMIN_STAFF'] },
    { id: 'logs', label: 'Historia Działań', icon: History, roles: ['ADMIN'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ShieldAlert className="text-emerald-500" />
          PrisonGuard
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">System Zarządzania</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-emerald-400 font-bold">
            {userName.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-slate-500 truncate">{ROLE_LABELS[role]}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-red-900/30 hover:text-red-400 transition-all text-slate-400"
        >
          <LogOut size={18} />
          <span className="font-medium">Wyloguj</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
