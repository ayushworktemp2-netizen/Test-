import React, { useState } from 'react';
import { useEventContext } from '../../context/EventContext';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export const IncidentManagement: React.FC = () => {
  const { incidents, updateIncidentStatus } = useEventContext();
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredIncidents = statusFilter === 'All'
    ? incidents
    : incidents.filter(i => i.status === statusFilter);

  const staffTeams = [
    'Paramedic Squad 1',
    'Paramedic Squad 2',
    'Security Patrol Desk A',
    'Janitorial Unit 2',
    'Crowd Safety Team B',
    'Accessibility Liaison'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="saas-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-xl">Safety Dispatch & Incident Queue</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">Review emergency panic SOS alerts, assign staff dispatch, and update ticket lifecycle</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          {['All', 'Open', 'In Progress', 'Resolved'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                statusFilter === st ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Incident Cards Queue */}
      <div className="space-y-4">
        {filteredIncidents.map(inc => {
          let severityBadge = 'bg-slate-100 text-slate-800';
          if (inc.severity === 'Critical') severityBadge = 'bg-rose-600 text-white font-bold animate-pulse';
          else if (inc.severity === 'High') severityBadge = 'bg-rose-100 text-rose-800';
          else if (inc.severity === 'Medium') severityBadge = 'bg-amber-100 text-amber-800';

          return (
            <div
              key={inc.id}
              className={`saas-card p-5 space-y-4 transition-all ${
                inc.severity === 'Critical' ? 'border-2 border-rose-400 bg-rose-50/20' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] uppercase ${severityBadge}`}>
                    {inc.severity} Severity
                  </span>
                  <span className="font-bold text-slate-900 text-base">Ticket #{inc.id}: {inc.title}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-mono">{inc.timestamp}</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                    inc.status === 'Open' ? 'bg-rose-100 text-rose-700' :
                    inc.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {inc.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Location</span>
                  <span className="font-bold text-slate-900">{inc.locationName}</span>
                </div>

                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Reporter</span>
                  <span className="font-bold text-slate-900">{inc.reporterName}</span>
                </div>

                <div>
                  <span className="text-slate-500 font-bold uppercase block text-[10px]">Assigned Staff</span>
                  <span className="font-bold text-indigo-600">{inc.assignedTeam || 'Unassigned'}</span>
                </div>
              </div>

              {inc.notes && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong>Notes:</strong> {inc.notes}
                </div>
              )}

              {/* Status Update & Staff Assignment Actions */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-slate-500 font-semibold">Assign Staff:</span>
                  <select
                    value={inc.assignedTeam || ''}
                    onChange={(e) => updateIncidentStatus(inc.id, inc.status, e.target.value)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold"
                  >
                    <option value="">Select Dispatch Team</option>
                    {staffTeams.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => updateIncidentStatus(inc.id, 'In Progress')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs"
                  >
                    Mark In Progress
                  </button>

                  <button
                    onClick={() => updateIncidentStatus(inc.id, 'Resolved')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve Ticket</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}

        {filteredIncidents.length === 0 && (
          <div className="saas-card p-12 text-center text-slate-500 space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
            <p className="text-sm font-bold">No safety incidents in this filter state.</p>
          </div>
        )}
      </div>

    </div>
  );
};
