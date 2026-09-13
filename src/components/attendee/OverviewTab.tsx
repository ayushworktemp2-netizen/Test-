import React from 'react';
import { useEventContext } from '../../context/EventContext';
import { 
  Clock, 
  MapPin, 
  Users, 
  BookmarkCheck, 
  Radio, 
  Sparkles, 
  ArrowRight,
  Bookmark
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { 
    sessions, 
    savedSessionIds, 
    toggleSaveSession, 
    zones, 
    setAttendeeTab, 
    setNavigationDestination 
  } = useEventContext();

  const savedSessionsCount = savedSessionIds.length;

  return (
    <div className="space-y-6">
      
      {/* KPI STAT CARDS (Prompt Section 4 Requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Event Status */}
        <div className="saas-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Event Status</span>
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
              Live Now
            </span>
            <p className="text-sm font-extrabold text-slate-900 mt-1">TechVerse Summit 2026</p>
          </div>
        </div>

        {/* Stat 2: Next Session */}
        <div className="saas-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Next Session</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm truncate">AI & Future of Work</h4>
            <p className="text-xs text-slate-500 font-semibold mt-0.5 flex items-center gap-1">
              <span>10:30 AM</span> &bull; <span>Hall A</span>
            </p>
          </div>
        </div>

        {/* Stat 3: Saved Sessions */}
        <div className="saas-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Saved Sessions</span>
            <BookmarkCheck className="w-4 h-4 text-violet-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{savedSessionsCount}</p>
          <p className="text-xs text-slate-500">Bookmarked in schedule</p>
        </div>

        {/* Stat 4: Event Attendance */}
        <div className="saas-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Event Attendance</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">12,480</p>
          <p className="text-xs text-emerald-600 font-semibold">+14% vs yesterday</p>
        </div>

      </div>

      {/* "WHAT'S HAPPENING NOW?" SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> What's happening now?
            </h2>
            <p className="text-xs text-slate-500">Live & upcoming sessions across venue halls</p>
          </div>

          <button
            onClick={() => setAttendeeTab('discovery')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            Browse All Sessions <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.slice(0, 3).map(session => {
            const isSaved = savedSessionIds.includes(session.id);
            const openRatio = Math.round((session.registeredSeats / session.totalSeats) * 100);

            return (
              <div key={session.id} className="saas-card p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                      {session.category}
                    </span>
                    <span className="font-semibold text-slate-500">{session.startTime}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">{session.title}</h3>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <img 
                      src={session.speaker.avatar} 
                      alt={session.speaker.name} 
                      className="w-7 h-7 rounded-full object-cover border"
                    />
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{session.speaker.name}</h5>
                      <p className="text-[11px] text-slate-500">{session.speaker.company}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Venue: <strong className="text-slate-800">{session.venueName}</strong></span>
                      <span className="font-bold text-slate-900">{openRatio}% seats booked</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600" style={{ width: `${openRatio}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      const zone = zones.find(z => z.id === session.venueId);
                      if (zone) {
                        setNavigationDestination(zone);
                        setAttendeeTab('map');
                      }
                    }}
                    className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Navigate</span>
                  </button>

                  <button
                    onClick={() => toggleSaveSession(session.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      isSaved ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5" /> Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" /> Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
