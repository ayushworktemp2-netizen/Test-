import React from 'react';
import { useEventContext } from '../../context/EventContext';
import { detectScheduleConflicts } from '../../utils/rulesEngine';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Trash2, 
  Bookmark, 
  Compass
} from 'lucide-react';

export const PersonalSchedule: React.FC = () => {
  const { 
    sessions, 
    savedSessionIds, 
    toggleSaveSession, 
    zones, 
    setNavigationDestination, 
    setAttendeeTab 
  } = useEventContext();

  const savedSessions = sessions
    .filter(s => savedSessionIds.includes(s.id))
    .sort((a, b) => a.timeMinutes - b.timeMinutes);

  // Conflict Detection Engine
  const conflicts = detectScheduleConflicts(savedSessions);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900 text-xl flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-600" /> My Personal Event Itinerary
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Bookmarked talks, hands-on labs, and networking appointments ({savedSessions.length} total)
          </p>
        </div>

        <button
          onClick={() => setAttendeeTab('discovery')}
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Bookmark className="w-4 h-4" />
          <span>Add More Sessions</span>
        </button>
      </div>

      {/* OVERLAP / CONFLICT WARNING BANNER */}
      {conflicts.length > 0 && (
        <div className="rounded-2xl bg-rose-50 border-2 border-rose-400 p-5 text-rose-950 space-y-3 shadow-md animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
            <AlertTriangle className="w-5 h-5 text-rose-600 animate-bounce" />
            <span>SCHEDULE OVERLAP DETECTED!</span>
          </div>

          <p className="text-xs text-rose-900 leading-relaxed">
            You have bookmarked multiple sessions that take place at the same time. Review your itinerary below to resolve conflicts:
          </p>

          <div className="space-y-2">
            {conflicts.map((pair, idx) => (
              <div key={idx} className="bg-white/90 p-3 rounded-xl border border-rose-200 text-xs space-y-1">
                <span className="font-bold text-rose-700">Conflict #{idx + 1}:</span>
                <div className="flex flex-col sm:flex-row justify-between font-medium text-slate-800 gap-1">
                  <span>&bull; "{pair.sessionA.title}" ({pair.sessionA.startTime})</span>
                  <span className="text-rose-500 font-bold hidden sm:inline">vs</span>
                  <span>&bull; "{pair.sessionB.title}" ({pair.sessionB.startTime})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline List */}
      {savedSessions.length > 0 ? (
        <div className="relative border-l-2 border-violet-200 ml-4 pl-6 space-y-6 py-2">
          
          {savedSessions.map(session => {
            const hasConflict = conflicts.some(c => c.sessionA.id === session.id || c.sessionB.id === session.id);

            return (
              <div key={session.id} className="relative group">
                
                {/* Timeline node dot */}
                <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 ${
                  hasConflict ? 'bg-rose-500 border-white ring-4 ring-rose-200 animate-pulse' : 'bg-violet-600 border-white ring-4 ring-violet-100'
                }`} />

                {/* Session Card */}
                <div className={`glass-card rounded-2xl p-5 border transition-all hover:shadow-md space-y-3 ${
                  hasConflict ? 'border-rose-300 bg-rose-50/10' : ''
                }`}>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-violet-700">
                      <Clock className="w-4 h-4" />
                      <span>{session.startTime} - {session.endTime} ({session.durationMinutes} mins)</span>
                      {hasConflict && (
                        <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] font-bold">
                          TIME OVERLAP
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{session.category}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">{session.title}</h3>
                    <p className="text-xs text-slate-600">{session.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="w-4 h-4 text-violet-600" />
                      <span className="font-semibold text-slate-800">{session.venueName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const zone = zones.find(z => z.id === session.venueId);
                          if (zone) {
                            setNavigationDestination(zone);
                            setAttendeeTab('map');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Route on Map</span>
                      </button>

                      <button
                        onClick={() => toggleSaveSession(session.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove from Schedule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center text-slate-500 space-y-4">
          <Calendar className="w-12 h-12 mx-auto text-slate-300" />
          <h3 className="font-bold text-slate-800 text-lg">Your Schedule is Empty</h3>
          <p className="text-xs max-w-sm mx-auto">
            You haven't bookmarked any talks or workshops yet. Browse the event catalog to curate your day!
          </p>
          <button
            onClick={() => setAttendeeTab('discovery')}
            className="px-6 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-700 shadow-md"
          >
            Explore Event Sessions &rarr;
          </button>
        </div>
      )}

    </div>
  );
};
