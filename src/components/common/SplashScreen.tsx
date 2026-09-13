import React from 'react';
import { Sparkles, Activity } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-6 text-white font-sans selection:bg-indigo-500 selection:text-white animate-in fade-in duration-300">
      
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
        
        {/* Animated Logo Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 border border-white/20 animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-slate-900 flex items-center justify-center shadow-md">
            <Activity className="w-3.5 h-3.5 text-slate-950 animate-spin" />
          </span>
        </div>

        {/* Brand Title */}
        <h1 className="text-3xl font-black tracking-tight text-white font-sans mb-1">
          Eventora
        </h1>

        {/* Tagline */}
        <p className="text-xs font-semibold text-indigo-300 tracking-wide uppercase mb-8">
          Smart Event Venue & Companion
        </p>

        {/* Subtle Progress Loading Bar */}
        <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/10 shadow-inner">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-violet-400 to-cyan-400 rounded-full animate-[shimmer_1.5s_infinite] w-full" />
        </div>

        {/* Status text */}
        <span className="text-[11px] font-medium text-slate-400 mt-4 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
          Initializing secure event environment...
        </span>

      </div>

    </div>
  );
};
