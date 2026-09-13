import React, { useState } from 'react';
import { useEventContext } from '../../context/EventContext';
import type { Session } from '../../types';
import { Plus, Edit2, Trash2, Calendar, Clock, MapPin, X } from 'lucide-react';

export const SessionManagement: React.FC = () => {
  const { sessions, zones, addSession, updateSession, deleteSession } = useEventContext();
  const [showModal, setShowModal] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    speakerName: '',
    speakerRole: '',
    speakerCompany: '',
    venueId: 'main-stage',
    category: 'Keynote' as Session['category'],
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    timeMinutes: 600,
    durationMinutes: 60,
    totalSeats: 250,
    registeredSeats: 100,
    status: 'Upcoming' as Session['status'],
    description: '',
    tags: 'Keynote, Tech'
  });

  const handleOpenAdd = () => {
    setEditingSession(null);
    setFormData({
      title: '',
      speakerName: '',
      speakerRole: 'Principal Architect',
      speakerCompany: 'Tech Corp',
      venueId: 'main-stage',
      category: 'Keynote',
      startTime: '02:00 PM',
      endTime: '03:00 PM',
      timeMinutes: 840,
      durationMinutes: 60,
      totalSeats: 250,
      registeredSeats: 45,
      status: 'Upcoming',
      description: 'Interactive session exploring venue automation and architecture.',
      tags: 'Tech, Future'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (session: Session) => {
    setEditingSession(session);
    setFormData({
      title: session.title,
      speakerName: session.speaker.name,
      speakerRole: session.speaker.role,
      speakerCompany: session.speaker.company,
      venueId: session.venueId,
      category: session.category,
      startTime: session.startTime,
      endTime: session.endTime,
      timeMinutes: session.timeMinutes,
      durationMinutes: session.durationMinutes,
      totalSeats: session.totalSeats,
      registeredSeats: session.registeredSeats,
      status: session.status,
      description: session.description,
      tags: session.tags.join(', ')
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const venue = zones.find(z => z.id === formData.venueId);

    const sessionPayload = {
      title: formData.title,
      speaker: {
        name: formData.speakerName,
        role: formData.speakerRole,
        company: formData.speakerCompany,
        avatar: editingSession?.speaker.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      },
      startTime: formData.startTime,
      endTime: formData.endTime,
      timeMinutes: Number(formData.timeMinutes),
      durationMinutes: Number(formData.durationMinutes),
      venueId: formData.venueId,
      venueName: venue?.name || 'General Hall',
      category: formData.category,
      totalSeats: Number(formData.totalSeats),
      registeredSeats: Number(formData.registeredSeats),
      status: formData.status,
      description: formData.description,
      tags: formData.tags.split(',').map(t => t.trim())
    };

    if (editingSession) {
      updateSession({ ...sessionPayload, id: editingSession.id });
    } else {
      addSession(sessionPayload);
    }

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="saas-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-slate-900 text-xl flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" /> Event Session Catalog Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Schedule keynotes, assign hall capacities, and manage speaker listings</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Session</span>
        </button>
      </div>

      {/* Sessions Table */}
      <div className="saas-card border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <th className="p-4">Title & Category</th>
                <th className="p-4">Speaker</th>
                <th className="p-4">Venue & Time</th>
                <th className="p-4">Seats / Cap</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sessions.map(session => (
                <tr key={session.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                      {session.category}
                    </span>
                    <h4 className="font-bold text-slate-900">{session.title}</h4>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900">{session.speaker.name}</div>
                    <div className="text-slate-500 text-[11px]">{session.speaker.company}</div>
                  </td>

                  <td className="p-4 space-y-0.5">
                    <div className="font-semibold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-600" />
                      {session.startTime} - {session.endTime}
                    </div>
                    <div className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-indigo-600" />
                      {session.venueName}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900">{session.registeredSeats} / {session.totalSeats}</div>
                    <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-indigo-600" style={{ width: `${(session.registeredSeats / session.totalSeats) * 100}%` }} />
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(session)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                        title="Edit Session"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete Session"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                {editingSession ? 'Edit Session' : 'Add New Session'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Session Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Speaker Name *</label>
                  <input
                    type="text"
                    value={formData.speakerName}
                    onChange={(e) => setFormData({ ...formData, speakerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Speaker Company</label>
                  <input
                    type="text"
                    value={formData.speakerCompany}
                    onChange={(e) => setFormData({ ...formData, speakerCompany: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Venue Hall *</label>
                  <select
                    value={formData.venueId}
                    onChange={(e) => setFormData({ ...formData, venueId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                  >
                    {zones.map(z => (
                      <option key={z.id} value={z.id}>{z.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Keynote">Keynote</option>
                    <option value="AI & Future Tech">AI & Future Tech</option>
                    <option value="Cloud & Architecture">Cloud & Architecture</option>
                    <option value="UX & Product">UX & Product</option>
                    <option value="Networking">Networking</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="text"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Time</label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Capacity</label>
                  <input
                    type="number"
                    value={formData.totalSeats}
                    onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Registered Seats</label>
                  <input
                    type="number"
                    value={formData.registeredSeats}
                    onChange={(e) => setFormData({ ...formData, registeredSeats: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md"
                >
                  Save Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
