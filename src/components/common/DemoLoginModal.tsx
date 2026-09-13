import React, { useState } from 'react';
import { useEventContext } from '../../context/EventContext';
import { X, Users, ShieldAlert, LogIn, Sparkles, Lock } from 'lucide-react';

export const DemoLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginModalRole, loginAsDemoUser } = useEventContext();
  const [activeTab, setActiveTab] = useState<'attendee' | 'organizer'>(loginModalRole);

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Eventora Demo Portal</h3>
              <p className="text-xs text-slate-500 font-medium">Select a role account to authenticate</p>
            </div>
          </div>

          <button 
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Tab Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => setActiveTab('attendee')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'attendee'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Attendee Login</span>
          </button>

          <button
            onClick={() => setActiveTab('organizer')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'organizer'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Organizer Login</span>
          </button>
        </div>

        {/* Tab 1: Attendee Login */}
        {activeTab === 'attendee' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-indigo-900">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600" /> Sample Attendee Account
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-200 text-indigo-800 text-[10px]">Verified Pass</span>
              </div>
              <div className="space-y-0.5 text-slate-600 text-[11px]">
                <p><strong>Name:</strong> Alex Rivera</p>
                <p><strong>Email:</strong> alex.rivera@attendee.demo</p>
                <p><strong>Pass Type:</strong> All-Access TechVerse Pass</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value="alex.rivera@attendee.demo" 
                  readOnly 
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono text-xs cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value="••••••••••••" 
                    readOnly 
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono text-xs cursor-not-allowed"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <button
              onClick={() => loginAsDemoUser('attendee')}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login & Launch Attendee Dashboard</span>
            </button>
          </div>
        )}

        {/* Tab 2: Organizer Login */}
        {activeTab === 'organizer' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <ShieldAlert className="w-4 h-4" /> Command Staff Account
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 text-[10px]">Admin Access</span>
              </div>
              <div className="space-y-0.5 text-slate-300 text-[11px]">
                <p><strong>Name:</strong> Sarah Jenkins</p>
                <p><strong>Email:</strong> sarah.jenkins@organizer.demo</p>
                <p><strong>Role:</strong> Director of Event Operations</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Organizer Credentials</label>
                <input 
                  type="email" 
                  value="sarah.jenkins@organizer.demo" 
                  readOnly 
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono text-xs cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Security Key</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value="••••••••••••" 
                    readOnly 
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono text-xs cursor-not-allowed"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <button
              onClick={() => loginAsDemoUser('organizer')}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-cyan-400" />
              <span>Login & Launch Organizer Command</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
