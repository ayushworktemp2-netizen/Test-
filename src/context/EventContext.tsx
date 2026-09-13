import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  ViewMode, 
  AttendeeTab, 
  OrganizerTab, 
  VenueZone, 
  Session, 
  Announcement, 
  IncidentReport, 
  EventSettingsData, 
  ToastMessage,
  CrowdLevel,
  UserProfile
} from '../types';
import { 
  initialVenueZones, 
  initialSessions, 
  initialAnnouncements, 
  initialIncidents, 
  initialEventSettings 
} from '../data/mockData';

const sampleAttendee: UserProfile = {
  id: 'usr-attendee-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@attendee.demo',
  role: 'attendee',
  avatar: 'AR',
  title: 'All-Access Pass Holder'
};

const sampleOrganizer: UserProfile = {
  id: 'usr-organizer-1',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@organizer.demo',
  role: 'organizer',
  avatar: 'SJ',
  title: 'Director of Event Operations'
};

interface EventContextType {
  viewMode: ViewMode;
  setViewMode: (view: ViewMode) => void;
  attendeeTab: AttendeeTab;
  setAttendeeTab: (tab: AttendeeTab) => void;
  organizerTab: OrganizerTab;
  setOrganizerTab: (tab: OrganizerTab) => void;
  
  currentUser: UserProfile | null;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  loginModalRole: 'attendee' | 'organizer';
  openLoginModal: (role?: 'attendee' | 'organizer') => void;
  loginAsDemoUser: (role: 'attendee' | 'organizer') => void;
  loginCustomUser: (name: string, email: string, role: 'attendee' | 'organizer') => void;
  logoutUser: () => void;

  isAccessRestrictedModalOpen: boolean;
  setIsAccessRestrictedModalOpen: (open: boolean) => void;
  isSplashLoading: boolean;

  zones: VenueZone[];
  sessions: Session[];
  savedSessionIds: string[];
  announcements: Announcement[];
  incidents: IncidentReport[];
  settings: EventSettingsData;
  toasts: ToastMessage[];
  
  selectedMapZone: VenueZone | null;
  setSelectedMapZone: (zone: VenueZone | null) => void;
  navigationDestination: VenueZone | null;
  setNavigationDestination: (zone: VenueZone | null) => void;
  
  toggleSaveSession: (sessionId: string) => void;
  addSession: (session: Omit<Session, 'id'>) => void;
  updateSession: (session: Session) => void;
  deleteSession: (sessionId: string) => void;
  
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'timestamp'>) => void;
  deleteAnnouncement: (id: string) => void;
  
  reportIncident: (incident: Omit<IncidentReport, 'id' | 'timestamp' | 'status'>) => void;
  updateIncidentStatus: (id: string, status: IncidentReport['status'], assignedTeam?: string) => void;
  
  updateSettings: (newSettings: Partial<EventSettingsData>) => void;
  updateZoneOccupancy: (zoneId: string, newOccupancy: number) => void;
  
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  
  triggerSimulatedEvent: () => void;
  resetAllData: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSplashLoading, setIsSplashLoading] = useState<boolean>(true);

  // User session state (always defaults to null on fresh load/refresh to enforce Login Screen entry)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [viewModeState, setViewModeState] = useState<ViewMode>('auth');

  useEffect(() => {
    // Clear any previous session on page load/refresh
    localStorage.removeItem('eventora_current_user');
    
    const timer = setTimeout(() => {
      setIsSplashLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const [attendeeTab, setAttendeeTab] = useState<AttendeeTab>('overview');
  const [organizerTab, setOrganizerTab] = useState<OrganizerTab>('overview');

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginModalRole, setLoginModalRole] = useState<'attendee' | 'organizer'>('attendee');
  const [isAccessRestrictedModalOpen, setIsAccessRestrictedModalOpen] = useState<boolean>(false);

  // Strict Role-Based Route Guard & ViewMode setter
  const setViewMode = (targetView: ViewMode) => {
    if (!currentUser) {
      setViewModeState('auth');
      return;
    }

    if (currentUser.role === 'attendee') {
      if (targetView === 'organizer') {
        setIsAccessRestrictedModalOpen(true);
        return;
      }
      setViewModeState(targetView);
      return;
    }

    if (currentUser.role === 'organizer') {
      if (targetView === 'attendee' || targetView === 'landing') {
        setViewModeState('organizer');
        return;
      }
      setViewModeState(targetView);
      return;
    }

    setViewModeState(targetView);
  };

  
  // Persistent state in LocalStorage
  const [zones, setZones] = useState<VenueZone[]>(() => {
    const local = localStorage.getItem('eventora_zones');
    return local ? JSON.parse(local) : initialVenueZones;
  });
  
  const [sessions, setSessions] = useState<Session[]>(() => {
    const local = localStorage.getItem('eventora_sessions');
    return local ? JSON.parse(local) : initialSessions;
  });

  const [savedSessionIds, setSavedSessionIds] = useState<string[]>(() => {
    const local = localStorage.getItem('eventora_saved_sessions');
    return local ? JSON.parse(local) : ['sess-1', 'sess-3'];
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const local = localStorage.getItem('eventora_announcements');
    return local ? JSON.parse(local) : initialAnnouncements;
  });

  const [incidents, setIncidents] = useState<IncidentReport[]>(() => {
    const local = localStorage.getItem('eventora_incidents');
    return local ? JSON.parse(local) : initialIncidents;
  });

  const [settings, setSettings] = useState<EventSettingsData>(() => {
    const local = localStorage.getItem('eventora_settings');
    return local ? JSON.parse(local) : initialEventSettings;
  });

  const [selectedMapZone, setSelectedMapZone] = useState<VenueZone | null>(null);
  const [navigationDestination, setNavigationDestination] = useState<VenueZone | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eventora_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eventora_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('eventora_zones', JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    localStorage.setItem('eventora_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('eventora_saved_sessions', JSON.stringify(savedSessionIds));
  }, [savedSessionIds]);

  useEffect(() => {
    localStorage.setItem('eventora_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('eventora_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('eventora_settings', JSON.stringify(settings));
  }, [settings]);

  // Real-time Simulation Engine Ticker
  useEffect(() => {
    if (!settings.simulationActive) return;

    const interval = setInterval(() => {
      setZones(prevZones => 
        prevZones.map(zone => {
          const delta = Math.floor((Math.random() - 0.48) * 12);
          const newOcc = Math.max(10, Math.min(zone.capacity, zone.currentOccupancy + delta));
          const ratio = newOcc / zone.capacity;
          
          let crowdLevel: CrowdLevel = 'Low';
          if (ratio > 0.85) crowdLevel = 'Very Busy';
          else if (ratio > 0.65) crowdLevel = 'Busy';
          else if (ratio > 0.35) crowdLevel = 'Moderate';

          const waitMinutes = crowdLevel === 'Very Busy' ? Math.floor(12 + Math.random() * 10) :
                            crowdLevel === 'Busy' ? Math.floor(5 + Math.random() * 6) :
                            crowdLevel === 'Moderate' ? Math.floor(2 + Math.random() * 3) : 0;

          return {
            ...zone,
            currentOccupancy: newOcc,
            crowdLevel,
            waitMinutes
          };
        })
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [settings.simulationActive]);

  // Toast notifier helper
  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openLoginModal = (role: 'attendee' | 'organizer' = 'attendee') => {
    setLoginModalRole(role);
    setIsLoginModalOpen(true);
  };

  const loginAsDemoUser = (role: 'attendee' | 'organizer') => {
    if (role === 'attendee') {
      setCurrentUser(sampleAttendee);
      setViewModeState('landing');
      setAttendeeTab('overview');
      addToast('Authenticated as Attendee', 'Welcome back, Alex Rivera!', 'success');
    } else {
      setCurrentUser(sampleOrganizer);
      setViewModeState('organizer');
      setOrganizerTab('overview');
      addToast('Authenticated as Organizer', 'Welcome, Sarah Jenkins (Operations Director)!', 'info');
    }
    setIsLoginModalOpen(false);
    setIsAccessRestrictedModalOpen(false);
  };

  const loginCustomUser = (name: string, email: string, role: 'attendee' | 'organizer') => {
    const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'US';
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role,
      avatar,
      title: role === 'attendee' ? 'Registered Attendee' : 'Event Operations Manager'
    };
    setCurrentUser(newUser);
    if (role === 'attendee') {
      setViewModeState('landing');
      setAttendeeTab('overview');
    } else {
      setViewModeState('organizer');
      setOrganizerTab('overview');
    }
    addToast(`Welcome, ${name}!`, `Account activated as ${role === 'attendee' ? 'Attendee' : 'Organizer'}.`, 'success');
    setIsLoginModalOpen(false);
    setIsAccessRestrictedModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('eventora_current_user');
    setViewModeState('auth');
    addToast('Logged Out', 'Returned to welcome authentication screen.', 'info');
  };

  const toggleSaveSession = (sessionId: string) => {
    setSavedSessionIds(prev => {
      const exists = prev.includes(sessionId);
      if (exists) {
        addToast('Schedule Updated', 'Session removed from your personal schedule.', 'info');
        return prev.filter(id => id !== sessionId);
      } else {
        const session = sessions.find(s => s.id === sessionId);
        addToast('Session Saved!', `Added "${session?.title || 'Session'}" to your schedule.`, 'success');
        return [...prev, sessionId];
      }
    });
  };

  const addSession = (sessionData: Omit<Session, 'id'>) => {
    const newId = 'sess-' + Date.now();
    const newSession: Session = { ...sessionData, id: newId };
    setSessions(prev => [newSession, ...prev]);
    addToast('Session Added', `Created new session "${newSession.title}".`, 'success');
  };

  const updateSession = (updated: Session) => {
    setSessions(prev => prev.map(s => s.id === updated.id ? updated : s));
    addToast('Session Updated', `Saved changes to "${updated.title}".`, 'info');
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    setSavedSessionIds(prev => prev.filter(id => id !== sessionId));
    addToast('Session Deleted', 'The session has been removed.', 'warning');
  };

  const addAnnouncement = (data: Omit<Announcement, 'id' | 'timestamp'>) => {
    const newAnnouncement: Announcement = {
      ...data,
      id: 'ann-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    addToast('Broadcast Sent!', `Published priority announcement: ${newAnnouncement.title}`, 'info');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    addToast('Announcement Retracted', 'The announcement was removed from feeds.', 'warning');
  };

  const reportIncident = (data: Omit<IncidentReport, 'id' | 'timestamp' | 'status'>) => {
    const newIncident: IncidentReport = {
      ...data,
      id: 'inc-' + Math.floor(100 + Math.random() * 900),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Open'
    };
    setIncidents(prev => [newIncident, ...prev]);
    if (data.type === 'SOS Alert') {
      addToast('EMERGENCY SOS DISPATCHED', 'First aid & security responders have been alerted to your position!', 'danger');
    } else {
      addToast('Issue Reported', 'Your ticket has been sent to the Event Command Center.', 'success');
    }
  };

  const updateIncidentStatus = (id: string, status: IncidentReport['status'], assignedTeam?: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          status,
          assignedTeam: assignedTeam !== undefined ? assignedTeam : inc.assignedTeam
        };
      }
      return inc;
    }));
    addToast('Incident Updated', `Ticket #${id} status changed to ${status}.`, 'info');
  };

  const updateSettings = (newSettings: Partial<EventSettingsData>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('Settings Saved', 'Event parameters updated successfully.', 'success');
  };

  const updateZoneOccupancy = (zoneId: string, newOccupancy: number) => {
    setZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        const ratio = newOccupancy / z.capacity;
        let crowdLevel: CrowdLevel = 'Low';
        if (ratio > 0.85) crowdLevel = 'Very Busy';
        else if (ratio > 0.65) crowdLevel = 'Busy';
        else if (ratio > 0.35) crowdLevel = 'Moderate';

        return { ...z, currentOccupancy: newOccupancy, crowdLevel };
      }
      return z;
    }));
  };

  const triggerSimulatedEvent = () => {
    setZones(prev => prev.map(z => z.id === 'food-court' ? { ...z, currentOccupancy: 590, crowdLevel: 'Very Busy', waitMinutes: 22 } : z));
    addAnnouncement({
      title: 'DEMO SIMULATION: Food Court Queue Peak',
      message: 'Sensors report Food Court is at 98% capacity. Attendees redirected to Networking Cafe.',
      priority: 'Important',
      targetAudience: 'All Attendees',
      publishedBy: 'Auto Telemetry Engine'
    });
    addToast('Demo Simulation Triggered!', 'Pushed simulated food court crowd surge & live alert.', 'warning');
  };

  const resetAllData = () => {
    setZones(initialVenueZones);
    setSessions(initialSessions);
    setSavedSessionIds(['sess-1', 'sess-3']);
    setAnnouncements(initialAnnouncements);
    setIncidents(initialIncidents);
    setSettings(initialEventSettings);
    setCurrentUser(sampleAttendee);
    addToast('Reset Complete', 'Restored default mock data.', 'info');
  };

  return (
    <EventContext.Provider value={{
      viewMode: viewModeState,
      setViewMode,
      attendeeTab,
      setAttendeeTab,
      organizerTab,
      setOrganizerTab,
      currentUser,
      isLoginModalOpen,
      setIsLoginModalOpen,
      loginModalRole,
      openLoginModal,
      loginAsDemoUser,
      loginCustomUser,
      logoutUser,
      isAccessRestrictedModalOpen,
      setIsAccessRestrictedModalOpen,
      isSplashLoading,
      zones,
      sessions,
      savedSessionIds,
      announcements,
      incidents,
      settings,
      toasts,
      selectedMapZone,
      setSelectedMapZone,
      navigationDestination,
      setNavigationDestination,
      toggleSaveSession,
      addSession,
      updateSession,
      deleteSession,
      addAnnouncement,
      deleteAnnouncement,
      reportIncident,
      updateIncidentStatus,
      updateSettings,
      updateZoneOccupancy,
      addToast,
      removeToast,
      triggerSimulatedEvent,
      resetAllData
    }}>
      <div className={`${settings.highContrastEnabled ? 'high-contrast' : ''} ${settings.largeTextEnabled ? 'large-text' : ''}`}>
        {children}
      </div>
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEventContext must be used within an EventProvider');
  return context;
};

