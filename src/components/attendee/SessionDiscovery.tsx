import React, { useState } from 'react';
import { useEventContext } from '../../context/EventContext';
import { getRecommendedSessions } from '../../utils/rulesEngine';
import { 
  Search, 
  Filter, 
  Clock, 
  MapPin, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  Calendar
} from 'lucide-react';

export const SessionDiscovery: React.FC = () => {
  const { 
    sessions, 
    savedSessionIds, 
    toggleSaveSession, 
    zones, 
    setNavigationDestination, 
    setAttendeeTab 
  } = useEventContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVenue, setSelectedVenue] = useState<string>('All');

  const categories = ['All', 'Keynote', 'AI & Future Tech', 'Cloud & Architecture', 'UX & Product', 'Networking', 'Workshop'];
  
  const recommended = getRecommendedSessions(sessions, savedSessionIds);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          session.speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          session.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCat = selectedCategory === 'All' || session.category === selectedCategory;
    const matchesVenue = selectedVenue === 'All' || session.venueId === selectedVenue;

    return matchesSearch && matchesCat && matchesVenue;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Search Bar */}
      <div className="glass-card rounded-2xl p-6 border space-y-4">
        <div>
          <h2 className="font-bold text-slate-900 text-xl flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-600" /> Event Schedule & Discovery
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Explore keynotes, technical workshops, and networking lounge sessions</p>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sessions, speakers, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Venue Dropdown */}
          <div>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:border-violet-500"
            >
              <option value="All">All Locations & Halls</option>
              {zones.map(z => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
          </div>

          {/* Category Dropdown (mobile fallback) */}
          <div className="md:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:border-violet-500"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Desktop Category Chips */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-violet-600 text-white shadow-sm' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Rule-Based Recommendations Showcase */}
      {recommended.length > 0 && searchQuery === '' && selectedCategory === 'All' && (
        <div className="rounded-2xl bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 border border-violet-200/80 p-5 space-y-3">
          <div className="flex items-center gap-2 text-violet-800 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span>Smart Recommendations For You</span>
            <span className="text-[10px] bg-violet-200 text-violet-800 px-2 py-0.5 rounded font-mono">Rule Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommended.map(session => (
              <div key={session.id} className="bg-white p-4 rounded-xl border border-violet-100 shadow-sm space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wider">{session.category}</span>
                  <h4 className="font-bold text-slate-900 text-xs mt-0.5 line-clamp-2">{session.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{session.speaker.name} ({session.speaker.company})</p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-600 font-medium">{session.startTime}</span>
                  <button
                    onClick={() => toggleSaveSession(session.id)}
                    className="px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Bookmark className="w-3 h-3" /> Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSessions.map(session => {
          const isSaved = savedSessionIds.includes(session.id);
          const seatsLeft = session.totalSeats - session.registeredSeats;
          const isAlmostFull = seatsLeft < 50;

          return (
            <div
              key={session.id}
              className={`glass-card rounded-2xl p-5 border transition-all duration-200 hover:shadow-lg flex flex-col justify-between ${
                isSaved ? 'border-violet-300 bg-violet-50/20' : ''
              }`}
            >
              <div className="space-y-3">
                
                {/* Header Badge Row */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                    {session.category}
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    isAlmostFull ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {isAlmostFull ? `Only ${seatsLeft} seats left!` : `${seatsLeft} seats open`}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {session.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {session.description}
                </p>

                {/* Speaker Card */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <img 
                    src={session.speaker.avatar} 
                    alt={session.speaker.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200" 
                  />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">{session.speaker.name}</h5>
                    <p className="text-[11px] text-slate-500">{session.speaker.role} &bull; {session.speaker.company}</p>
                  </div>
                </div>

                {/* Location & Time info */}
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-violet-600" />
                    <span>{session.startTime} - {session.endTime} ({session.durationMinutes} mins)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{session.venueName}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const zone = zones.find(z => z.id === session.venueId);
                    if (zone) {
                      setNavigationDestination(zone);
                      setAttendeeTab('map');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View Room Map</span>
                </button>

                <button
                  onClick={() => toggleSaveSession(session.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSaved 
                      ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700' 
                      : 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="w-4 h-4" />
                      <span>Saved to Schedule</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Add to Schedule</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredSessions.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center text-slate-500 space-y-3">
          <Search className="w-10 h-10 mx-auto text-slate-300" />
          <h4 className="font-bold text-slate-800 text-base">No Sessions Found</h4>
          <p className="text-xs max-w-sm mx-auto">
            No events match your current search query or category filters. Try clearing your search parameters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedVenue('All'); }}
            className="px-4 py-2 bg-violet-100 text-violet-700 rounded-xl text-xs font-bold hover:bg-violet-200"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
