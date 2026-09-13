import React, { useState } from 'react';
import { useEventContext } from '../../context/EventContext';
import { Bell, AlertOctagon, AlertTriangle, Info, Radio } from 'lucide-react';

export const LiveUpdatesFeed: React.FC = () => {
  const { announcements } = useEventContext();
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  const filteredAnnouncements = priorityFilter === 'All'
    ? announcements
    : announcements.filter(a => a.priority === priorityFilter);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-100 text-violet-700">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <h2 className="font-bold text-slate-900 text-xl">Live Event Broadcasts</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">Real-time organizer alerts, room change notices, and schedule updates</p>
        </div>

        {/* Priority Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          {['All', 'Emergency', 'Important', 'General'].map(priority => (
            <button
              key={priority}
              onClick={() => setPriorityFilter(priority)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                priorityFilter === priority ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Broadcast Feed */}
      <div className="space-y-4">
        {filteredAnnouncements.map(item => {
          let badgeColor = 'bg-sky-100 text-sky-800 border-sky-300';
          let Icon = Info;

          if (item.priority === 'Important') {
            badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
            Icon = AlertTriangle;
          } else if (item.priority === 'Emergency') {
            badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
            Icon = AlertOctagon;
          }

          return (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-5 border hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${badgeColor}`}>
                    <Icon className="w-3 h-3" />
                    {item.priority} Priority
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{item.timestamp}</span>
                </div>
                <span className="text-[11px] text-slate-500">Target: {item.targetAudience}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs text-slate-700 leading-relaxed">{item.message}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Published by: {item.publishedBy}</span>
                <span className="flex items-center gap-1"><Radio className="w-3 h-3 text-emerald-500" /> Live Stream</span>
              </div>
            </div>
          );
        })}

        {filteredAnnouncements.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center text-slate-500 space-y-2">
            <Bell className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-bold">No announcements in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
};
