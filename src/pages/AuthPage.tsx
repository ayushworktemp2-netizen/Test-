import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import { 
  Sparkles, 
  Users, 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  Check, 
  KeyRound
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { loginAsDemoUser, loginCustomUser } = useEventContext();
  
  const [selectedRole, setSelectedRole] = useState<'attendee' | 'organizer'>('attendee');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [formError, setFormError] = useState('');

  const handleRoleChange = (role: 'attendee' | 'organizer') => {
    setSelectedRole(role);
    setFormError('');
    // Auto populate realistic defaults when switching roles in login mode
    if (authMode === 'login' && (!email || email.includes('.demo'))) {
      setEmail(role === 'attendee' ? 'alex.rivera@attendee.demo' : 'sarah.jenkins@organizer.demo');
      setPassword('demo123456');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (authMode === 'register') {
      if (!name.trim()) {
        setFormError('Please enter your full name.');
        return;
      }
      if (!email.trim()) {
        setFormError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
      if (!termsAgreed) {
        setFormError('Please accept the Terms of Service to create an account.');
        return;
      }
      loginCustomUser(name, email, selectedRole);
    } else {
      // Login mode
      const userEmail = email.trim() || (selectedRole === 'attendee' ? 'alex.rivera@attendee.demo' : 'sarah.jenkins@organizer.demo');
      const userName = selectedRole === 'attendee' ? 'Alex Rivera' : 'Sarah Jenkins';
      loginCustomUser(userName, userEmail, selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-6xl w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        
        {/* ================= LEFT SIDE: BRANDING & VISUAL PRESENTATION ================= */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 translate-x-12 translate-y-12 w-64 h-64 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />

          {/* Header Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white font-sans block leading-none">
                  Eventora
                </span>
                <span className="text-[10px] text-indigo-300 font-semibold tracking-wider uppercase">
                  Smart Venue SaaS
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white mb-3">
              Every Event. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300">
                One Smarter Experience.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              A smarter event companion for attendees and organizers. Real-time SVG venue maps, instant crowd telemetry, and synchronized operations.
            </p>
          </div>

          {/* Feature Highlights Mockup */}
          <div className="relative z-10 my-8 space-y-3">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-inner">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Interactive Venue Floorplan</h4>
                <p className="text-[11px] text-slate-300">Turn-by-turn routes & wheelchair paths</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-inner">
              <div className="w-8 h-8 rounded-xl bg-violet-500/30 flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-violet-300" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Live Crowd Density Telemetry</h4>
                <p className="text-[11px] text-slate-300">Real-time zone occupancy & alternate finders</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3 shadow-inner">
              <div className="w-8 h-8 rounded-xl bg-rose-500/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-rose-300" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">1-Tap Emergency SOS Dispatch</h4>
                <p className="text-[11px] text-slate-300">Instant responder alert & hazard tracking</p>
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              TechVerse Summit 2026 Live
            </span>
            <span className="font-mono text-indigo-300 font-bold uppercase tracking-wider">v2.4 Production</span>
          </div>
        </div>

        {/* ================= RIGHT SIDE: AUTHENTICATION CARD ================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Welcome to Eventora
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Choose your experience to continue.
              </p>
            </div>

            {/* Role Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              {/* ATTENDEE CARD */}
              <button
                type="button"
                onClick={() => handleRoleChange('attendee')}
                className={`p-4 rounded-2xl text-left border-2 transition-all relative group flex flex-col justify-between cursor-pointer focus:outline-hidden ${
                  selectedRole === 'attendee'
                    ? 'border-indigo-600 bg-gradient-to-br from-indigo-50/80 via-indigo-50/30 to-violet-50/40 shadow-md shadow-indigo-500/10'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selectedRole === 'attendee' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}>
                    <Users className="w-5 h-5" />
                  </div>
                  {selectedRole === 'attendee' ? (
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center animate-in zoom-in-50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className={`text-base font-extrabold ${selectedRole === 'attendee' ? 'text-indigo-950' : 'text-slate-900'}`}>
                      Attendee
                    </h3>
                    <span className="px-1.5 py-0.5 text-[9px] font-black text-indigo-700 bg-indigo-100/80 rounded-md uppercase">
                      Pass Holder
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    Explore the event, navigate the venue, and manage your experience.
                  </p>
                </div>
              </button>

              {/* ORGANIZER CARD */}
              <button
                type="button"
                onClick={() => handleRoleChange('organizer')}
                className={`p-4 rounded-2xl text-left border-2 transition-all relative group flex flex-col justify-between cursor-pointer focus:outline-hidden ${
                  selectedRole === 'organizer'
                    ? 'border-slate-900 bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md shadow-slate-950/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selectedRole === 'organizer' ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}>
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  {selectedRole === 'organizer' ? (
                    <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center animate-in zoom-in-50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className={`text-base font-extrabold ${selectedRole === 'organizer' ? 'text-white' : 'text-slate-900'}`}>
                      Organizer
                    </h3>
                    <span className={`px-1.5 py-0.5 text-[9px] font-black rounded-md uppercase ${
                      selectedRole === 'organizer' ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Command Ops
                    </span>
                  </div>
                  <p className={`text-xs font-medium mt-1 leading-relaxed ${selectedRole === 'organizer' ? 'text-slate-300' : 'text-slate-500'}`}>
                    Manage event operations, monitor the venue, and coordinate activities.
                  </p>
                </div>
              </button>

            </div>

            {/* Form Section Title */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-slate-900">
                {selectedRole === 'attendee' 
                  ? (authMode === 'login' ? 'Attendee Login' : 'Create Attendee Account')
                  : (authMode === 'login' ? 'Organizer Login' : 'Create Organizer Account')
                }
              </h3>
              <span className="text-[11px] font-bold text-slate-400">
                {authMode === 'login' ? 'Enter credentials' : 'Register identity'}
              </span>
            </div>

            {/* Auth Mode Segmented Pill */}
            <div className="flex items-center justify-between p-1 bg-slate-100 rounded-xl border border-slate-200/80 mb-5">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                  authMode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                  authMode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3">
              
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={selectedRole === 'attendee' ? 'Alex Morgan' : 'Sarah Chen'}
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all bg-slate-50/50"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'attendee' ? 'alex.rivera@attendee.demo' : 'sarah.jenkins@organizer.demo'}
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  {authMode === 'login' && (
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all bg-slate-50/50"
                  />
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden transition-all bg-slate-50/50"
                    />
                  </div>
                </div>
              )}

              {/* Checkbox Options */}
              {authMode === 'login' ? (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 text-indigo-600 rounded-md border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-slate-600 font-medium">Remember me</span>
                  </label>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="w-3.5 h-3.5 text-indigo-600 rounded-md border-slate-300 focus:ring-indigo-500"
                  />
                  <span className="text-xs text-slate-600 font-medium">
                    I agree to the Eventora Terms of Service & Privacy Policy
                  </span>
                </div>
              )}

              {/* Dynamic Primary CTA */}
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2 ${
                  selectedRole === 'attendee'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-950/20'
                }`}
              >
                <span>
                  {authMode === 'login' 
                    ? `Continue as ${selectedRole === 'attendee' ? 'Attendee' : 'Organizer'}`
                    : `Create Account as ${selectedRole === 'attendee' ? 'Attendee' : 'Organizer'}`
                  }
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>

          {/* ================= TRY DEMO EXPERIENCE SECTION ================= */}
          <div className="mt-6 pt-5 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Try Demo Experience
              </span>
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">
                Hackathon Judge Evaluation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginAsDemoUser('attendee')}
                className="py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200/80 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Users className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                <span>Demo Attendee</span>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemoUser('organizer')}
                className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Demo Organizer</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
