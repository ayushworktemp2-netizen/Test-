import React, { useState } from 'react';
import { useEventContext } from '../../context/EventContext';
import type { Announcement } from '../../types';
import { Radio, Send, Trash2, Bell } from 'lucide-react';

export const AnnouncementManagement: React.FC = () => {
  const { announcements, addAnnouncement, deleteAnnouncement } = useEventContext();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<Announcement['priority']>('Important');
  const [targetAudience, setTargetAudience] = useState<Announcement['targetAudience']>('All Attendees');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    addAnnouncement({
      title,
      message,
      priority,
      targetAudience,
      publishedBy: 'Organizer Command Staff'
    });

    setTitle('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="saas-card p-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Radio className="w-5 h-5" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-xl">Broadcast Announcement Center</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">Publish real-time push notices, room changes, and safety alerts to attendee screens</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Broadcast Form */}
        <div className="lg:col-span-1 saas-card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Send className="w-4 h-4 text-indigo-600" /> New Broadcast
          </h3>

          <form onSubmit={handlePublish} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Announcement Title *</label>
              <input
                type="text"
                placeholder="e.g. Free Coffee at Networking Hall"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="General">General Information</option>
                <option value="Important">Important Schedule Notice</option>
                <option value="Emergency">Emergency Hazard</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
              >
                <option value="All Attendees">All Attendees (App-wide)</option>
                <option value="Main Hall">Main Stage (Auditorium A)</option>
                <option value="Workshop Track">Workshop Track Rooms</option>
                <option value="VIP">VIP & Press Lounge</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Broadcast Message Content *</label>
              <textarea
                rows={4}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4" />
              <span>Broadcast Now</span>
            </button>
          </form>
        </div>

        {/* Sent Announcements Log */}
        <div className="lg:col-span-2 saas-card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" /> Broadcast History & Active Feed ({announcements.length})
          </h3>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                      ann.priority === 'Emergency' ? 'bg-rose-100 text-rose-800' :
                      ann.priority === 'Important' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'
                    }`}>
                      {ann.priority}
                    </span>
                    <span className="font-bold text-slate-900">{ann.title}</span>
                  </div>

                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Retract Announcement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600">{ann.message}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Audience: {ann.targetAudience}</span>
                  <span>Sent at: {ann.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
