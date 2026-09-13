import React from 'react';
import { useEventContext } from '../../context/EventContext';
import { 
  Users, 
  Activity, 
  ShieldAlert, 
  Radio, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

export const OperationsOverview: React.FC = () => {
  const { 
    zones, 
    sessions, 
    incidents, 
    setOrganizerTab, 
    triggerSimulatedEvent 
  } = useEventContext();

  const totalCapacity = zones.reduce((acc, z) => acc + z.capacity, 0);
  const totalOccupancy = zones.reduce((acc, z) => acc + z.currentOccupancy, 0);
  const occupancyPercentage = Math.round((totalOccupancy / totalCapacity) * 100);

  const openIncidents = incidents.filter(i => i.status !== 'Resolved');

  return (
    <div className="space-y-6">
      
      {/* Executive Summary Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden border border-indigo-800/60">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-violet-200 text-xs font-bold border border-white/20">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Real-Time Operations Command</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              TechVerse Summit 2026 Telemetry
            </h2>
            
            <p className="text-indigo-100 text-xs sm:text-sm max-w-xl">
              Currently hosting <strong className="text-white font-bold">{totalOccupancy.toLocaleString()} active attendees</strong> across 10 venue halls. Operations running smoothly.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setOrganizerTab('announcements')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Radio className="w-4 h-4" />
                <span>Broadcast Announcement</span>
              </button>

              <button
                onClick={triggerSimulatedEvent}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Simulate Demo Surge</span>
              </button>
            </div>
          </div>

          {/* Health Index Gauge */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center space-y-2">
            <span className="text-xs uppercase tracking-wider text-indigo-200 font-bold">Overall Health Index</span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400">
                98
              </span>
              <span className="text-xl text-indigo-200 font-bold">/ 100</span>
            </div>
            <p className="text-xs text-emerald-300 font-bold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Condition
            </p>
          </div>

        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="saas-card p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Attendees</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">12,480</p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Registered
          </p>
        </div>

        <div className="saas-card p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Live Attendance</span>
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalOccupancy.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500 font-medium">Inside venue now</p>
        </div>

        <div className="saas-card p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Venue Occupancy</span>
            <Activity className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{occupancyPercentage}%</p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500" style={{ width: `${occupancyPercentage}%` }} />
          </div>
        </div>

        <div className="saas-card p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Sessions</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {sessions.filter(s => s.status === 'Live' || s.status === 'Upcoming').length}
          </p>
          <p className="text-[11px] text-slate-500 font-medium">Across 4 main halls</p>
        </div>

        <div className="saas-card p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Open Incidents</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-600">{openIncidents.length}</p>
          <p className="text-[11px] text-slate-500 font-medium">Safety dispatch tickets</p>
        </div>

      </div>

      {/* Operations Health Section */}
      <div className="saas-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Operations Health Index
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Attendance</span>
              <span className="text-emerald-700">98% Nominal</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[98%]" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Safety & First Aid</span>
              <span className="text-emerald-700">100% Safe</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[100%]" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Sessions Schedule</span>
              <span className="text-emerald-700">95% On Time</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[95%]" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Venue Capacity</span>
              <span className="text-sky-700">{occupancyPercentage}% Load</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500" style={{ width: `${occupancyPercentage}%` }} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
