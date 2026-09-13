import React from 'react';
import { useEventContext } from '../context/EventContext';
import type { OrganizerTab } from '../types';
import { OperationsOverview } from '../components/organizer/OperationsOverview';
import { LiveVenueMonitor } from '../components/organizer/LiveVenueMonitor';
import { SessionManagement } from '../components/organizer/SessionManagement';
import { AnnouncementManagement } from '../components/organizer/AnnouncementManagement';
import { IncidentManagement } from '../components/organizer/IncidentManagement';
import { AttendeeInsights } from '../components/organizer/AttendeeInsights';
import { EventSettings } from '../components/organizer/EventSettings';
import { 
  BarChart3, 
  Activity, 
  Calendar, 
  Radio, 
  ShieldAlert, 
  PieChart, 
  Settings, 
  RadioTower,
  Bell
} from 'lucide-react';

export const OrganizerDashboard: React.FC = () => {
  const { organizerTab, setOrganizerTab, incidents } = useEventContext();
  const openIncidentsCount = incidents.filter(i => i.status !== 'Resolved').length;

  const sidebarItems: { id: OrganizerTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: 'Operations Overview', icon: BarChart3 },
    { id: 'monitor', label: 'Live Venue Monitor', icon: Activity },
    { id: 'sessions', label: 'Session Catalog', icon: Calendar },
    { id: 'announcements', label: 'Broadcast System', icon: Radio },
    { id: 'incidents', label: 'Incident Queue', icon: ShieldAlert, badge: openIncidentsCount },
    { id: 'insights', label: 'Spatial Analytics', icon: PieChart },
    { id: 'settings', label: 'Event Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* Enterprise Operations Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex-shrink-0 p-4 space-y-6 flex flex-col justify-between text-white">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/30">
              <RadioTower className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white leading-tight">ORGANIZER COMMAND</h3>
              <p className="text-[10px] text-slate-400 font-medium">TechVerse Summit 2026</p>
            </div>
          </div>

          {/* Sidebar Nav Items */}
          <nav className="space-y-1">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              const isActive = organizerTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setOrganizerTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-extrabold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800/80 px-2 space-y-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Telemetry Active</span>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Event Operations Command</h1>
            <p className="text-xs text-slate-500">Real-time venue telemetry & operational dispatch</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setOrganizerTab('incidents')}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 relative transition-colors"
              title="Incidents Queue"
            >
              <Bell className="w-4 h-4" />
              {openIncidentsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>

            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              OP
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {organizerTab === 'overview' && <OperationsOverview />}
          {organizerTab === 'monitor' && <LiveVenueMonitor />}
          {organizerTab === 'sessions' && <SessionManagement />}
          {organizerTab === 'announcements' && <AnnouncementManagement />}
          {organizerTab === 'incidents' && <IncidentManagement />}
          {organizerTab === 'insights' && <AttendeeInsights />}
          {organizerTab === 'settings' && <EventSettings />}
        </main>

      </div>

    </div>
  );
};
