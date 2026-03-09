import React from 'react';
import { 
  Users, 
  ShieldAlert, 
  UserCircle, 
  Bell, 
  Calendar, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const data = [
  { name: 'Pon', incydenty: 2 },
  { name: 'Wt', incydenty: 5 },
  { name: 'Śr', incydenty: 3 },
  { name: 'Czw', incydenty: 8 },
  { name: 'Pt', incydenty: 4 },
  { name: 'Sob', incydenty: 1 },
  { name: 'Ndz', incydenty: 2 },
];

const Dashboard: React.FC = () => {
  const [statsData, setStatsData] = React.useState({
    inmates: '...',
    staff: '...',
    incidentsToday: '...',
    activeAlarms: '...'
  });

  React.useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStatsData({
          inmates: data.inmates.toString(),
          staff: data.staff.toString(),
          incidentsToday: data.incidentsToday.toString(),
          activeAlarms: data.activeAlarms.toString()
        });
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  const stats = [
    { label: 'Osadzeni', value: statsData.inmates, icon: Users, color: 'bg-blue-500', trend: '+12' },
    { label: 'Personel na zmianie', value: statsData.staff, icon: UserCircle, color: 'bg-emerald-500', trend: 'Stabilnie' },
    { label: 'Aktywne Alarmy', value: statsData.activeAlarms, icon: AlertTriangle, color: 'bg-red-500', trend: 'Wymaga uwagi' },
    { label: 'Dzisiejsze Zdarzenia', value: statsData.incidentsToday, icon: ShieldAlert, color: 'bg-amber-500', trend: '-2' },
  ];

  const recentIncidents = [
    { id: 1, type: 'Naruszenie regulaminu', inmate: 'Jan Kowalski', time: '10:45', status: 'W toku', priority: 'MEDIUM' },
    { id: 2, type: 'Bójka', inmate: 'Adam Nowak, Piotr Wiśniewski', time: '09:15', status: 'Zakończone', priority: 'HIGH' },
    { id: 3, type: 'Próba przemytu', inmate: 'Marek Zając', time: 'Wczoraj', status: 'Zakończone', priority: 'HIGH' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Panel Główny</h2>
          <p className="text-slate-500">Witaj w systemie PrisonGuard. Oto aktualny stan jednostki.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600">
            <Calendar size={18} />
            <span className="text-sm font-medium">{new Date().toLocaleDateString('pl-PL')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend.includes('+') ? 'bg-emerald-100 text-emerald-700' : 
                stat.trend.includes('-') ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Statystyka Incydentów (Tydzień)</h3>
              <TrendingUp className="text-slate-400" size={20} />
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="incydenty" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Ostatnie Incydenty</h3>
              <button className="text-emerald-600 text-sm font-bold hover:underline">Zobacz wszystkie</button>
            </div>
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${incident.priority === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{incident.type}</p>
                      <p className="text-sm text-slate-500">Osadzony: {incident.inmate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-slate-400 text-xs mb-1">
                      <Clock size={12} />
                      <span>{incident.time}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      incident.status === 'Zakończone' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Harmonogram Dnia</h3>
            <div className="space-y-6">
              {[
                { time: '07:00', task: 'Pobudka i apel poranny', status: 'done' },
                { time: '08:00', task: 'Śniadanie', status: 'done' },
                { time: '09:00', task: 'Praca i zajęcia programowe', status: 'current' },
                { time: '13:00', task: 'Obiad', status: 'upcoming' },
                { time: '15:00', task: 'Spacer i rekreacja', status: 'upcoming' },
                { time: '18:00', task: 'Kolacja', status: 'upcoming' },
                { time: '20:00', task: 'Apel wieczorny', status: 'upcoming' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {idx !== 6 && <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-slate-100"></div>}
                  <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm z-10 flex-shrink-0 ${
                    item.status === 'done' ? 'bg-emerald-500' : 
                    item.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'
                  }`}></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400">{item.time}</p>
                    <p className={`text-sm font-medium ${item.status === 'current' ? 'text-blue-600' : 'text-slate-700'}`}>
                      {item.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
            <h3 className="text-lg font-bold mb-2">Komunikat Dnia</h3>
            <p className="text-emerald-100 text-sm leading-relaxed mb-4">
              Przypominamy o obowiązkowym szkoleniu z zakresu nowych procedur bezpieczeństwa w sektorze B, które odbędzie się jutro o 10:00 w sali konferencyjnej.
            </p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors">
              Potwierdzam odczytanie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
