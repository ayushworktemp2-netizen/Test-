import React from 'react';
import { useEventContext } from '../../context/EventContext';
import { getCrowdBadgeStyle } from '../../utils/rulesEngine';
import { Activity, Plus, Minus, Radio, Sparkles } from 'lucide-react';

export const LiveVenueMonitor: React.FC = () => {
  const { zones, updateZoneOccupancy, settings, updateSettings, triggerSimulatedEvent } = useEventContext();

  return (
    <div className="space-y-6">
      
      {/* Header & Simulation Control Bar */}
      <div className="saas-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-xl">Live Venue Monitor & Density Control</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">Real-time floorplan telemetry, crowd gauges, and live demo density modifiers</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerSimulatedEvent}
            className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Surge Demo</span>
          </button>

          <button
            onClick={() => updateSettings({ simulationActive: !settings.simulationActive })}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              settings.simulationActive ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Auto Simulation: {settings.simulationActive ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Zone Occupancy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map(zone => {
          const ratio = Math.round((zone.currentOccupancy / zone.capacity) * 100);
          const badgeStyle = getCrowdBadgeStyle(zone.crowdLevel);

          return (
            <div key={zone.id} className="saas-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{zone.name}</h3>
                    <p className="text-xs text-slate-500">{zone.category.toUpperCase()} &bull; Cap: {zone.capacity}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                    {zone.crowdLevel}
                  </span>
                </div>

                {/* Progress Gauge */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">Current Load</span>
                    <span className="text-slate-900">{zone.currentOccupancy} ({ratio}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        ratio > 85 ? 'bg-rose-500' : ratio > 65 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Queue Wait Time: <strong className="text-slate-900">{zone.waitMinutes || 0} minutes</strong>
                </div>
              </div>

              {/* Live Demo Manual Modifier */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-medium text-[11px]">Manual Override:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateZoneOccupancy(zone.id, Math.max(0, zone.currentOccupancy - 50))}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Decrease 50 attendees"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => updateZoneOccupancy(zone.id, Math.min(zone.capacity, zone.currentOccupancy + 50))}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Increase 50 attendees"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
