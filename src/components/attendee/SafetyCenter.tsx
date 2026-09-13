import React, { useState } from 'react';
import { useEventContext } from '../../context/EventContext';
import type { IncidentReport } from '../../types';
import { 
  ShieldAlert, 
  PhoneCall, 
  AlertTriangle, 
  Send, 
  X, 
  Info,
  HeartPulse,
  ShieldCheck,
  LifeBuoy
} from 'lucide-react';

export const SafetyCenter: React.FC = () => {
  const { zones, reportIncident, settings } = useEventContext();
  const [showSosModal, setShowSosModal] = useState(false);
  
  // Issue reporting form state
  const [reportTitle, setReportTitle] = useState('');
  const [reportCategory, setReportCategory] = useState<IncidentReport['type']>('Spill/Cleanliness');
  const [reportLocation, setReportLocation] = useState<string>('main-stage');
  const reporterName = 'Alex Rivera (Attendee)';
  const [reportNotes, setReportNotes] = useState('');

  const handleConfirmSos = () => {
    reportIncident({
      type: 'SOS Alert',
      title: 'EMERGENCY SOS PANIC BUTTON TRIGGERED',
      locationId: reportLocation,
      locationName: zones.find(z => z.id === reportLocation)?.name || 'Venue Ground Floor',
      reporterName: 'Alex Rivera (Smartphone SOS)',
      severity: 'Critical',
      notes: 'Automated GPS beacon dispatch requested by attendee.'
    });
    setShowSosModal(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim()) return;

    reportIncident({
      type: reportCategory,
      title: reportTitle,
      locationId: reportLocation,
      locationName: zones.find(z => z.id === reportLocation)?.name || 'General Hall',
      reporterName: reporterName,
      severity: reportCategory === 'Medical' || reportCategory === 'Security' ? 'High' : 'Low',
      notes: reportNotes
    });

    setReportTitle('');
    setReportNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Safety Status Badge (Prompt requirement: Venue Safety Status: Normal) */}
      <div className="saas-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-slate-900 text-xl flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" /> Safety & Emergency Operations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">24/7 First Aid dispatch, security desk, and incident reporting</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Venue Safety Status: Normal</span>
        </div>
      </div>

      {/* Large SOS Card (Prompt requirement: Need immediate assistance? [ HOLD TO SEND SOS ]) */}
      <div className="saas-card p-8 border-2 border-slate-200 text-center space-y-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8 animate-pulse" />
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-slate-900">Need immediate assistance?</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Feeling unwell or facing an emergency? Tap below to dispatch your live GPS coordinate to first responders.
          </p>
        </div>

        {/* Red ONLY for emergency actions */}
        <button
          onClick={() => setShowSosModal(true)}
          className="px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-rose-500/25 hover:shadow-rose-500/35 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <ShieldAlert className="w-5 h-5" />
          <span>HOLD TO SEND SOS</span>
        </button>
      </div>

      {/* SOS Confirmation Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-rose-500 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-base">
                <ShieldAlert className="w-5 h-5 animate-bounce" />
                <span>Confirm Emergency SOS Dispatch</span>
              </div>
              <button onClick={() => setShowSosModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs space-y-1">
              <p className="font-bold flex items-center gap-1">
                <Info className="w-4 h-4 text-rose-600" /> DEMO SIMULATION MODE:
              </p>
              <p>
                This action simulates broadcasting a Critical SOS alert to the Organizer Command Center.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Current Location:</label>
              <select
                value={reportLocation}
                onChange={(e) => setReportLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
              >
                {zones.map(z => (
                  <option key={z.id} value={z.id}>{z.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSosModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmSos}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md"
              >
                Dispatch Medical Staff Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact Cards Grid (First Aid, Security, Help Desk, Emergency Contacts) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="saas-card p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">First Aid Station</h4>
            <p className="text-xs text-slate-500 mt-0.5">Medical Center &bull; Hall 4</p>
          </div>
          <p className="text-xs font-bold text-indigo-600">{settings.emergencyHotline}</p>
        </div>

        <div className="saas-card p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Security Command</h4>
            <p className="text-xs text-slate-500 mt-0.5">Ground Floor Desk B</p>
          </div>
          <p className="text-xs font-bold text-indigo-600">{settings.securityDesk}</p>
        </div>

        <div className="saas-card p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Info & Help Desk</h4>
            <p className="text-xs text-slate-500 mt-0.5">Concourse Entrance Gate 1</p>
          </div>
          <p className="text-xs font-bold text-indigo-600">Ext. 1001</p>
        </div>

        <div className="saas-card p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Emergency Hotline</h4>
            <p className="text-xs text-slate-500 mt-0.5">24/7 Paramedic Line</p>
          </div>
          <p className="text-xs font-bold text-emerald-600">+1 (800) 555-EVENT</p>
        </div>

      </div>

      {/* Issue Report Form */}
      <div className="saas-card p-6 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Report an Incident or Barrier
          </h3>
          <p className="text-xs text-slate-500">Report spills, lost items, crowding overflow, or accessibility barriers directly to organizer dispatch.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category *</label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-500"
              >
                <option value="Spill/Cleanliness">Spill / Cleanliness</option>
                <option value="Lost Item">Lost Item / Belongings</option>
                <option value="Crowd Overflow">Crowd Overflow / Bottleneck</option>
                <option value="Medical">Minor Injury / Medical Support</option>
                <option value="Security">Security Notice</option>
                <option value="Accessibility Issue">Accessibility Barrier</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Venue Location *</label>
              <select
                value={reportLocation}
                onChange={(e) => setReportLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-500"
              >
                {zones.map(z => (
                  <option key={z.id} value={z.id}>{z.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Issue Title *</label>
            <input
              type="text"
              placeholder="e.g. Spilled drink on walkway or loose handrail"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Additional Details (Optional)</label>
            <textarea
              rows={3}
              placeholder="Describe the issue..."
              value={reportNotes}
              onChange={(e) => setReportNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Report to Dispatch</span>
          </button>
        </form>
      </div>

    </div>
  );
};
