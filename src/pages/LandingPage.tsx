import React from 'react';
import { useEventContext } from '../context/EventContext';
import type { AttendeeTab } from '../types';
import { 
  Users, 
  ShieldAlert, 
  Accessibility, 
  ArrowRight, 
  Compass, 
  Sparkles,
  Bell,
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setViewMode, setAttendeeTab } = useEventContext();

  const handleExploreAttendee = (tab: AttendeeTab = 'overview') => {
    setAttendeeTab(tab);
    setViewMode('attendee');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28">
        
        {/* Soft Background Gradient Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-200/40 via-sky-200/30 to-violet-200/40 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-indigo-700 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Smart Event Experience Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Every Event. <br />
              <span className="hero-gradient-text">One Smarter Experience.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-2xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
              Navigate better, discover more, stay safer.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleExploreAttendee('overview')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Event Portal</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleExploreAttendee('map')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border border-slate-200 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5 text-indigo-600" />
                <span>Interactive Venue Map</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium pt-2">
              Smart Venue Companion &bull; Preloaded TechVerse Summit 2026 dataset &bull; Verified Attendee Access
            </p>
          </div>

          {/* Event Preview Dashboard Mockup */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl bg-white p-3 sm:p-5 shadow-2xl border border-slate-200/80">
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-inner text-white p-4 sm:p-6">
              
              {/* Fake Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">eventora.live/techverse-2026</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE VENUE TELEMETRY</span>
                </div>
              </div>

              {/* Grid Cards inside Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                
                <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase flex items-center gap-1.5">
                      <Compass className="w-4 h-4" /> SVG Indoor Map
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">Turn-by-Turn</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">Main Stage &rarr; Workshop Alpha</p>
                  <p className="text-[11px] text-slate-400 mt-1">2 min walk &bull; Wheelchair Route Active</p>
                </div>

                <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-sky-400 uppercase flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> Live Crowd Heat
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">82% Load</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden my-2">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 w-[82%]" />
                  </div>
                  <p className="text-[11px] text-slate-400">Networking Lounge: Low Crowd (0m wait)</p>
                </div>

                <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-400 uppercase flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" /> Instant SOS
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">24/7 First Aid</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">One-Tap Emergency Dispatch</p>
                  <p className="text-[11px] text-slate-400 mt-1">Direct GPS coordinate link to security desk</p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6 Feature Cards Grid */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Complete Feature Suite
            </h2>
            <p className="text-slate-600 text-base">
              Everything required to transform large conferences, summits, and expos into smart interactive spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1: Navigation */}
            <div className="saas-card p-6 space-y-3 group hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Indoor Navigation</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Turn-by-turn indoor routing on interactive SVG floorplans with walking distance, ETA, and landmark pins.
              </p>
            </div>

            {/* Feature 2: Event Discovery */}
            <div className="saas-card p-6 space-y-3 group hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Event Discovery</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Browse talks, filter by category and hall location, track live seat availability, and receive conflict warnings.
              </p>
            </div>

            {/* Feature 3: Crowd Intelligence */}
            <div className="saas-card p-6 space-y-3 group hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Crowd Intelligence</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Real-time zone occupancy tracking, queue wait times, and rule-based low-density alternative recommendations.
              </p>
            </div>

            {/* Feature 4: Safety & SOS */}
            <div className="saas-card p-6 space-y-3 group hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Safety & SOS</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                1-tap Emergency SOS panic dispatch, hazard reporting form, and real-time paramedic ticket tracking.
              </p>
            </div>

            {/* Feature 5: Accessibility */}
            <div className="saas-card p-6 space-y-3 group hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Accessibility className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Accessibility First</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Wheelchair-only route mode, high-contrast dark theme, ASL interpreter schedules, and quiet sensory rooms.
              </p>
            </div>

            {/* Feature 6: Real-Time Updates */}
            <div className="saas-card p-6 space-y-3 group hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Real-Time Updates</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Live event broadcast alerts, room change notices, and schedule updates pushed instantly to attendee screens.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Visual Event Venue Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold sm:text-4xl text-white">
              Visual Venue Intelligence
            </h2>
            <p className="text-slate-400 text-base">
              A spatial overview illustrating attendees, buildings, navigation paths, and active event zones.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700">
                <Building2 className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <h4 className="font-bold text-white text-sm">10 Venue Zones</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Keynotes, Labs, Cafes</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700">
                <Users className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                <h4 className="font-bold text-white text-sm">2,840 Active Attendees</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Live density telemetry</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700">
                <Compass className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <h4 className="font-bold text-white text-sm">Adaptive Routing</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Wheelchair & stairs paths</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700">
                <ShieldAlert className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                <h4 className="font-bold text-white text-sm">24/7 First Aid</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Paramedic dispatch</p>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Ready to present to hackathon judges & event stakeholders.</span>
              </div>

              <button
                onClick={() => handleExploreAttendee('map')}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Launch Interactive Venue Map &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
          <p className="font-bold text-slate-800 text-sm">Eventora — Navigate Better. Experience More.</p>
          <p>&copy; 2026 Eventora SaaS Platform. Built for the Smart Event Experience Challenge.</p>
        </div>
      </footer>

    </div>
  );
};
