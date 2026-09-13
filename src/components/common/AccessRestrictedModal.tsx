import React from 'react';
import { useEventContext } from '../../context/EventContext';
import { ShieldAlert, ArrowLeft, UserCheck, Lock } from 'lucide-react';

export const AccessRestrictedModal: React.FC = () => {
  const { 
    isAccessRestrictedModalOpen, 
    setIsAccessRestrictedModalOpen, 
    loginAsDemoUser,
    setViewMode,
    currentUser
  } = useEventContext();

  if (!isAccessRestrictedModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 p-6 text-white text-center relative">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/30 shadow-inner">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-extrabold tracking-tight">Access Restricted</h3>
          <p className="text-xs text-white/90 font-medium mt-1">Organizer Privileges Required</p>
        </div>

        {/* Content Body */}
        <div className="p-6 text-center space-y-4">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-left flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              You are currently authenticated as <strong className="font-bold">{currentUser?.name || 'an Attendee'}</strong> ({currentUser?.role || 'attendee'} pass). The Organizer Command Center is protected for venue operations.
            </p>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            To explore event administration features, switch to an Organizer account or return to your Attendee Portal.
          </p>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => loginAsDemoUser('organizer')}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <UserCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Switch to Demo Organizer (Sarah Jenkins)</span>
            </button>

            <button
              onClick={() => {
                setIsAccessRestrictedModalOpen(false);
                setViewMode('attendee');
              }}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span>Return to Attendee Portal</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
