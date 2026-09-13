import React from 'react';
import { useEventContext } from '../../context/EventContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, Users, Compass } from 'lucide-react';

export const AttendeeInsights: React.FC = () => {
  const { sessions, zones } = useEventContext();

  // Data 1: Session Attendance Bar Chart
  const sessionChartData = sessions.map(s => ({
    name: s.title.split(':')[0].substring(0, 18) + '...',
    registered: s.registeredSeats,
    capacity: s.totalSeats
  }));

  // Data 2: Hourly Crowd Peak Area Chart
  const hourlyData = [
    { time: '09:00 AM', attendees: 840, peak: 1200 },
    { time: '10:00 AM', attendees: 1950, peak: 2500 },
    { time: '11:00 AM', attendees: 2420, peak: 3000 },
    { time: '12:00 PM', attendees: 2840, peak: 3200 },
    { time: '01:00 PM', attendees: 2310, peak: 3200 },
    { time: '02:00 PM', attendees: 2650, peak: 3500 },
    { time: '03:00 PM', attendees: 2100, peak: 3500 },
    { time: '04:00 PM', attendees: 1800, peak: 3000 }
  ];

  // Data 3: Zone Density Distribution Pie Chart
  const zonePieData = zones.map(z => ({
    name: z.name.split(' ')[0],
    value: z.currentOccupancy
  }));

  const COLORS = ['#6366F1', '#06B6D4', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#3B82F6', '#14B8A6'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="saas-card p-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-xl">Spatial Analytics & Insights</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">Aggregate venue movement, session popularity metrics, and peak hour trends</p>
        </div>
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Hourly Peak Traffic Flow */}
        <div className="saas-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" /> Hourly Traffic Flow
            </h3>
            <span className="text-xs text-slate-400 font-mono">Live Data</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="attendees" stroke="#6366F1" fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Session Registration Bar Chart */}
        <div className="saas-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" /> Session Registration Load
            </h3>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="registered" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Chart 3: Zone Density Distribution */}
      <div className="saas-card p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-600" /> Spatial Density Distribution
        </h3>

        <div className="h-72 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={zonePieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                outerRadius={95}
                fill="#8884d8"
                dataKey="value"
              >
                {zonePieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
