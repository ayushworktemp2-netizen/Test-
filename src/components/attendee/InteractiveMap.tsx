import React, { useState, useEffect } from 'react';
import { useEventContext } from '../../context/EventContext';
import type { VenueZone, NavigationRoute } from '../../types';
import { calculateNavigationRoute, getCrowdBadgeStyle } from '../../utils/rulesEngine';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Accessibility, 
  Clock, 
  X, 
  Search,
  Plus,
  Minus,
  RotateCcw
} from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { 
    zones, 
    selectedMapZone, 
    setSelectedMapZone, 
    navigationDestination, 
    setNavigationDestination,
    settings,
    updateSettings
  } = useEventContext();

  const [originZoneId, setOriginZoneId] = useState<string>('main-gate');
  const [activeRoute, setActiveRoute] = useState<NavigationRoute | null>(null);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [searchMap, setSearchMap] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Sync navigationDestination from global state
  useEffect(() => {
    if (navigationDestination) {
      handleCalculateRoute(navigationDestination.id);
    }
  }, [navigationDestination]);

  const originZone = zones.find(z => z.id === originZoneId) || zones[8];

  const handleSelectZone = (zone: VenueZone) => {
    setSelectedMapZone(zone);
  };

  const handleCalculateRoute = (targetZoneId: string) => {
    const targetZone = zones.find(z => z.id === targetZoneId);
    if (!targetZone || targetZone.id === originZone.id) return;

    const route = calculateNavigationRoute(originZone, targetZone, settings.wheelchairRouteOnly);
    setActiveRoute(route);
    setIsNavigating(true);
    setNavigationDestination(targetZone);
  };

  const clearRoute = () => {
    setActiveRoute(null);
    setIsNavigating(false);
    setNavigationDestination(null);
  };

  const filteredZones = searchMap.trim() === ''
    ? zones
    : zones.filter(z => z.name.toLowerCase().includes(searchMap.toLowerCase()) || z.category.toLowerCase().includes(searchMap.toLowerCase()));

  return (
    <div className="space-y-6">
      
      {/* Top Floating Map Control Panel */}
      <div className="saas-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search location */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search venue map (e.g. Stage, Food)..."
            value={searchMap}
            onChange={(e) => setSearchMap(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Floating Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end text-xs">
          
          {/* My Location dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-slate-700">My Location:</span>
            <select
              value={originZoneId}
              onChange={(e) => setOriginZoneId(e.target.value)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none text-xs"
            >
              {zones.map(z => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
          </div>

          {/* Accessible Route Toggle */}
          <button
            onClick={() => {
              const newVal = !settings.wheelchairRouteOnly;
              updateSettings({ wheelchairRouteOnly: newVal });
              if (navigationDestination) {
                const route = calculateNavigationRoute(originZone, navigationDestination, newVal);
                setActiveRoute(route);
              }
            }}
            className={`px-3 py-1.5 rounded-xl font-bold border flex items-center gap-1.5 transition-all ${
              settings.wheelchairRouteOnly 
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Accessibility className="w-4 h-4" />
            <span>Accessible Route: {settings.wheelchairRouteOnly ? 'ON' : 'OFF'}</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
              className="p-1 rounded-lg hover:bg-white text-slate-700"
              title="Zoom In"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[10px] px-1 font-bold">{Math.round(zoomLevel * 100)}%</span>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
              className="p-1 rounded-lg hover:bg-white text-slate-700"
              title="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setZoomLevel(1)}
              className="p-1 rounded-lg hover:bg-white text-slate-700"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Main Floorplan Surface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Vector Map Canvas Container */}
        <div className="lg:col-span-2 saas-card p-4 sm:p-6 border relative overflow-hidden bg-[#F8FAFC] text-slate-900 min-h-[480px]">
          
          {/* Header Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-xs">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-800">Venue Floorplan Layout</span>
            {isNavigating && (
              <span className="bg-indigo-600 px-2 py-0.5 rounded-md text-[10px] text-white font-bold animate-pulse">
                NAVIGATING
              </span>
            )}
          </div>

          {/* Color-Coded Map Legend (Prompt requirement: Green = Low, Amber = Moderate, Orange = Busy, Red = Very Busy) */}
          <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 text-xs shadow-xs">
            <span className="flex items-center gap-1 font-semibold text-slate-700"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Green = Low</span>
            <span className="flex items-center gap-1 font-semibold text-slate-700"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Amber = Moderate</span>
            <span className="flex items-center gap-1 font-semibold text-slate-700"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Orange = Busy</span>
            <span className="flex items-center gap-1 font-semibold text-slate-700"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Red = Very Busy</span>
          </div>

          {/* SVG Canvas Container with Zoom Transform */}
          <div 
            className="w-full h-full min-h-[420px] transition-transform duration-300 origin-center flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg className="w-full h-full min-h-[400px] select-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              
              {/* Grid Floor Pattern */}
              <defs>
                <pattern id="venueGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#venueGrid)" />

              {/* Venue Outer Walls */}
              <rect x="4" y="4" width="92" height="92" rx="4" fill="none" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="3 3" />

              {/* Animated Route Path */}
              {activeRoute && (
                <g>
                  <path 
                    d={activeRoute.svgPathPoints} 
                    fill="none" 
                    stroke={settings.wheelchairRouteOnly ? "#0284C7" : "#6366F1"} 
                    strokeWidth="2.5" 
                    className="animate-route-path"
                  />
                  <circle r="2" fill="#F43F5E">
                    <animateMotion path={activeRoute.svgPathPoints} dur="3s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}

              {/* Room Nodes */}
              {filteredZones.map(zone => {
                const isSelected = selectedMapZone?.id === zone.id;
                const isDestination = navigationDestination?.id === zone.id;
                const isOrigin = originZoneId === zone.id;

                // Color-coded status per user requirements
                let nodeColor = '#10B981'; // Green = Low
                if (zone.crowdLevel === 'Moderate') nodeColor = '#0EA5E9'; // Amber/Sky
                if (zone.crowdLevel === 'Busy') nodeColor = '#F59E0B'; // Orange/Amber
                if (zone.crowdLevel === 'Very Busy') nodeColor = '#F43F5E'; // Red

                return (
                  <g 
                    key={zone.id} 
                    transform={`translate(${zone.x}, ${zone.y})`}
                    className="cursor-pointer group"
                    onClick={() => handleSelectZone(zone)}
                  >
                    {/* Selected location glows subtly */}
                    {(isSelected || isDestination) && (
                      <circle r="7" fill={nodeColor} opacity="0.3" className="animate-ping" />
                    )}

                    {/* Room Footprint box */}
                    <rect 
                      x="-7" 
                      y="-4.5" 
                      width="14" 
                      height="9" 
                      rx="2" 
                      fill={isSelected ? '#4F46E5' : '#FFFFFF'} 
                      stroke={isDestination ? '#EC4899' : isOrigin ? '#06B6D4' : nodeColor} 
                      strokeWidth={isSelected || isDestination ? '1.5' : '1'}
                      className="shadow-md transition-all duration-200 group-hover:scale-105"
                    />

                    {/* Marker dot */}
                    <circle r="2" fill={isSelected ? '#FFFFFF' : nodeColor} y="-1" />

                    {/* Label */}
                    <text 
                      y="8" 
                      textAnchor="middle" 
                      fill="#0F172A" 
                      fontSize="2.4" 
                      fontWeight="bold"
                      className="pointer-events-none font-sans"
                    >
                      {zone.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}

            </svg>
          </div>

        </div>

        {/* Bottom / Right Information Card & Navigation Drawer */}
        <div className="space-y-4">
          
          {/* Active Navigation Steps Panel */}
          {isNavigating && activeRoute && (
            <div className="saas-card p-5 border-2 border-indigo-200 bg-indigo-50/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                  <Navigation className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Navigation Active</span>
                </div>
                <button onClick={clearRoute} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white border border-slate-200 text-center">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Walking Time</p>
                  <p className="text-lg font-extrabold text-slate-900 flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    {activeRoute.estimatedMinutes} min walk
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Distance</p>
                  <p className="text-lg font-extrabold text-slate-900">{activeRoute.distanceMeters} m</p>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-700 uppercase">Directions</h5>
                <ol className="space-y-1.5 text-xs text-slate-600">
                  {activeRoute.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-100">
                      <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Selected Location Bottom/Right Info Card (Prompt Requirement) */}
          {selectedMapZone ? (
            <div className="saas-card p-5 space-y-4 border-2 border-indigo-100 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getCrowdBadgeStyle(selectedMapZone.crowdLevel).bg} ${getCrowdBadgeStyle(selectedMapZone.crowdLevel).text} ${getCrowdBadgeStyle(selectedMapZone.crowdLevel).border}`}>
                    {selectedMapZone.crowdLevel} crowd
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg mt-1">{selectedMapZone.name}</h3>
                </div>
                <button onClick={() => setSelectedMapZone(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{selectedMapZone.description}</p>

              {/* Exact format required: "Main Stage" | "2 min walk" | "Moderate crowd" | [ Navigate Me ] */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Est. Walk</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {calculateNavigationRoute(originZone, selectedMapZone).estimatedMinutes} min walk
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Current Occupancy</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {selectedMapZone.currentOccupancy} / {selectedMapZone.capacity}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCalculateRoute(selectedMapZone.id)}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate Me</span>
              </button>
            </div>
          ) : (
            <div className="saas-card p-6 text-center space-y-3 text-slate-500">
              <MapPin className="w-8 h-8 mx-auto text-indigo-500 animate-bounce" />
              <h4 className="font-bold text-slate-800 text-sm">Select Any Location on Floorplan</h4>
              <p className="text-xs">
                Click any room box on the map to inspect live crowd density, amenities, or simulate turn-by-turn routing.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
