import React from 'react';
import { useEventContext } from '../../context/EventContext';
import { getAlternativeZone, getCrowdBadgeStyle } from '../../utils/rulesEngine';
import { 
  Users, 
  Clock, 
  Sparkles, 
  Compass
} from 'lucide-react';

export const CrowdStatusView: React.FC = () => {
  const { zones, setNavigationDestination, setAttendeeTab } = useEventContext();

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="saas-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-slate-900 text-xl flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" /> Live Crowd Status
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time spatial density telemetry, hall occupancies, and smart queue bypasses</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Live Telemetry Active</span>
        </div>
      </div>

      {/* Zone Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zones.map(zone => {
          const ratio = Math.round((zone.currentOccupancy / zone.capacity) * 100);
          const badgeStyle = getCrowdBadgeStyle(zone.crowdLevel);
          const alternative = getAlternativeZone(zone, zones);

          // Generate ascii-style or visual progress bar
          const filledBlocks = Math.round((ratio / 100) * 10);
          const emptyBlocks = 10 - filledBlocks;
          const barVisual = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

          return (
            <div key={zone.id} className="saas-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{zone.name}</h3>
                    <p className="text-xs text-slate-500">{zone.description}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                    {zone.crowdLevel}
                  </span>
                </div>

                {/* Progress Bar & Visual Metric */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600 font-mono tracking-wider">{barVisual}</span>
                    <span className="text-slate-900">{ratio}%</span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        ratio > 85 ? 'bg-rose-500' :
                        ratio > 65 ? 'bg-amber-500' :
                        ratio > 35 ? 'bg-sky-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-600">Est. Queue Wait:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    {zone.waitMinutes ? `${zone.waitMinutes} mins` : 'No Wait'}
                  </span>
                </div>

              </div>

              {/* RECOMMENDED ALTERNATIVE AREAS */}
              {alternative && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Recommended Alternative Area</span>
                  </div>
                  <p className="text-[11px] text-emerald-950">
                    Visit <strong>{alternative.name}</strong> ({alternative.crowdLevel} crowd, {alternative.waitMinutes || 0}m wait) for faster access.
                  </p>
                  <button
                    onClick={() => {
                      setNavigationDestination(alternative);
                      setAttendeeTab('map');
                    }}
                    className="text-emerald-700 font-bold hover:underline text-[11px] pt-1 block"
                  >
                    Route to {alternative.name.split(' ')[0]} &rarr;
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setNavigationDestination(zone);
                  setAttendeeTab('map');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>Simulate Route on Floorplan</span>
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
};
