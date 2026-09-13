import React, { useState } from 'react';
import { useEventContext } from '../../context/EventContext';
import { Settings, Save } from 'lucide-react';

export const EventSettings: React.FC = () => {
  const { settings, updateSettings } = useEventContext();

  const [formData, setFormData] = useState({
    eventName: settings.eventName,
    eventSubtitle: settings.eventSubtitle,
    startDate: settings.startDate,
    endDate: settings.endDate,
    venueName: settings.venueName,
    totalCapacity: settings.totalCapacity,
    emergencyHotline: settings.emergencyHotline,
    securityDesk: settings.securityDesk
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...formData,
      totalCapacity: Number(formData.totalCapacity)
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="saas-card p-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-xl">Event Configuration & Hotline Settings</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">Configure baseline event parameters, emergency dispatches, and capacity caps</p>
        </div>
      </div>

      <div className="saas-card p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Event Name *</label>
              <input
                type="text"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Venue Hall / Center Name *</label>
              <input
                type="text"
                value={formData.venueName}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Event Tagline / Subtitle</label>
            <input
              type="text"
              value={formData.eventSubtitle}
              onChange={(e) => setFormData({ ...formData, eventSubtitle: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Max Venue Capacity Cap</label>
              <input
                type="number"
                value={formData.totalCapacity}
                onChange={(e) => setFormData({ ...formData, totalCapacity: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Paramedic Emergency Hotline</label>
              <input
                type="text"
                value={formData.emergencyHotline}
                onChange={(e) => setFormData({ ...formData, emergencyHotline: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Security Command Desk Extension</label>
              <input
                type="text"
                value={formData.securityDesk}
                onChange={(e) => setFormData({ ...formData, securityDesk: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Event Settings</span>
          </button>
        </form>
      </div>

    </div>
  );
};
