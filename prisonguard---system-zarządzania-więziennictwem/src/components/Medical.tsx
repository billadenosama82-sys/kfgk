import React from 'react';
import { 
  Stethoscope, 
  Plus, 
  Search, 
  Activity, 
  Pill, 
  Calendar, 
  FileText,
  User
} from 'lucide-react';

const Medical: React.FC = () => {
  const medicalRecords = [
    { id: '1', inmate: 'Jan Kowalski', date: '2024-03-09', diagnosis: 'Nadciśnienie tętnicze', doctor: 'dr Anna Wiśniewska', status: 'W trakcie leczenia' },
    { id: '2', inmate: 'Adam Nowak', date: '2024-03-08', diagnosis: 'Kontrola pooperacyjna', doctor: 'dr Anna Wiśniewska', status: 'Zakończone' },
    { id: '3', inmate: 'Marek Zając', date: '2024-03-07', diagnosis: 'Infekcja górnych dróg oddechowych', doctor: 'dr Anna Wiśniewska', status: 'W trakcie leczenia' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">System Medyczny</h2>
          <p className="text-slate-500">Zarządzaj dokumentacją medyczną i wizytami lekarskimi.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
          <Plus size={20} />
          Nowa Wizyta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Activity size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Dzisiejsze Wizyty</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">12</p>
          <p className="text-xs text-slate-500 mt-1">4 oczekujące</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
              <Pill size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Wydawanie Leków</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">145</p>
          <p className="text-xs text-slate-500 mt-1">Sesja poranna zakończona</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
              <Calendar size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Hospitalizacje</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">2</p>
          <p className="text-xs text-slate-500 mt-1">Stabilny stan</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Ostatnie Wpisy Medyczne</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Szukaj pacjenta..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {medicalRecords.map((record) => (
            <div key={record.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{record.inmate}</h4>
                  <p className="text-sm text-slate-500">{record.diagnosis}</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-sm">
                  <p className="text-slate-400 text-xs uppercase font-bold">Lekarz</p>
                  <p className="font-medium text-slate-700">{record.doctor}</p>
                </div>
                <div className="text-sm">
                  <p className="text-slate-400 text-xs uppercase font-bold">Data</p>
                  <p className="font-medium text-slate-700">{record.date}</p>
                </div>
                <div className="text-right min-w-[120px]">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    record.status === 'Zakończone' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {record.status}
                  </span>
                </div>
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <FileText size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Medical;
