import React from 'react';
import { useEventContext } from '../../context/EventContext';
import { 
  Accessibility, 
  Eye, 
  Type, 
  VolumeX, 
  Hand, 
  Compass, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const AccessibilityCenter: React.FC = () => {
  const { settings, updateSettings, zones, setNavigationDestination, setAttendeeTab } = useEventContext();

  const accessibleZones = zones.filter(z => z.accessibleRamp || z.elevatorAvailable || z.quietZone || z.signLanguageSupport);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="saas-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-slate-900 text-xl flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-indigo-600" /> Universal Accessibility Hub
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Customize visual themes, set wheelchair route rules, and locate quiet zones & interpreters.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>ADA & WCAG 2.1 Compliant</span>
        </div>
      </div>

      {/* Feature Toggles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Toggle 1: High Contrast */}
        <div className="saas-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-yellow-400 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <button
              onClick={() => updateSettings({ highContrastEnabled: !settings.highContrastEnabled })}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                settings.highContrastEnabled ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.highContrastEnabled ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">High Contrast Mode</h4>
            <p className="text-xs text-slate-500 mt-0.5">Inverts background to pitch black with high luminescence text.</p>
          </div>
        </div>

        {/* Toggle 2: Larger Text */}
        <div className="saas-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Type className="w-5 h-5" />
            </div>
            <button
              onClick={() => updateSettings({ largeTextEnabled: !settings.largeTextEnabled })}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                settings.largeTextEnabled ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.largeTextEnabled ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Larger Text</h4>
            <p className="text-xs text-slate-500 mt-0.5">Scales all dashboard text fonts for enhanced readability.</p>
          </div>
        </div>

        {/* Toggle 3: Wheelchair Routes */}
        <div className="saas-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Accessibility className="w-5 h-5" />
            </div>
            <button
              onClick={() => updateSettings({ wheelchairRouteOnly: !settings.wheelchairRouteOnly })}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                settings.wheelchairRouteOnly ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.wheelchairRouteOnly ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Wheelchair Routes Only</h4>
            <p className="text-xs text-slate-500 mt-0.5">Forces all venue maps to route strictly via ramps and elevators.</p>
          </div>
        </div>

      </div>

      {/* Accessible Locations & Amenities List */}
      <div className="saas-card p-6 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" /> Ramps, Elevators & Quiet Sensory Rooms
          </h3>
          <p className="text-xs text-slate-500">Venue halls equipped with dedicated accessibility infrastructure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accessibleZones.map(zone => (
            <div key={zone.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">{zone.name}</h4>
                <button
                  onClick={() => {
                    setNavigationDestination(zone);
                    setAttendeeTab('map');
                  }}
                  className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold flex items-center gap-1"
                >
                  <Compass className="w-3 h-3" /> Map
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {zone.accessibleRamp && (
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold">
                    Ramps Available
                  </span>
                )}
                {zone.elevatorAvailable && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-semibold">
                    Elevator Stop
                  </span>
                )}
                {zone.signLanguageSupport && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                    <Hand className="w-3 h-3" /> ASL Sign-Language
                  </span>
                )}
                {zone.quietZone && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-semibold flex items-center gap-1">
                    <VolumeX className="w-3 h-3" /> Quiet Sensory Zone
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
