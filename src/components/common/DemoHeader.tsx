import React, { useState } from 'react';
import { useEventContext } from '../../context/EventContext';
import { Radio, Users, ShieldAlert, Sparkles, RefreshCw, Layers, LogIn, UserCheck, Activity, Menu, X, LogOut } from 'lucide-react';

export const DemoHeader: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    currentUser,
    openLoginModal,
    logoutUser,
    triggerSimulatedEvent, 
    resetAllData,
    settings,
    updateSettings
  } = useEventContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSimulation = () => {
    updateSettings({ simulationActive: !settings.simulationActive });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Context Badge */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => setViewMode(currentUser?.role === 'organizer' ? 'organizer' : 'landing')}
              className="flex items-center gap-2.5 group focus:outline-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-slate-900 font-sans leading-none">
                    Eventora
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-md uppercase tracking-wider">
                    SaaS
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase hidden sm:block">
                  {currentUser?.role === 'organizer' ? 'Organizer Command' : 'Smart Event Companion'}
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Switcher Pill (Desktop) - DYNAMICALLY RENDERED BY ROLE */}
          {currentUser?.role === 'attendee' && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
              <button
                onClick={() => setViewMode('landing')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  viewMode === 'landing' 
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Landing</span>
              </button>

              <button
                onClick={() => setViewMode('attendee')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  viewMode === 'attendee' 
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/20' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Attendee Experience</span>
              </button>
            </nav>
          )}

          {currentUser?.role === 'organizer' && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
              <button
                onClick={() => setViewMode('organizer')}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all bg-slate-900 text-white shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                <span>Organizer Command</span>
              </button>
            </nav>
          )}

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 flex-shrink-0">
            
            {/* Live Telemetry / Auto-Tick Indicator */}
            <button
              onClick={toggleSimulation}
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                settings.simulationActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
              title={settings.simulationActive ? 'Pause real-time telemetry simulation' : 'Resume real-time telemetry simulation'}
            >
              <span className={`w-2 h-2 rounded-full ${settings.simulationActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Auto-Tick: {settings.simulationActive ? 'ON' : 'OFF'}</span>
            </button>

            {/* Quick Demo Surge Simulator */}
            <button
              onClick={triggerSimulatedEvent}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-bold transition-all shadow-xs whitespace-nowrap"
              title="Simulate sudden food court crowd surge"
            >
              <Radio className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Simulate Surge</span>
            </button>

            {/* User Profile & Logout Section */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
                <button
                  onClick={() => openLoginModal(currentUser.role)}
                  className="flex items-center gap-2 px-2.5 py-1 bg-white text-slate-900 border border-slate-200/80 rounded-xl text-xs font-bold transition-all shadow-2xs whitespace-nowrap hover:bg-slate-50"
                  title="Click to switch role or account"
                >
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                    {currentUser.avatar}
                  </div>
                  <span className="hidden sm:inline font-extrabold">{currentUser.name}</span>
                  <span className={`px-1.5 py-0.2 text-[9px] font-black rounded-md uppercase hidden md:inline ${
                    currentUser.role === 'organizer' 
                      ? 'bg-slate-900 text-cyan-300' 
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {currentUser.role}
                  </span>
                </button>

                <button
                  onClick={logoutUser}
                  className="px-2.5 py-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 whitespace-nowrap"
                  title="Sign out of Eventora"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setViewMode('auth')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In / Demo</span>
              </button>
            )}

            {/* Reset Data Button */}
            <button
              onClick={resetAllData}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors flex-shrink-0"
              title="Reset Mock Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-1 border-t border-slate-200/80 space-y-2 animate-in slide-in-from-top duration-200">
            {currentUser?.role === 'attendee' && (
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => { setViewMode('landing'); setMobileMenuOpen(false); }}
                  className={`py-2 text-xs font-bold rounded-lg text-center ${viewMode === 'landing' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Landing
                </button>
                <button
                  onClick={() => { setViewMode('attendee'); setMobileMenuOpen(false); }}
                  className={`py-2 text-xs font-bold rounded-lg text-center ${viewMode === 'attendee' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
                >
                  Attendee Experience
                </button>
              </div>
            )}

            {currentUser?.role === 'organizer' && (
              <div className="grid grid-cols-1 gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => { setViewMode('organizer'); setMobileMenuOpen(false); }}
                  className="py-2 text-xs font-bold rounded-lg text-center bg-slate-900 text-white"
                >
                  Organizer Command
                </button>
              </div>
            )}

            <div className="flex items-center justify-between gap-2 pt-2">
              <button
                onClick={toggleSimulation}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border ${
                  settings.simulationActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Auto-Tick: {settings.simulationActive ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => { triggerSimulatedEvent(); setMobileMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold"
              >
                <Radio className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulate Surge</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

