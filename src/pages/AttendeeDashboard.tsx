import React from 'react';
import { useEventContext } from '../context/EventContext';
import type { AttendeeTab } from '../types';
import { OverviewTab } from '../components/attendee/OverviewTab';
import { InteractiveMap } from '../components/attendee/InteractiveMap';
import { SessionDiscovery } from '../components/attendee/SessionDiscovery';
import { PersonalSchedule } from '../components/attendee/PersonalSchedule';
import { LiveUpdatesFeed } from '../components/attendee/LiveUpdatesFeed';
import { SafetyCenter } from '../components/attendee/SafetyCenter';
import { AccessibilityCenter } from '../components/attendee/AccessibilityCenter';
import { CrowdStatusView } from '../components/attendee/CrowdStatusView';
import { 
  LayoutDashboard, 
  Compass, 
  Calendar, 
  BookmarkCheck, 
  Bell, 
  ShieldAlert, 
  Accessibility, 
  Users,
  Sparkles,
  Radio
} from 'lucide-react';

export const AttendeeDashboard: React.FC = () => {
  const { attendeeTab, setAttendeeTab, savedSessionIds, announcements } = useEventContext();

  const sidebarItems: { id: AttendeeTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'map', label: 'Venue Map', icon: Compass },
    { id: 'discovery', label: 'Sessions', icon: Calendar },
    { id: 'schedule', label: 'My Schedule', icon: BookmarkCheck, badge: savedSessionIds.length },
    { id: 'updates', label: 'Live Updates', icon: Bell, badge: announcements.length },
    { id: 'safety', label: 'Safety & SOS', icon: ShieldAlert },
    { id: 'crowd', label: 'Crowd Status', icon: Users },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* LEFT SIDEBAR (Desktop & Laptop) */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200/80 flex-shrink-0 p-4 flex flex-col justify-between space-y-6">
        
        <div className="space-y-6">
          {/* Logo Header */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">Eventora</h3>
              <p className="text-[10px] text-slate-500 font-medium">Attendee Companion</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              const isActive = attendeeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setAttendeeTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM USER PROFILE & EVENT INFO */}
        <div className="pt-4 border-t border-slate-200/80 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              AR
            </div>
            <div className="overflow-hidden">
              <h5 className="font-bold text-slate-900 text-xs truncate">Alex Rivera</h5>
              <p className="text-[10px] text-slate-500 truncate">TechVerse Summit 2026</p>
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-10">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Good morning, Alex 👋</h1>
            <p className="text-xs text-slate-500 mt-0.5">TechVerse Summit 2026 &bull; Hall 4 Metro Convention Center</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setAttendeeTab('updates')}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {announcements.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>

            <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>LIVE NOW</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              AR
            </div>
          </div>
        </header>

        {/* Tab Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {attendeeTab === 'overview' && <OverviewTab />}
          {attendeeTab === 'map' && <InteractiveMap />}
          {attendeeTab === 'discovery' && <SessionDiscovery />}
          {attendeeTab === 'schedule' && <PersonalSchedule />}
          {attendeeTab === 'updates' && <LiveUpdatesFeed />}
          {attendeeTab === 'safety' && <SafetyCenter />}
          {attendeeTab === 'accessibility' && <AccessibilityCenter />}
          {attendeeTab === 'crowd' && <CrowdStatusView />}
        </main>

      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'map', label: 'Map', icon: Compass },
          { id: 'discovery', label: 'Sessions', icon: Calendar },
          { id: 'safety', label: 'Safety', icon: ShieldAlert },
          { id: 'crowd', label: 'Crowd', icon: Users }
        ].map(item => {
          const Icon = item.icon;
          const isActive = attendeeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setAttendeeTab(item.id as any)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-lg text-[10px] font-bold transition-colors ${
                isActive ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
