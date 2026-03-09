import React from 'react';
import { 
  DoorOpen, 
  Users, 
  Lock, 
  Unlock, 
  AlertCircle,
  ChevronRight,
  Plus
} from 'lucide-react';

const Cells: React.FC = () => {
  const wards = [
    { id: 'A', name: 'Oddział A', description: 'Oddział o zaostrzonym rygorze', cells: 24, occupancy: 42, capacity: 48 },
    { id: 'B', name: 'Oddział B', description: 'Oddział ogólny', cells: 36, occupancy: 68, capacity: 72 },
    { id: 'C', name: 'Oddział C', description: 'Oddział terapeutyczny', cells: 12, occupancy: 18, capacity: 24 },
  ];

  const recentCells = [
    { number: 'A-101', occupancy: 2, capacity: 2, status: 'LOCKED', special: false },
    { number: 'A-102', occupancy: 1, capacity: 2, status: 'OPEN', special: false },
    { number: 'A-103', occupancy: 0, capacity: 2, status: 'OPEN', special: true },
    { number: 'B-201', occupancy: 4, capacity: 4, status: 'LOCKED', special: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Cele i Oddziały</h2>
          <p className="text-slate-500">Zarządzaj przestrzenią i rozmieszczeniem osadzonych.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
          <Plus size={20} />
          Nowy Oddział
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {wards.map((ward) => (
          <div key={ward.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                <DoorOpen size={24} />
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{ward.name}</h3>
            <p className="text-sm text-slate-500 mb-6">{ward.description}</p>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Zapełnienie</span>
                <span className="font-bold text-slate-900">{ward.occupancy} / {ward.capacity}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    (ward.occupancy / ward.capacity) > 0.9 ? 'bg-red-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${(ward.occupancy / ward.capacity) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Users size={14} />
                <span>{ward.cells} cel w oddziale</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Szczegóły Cel (Oddział A)</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-600">Wszystkie</button>
            <button className="px-3 py-1 text-xs font-bold rounded-lg hover:bg-slate-50 text-slate-400">Zajęte</button>
            <button className="px-3 py-1 text-xs font-bold rounded-lg hover:bg-slate-50 text-slate-400">Wolne</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-slate-100">
          {recentCells.map((cell) => (
            <div key={cell.number} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-lg font-bold text-slate-900">{cell.number}</span>
                {cell.status === 'LOCKED' ? (
                  <Lock size={18} className="text-red-500" />
                ) : (
                  <Unlock size={18} className="text-emerald-500" />
                )}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600">{cell.occupancy} / {cell.capacity} osadzonych</span>
              </div>
              <div className="flex gap-2">
                {cell.special && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700 uppercase">Specjalna</span>
                )}
                {cell.occupancy === cell.capacity && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">Pełna</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cells;
