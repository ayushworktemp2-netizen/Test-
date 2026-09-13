export type ViewMode = 'auth' | 'landing' | 'attendee' | 'organizer';


export type AttendeeTab = 
  | 'overview' 
  | 'map' 
  | 'discovery' 
  | 'schedule' 
  | 'updates' 
  | 'safety' 
  | 'accessibility' 
  | 'crowd';

export type OrganizerTab = 
  | 'overview' 
  | 'monitor' 
  | 'sessions' 
  | 'announcements' 
  | 'incidents' 
  | 'insights' 
  | 'settings';

export type CrowdLevel = 'Low' | 'Moderate' | 'Busy' | 'Very Busy';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'attendee' | 'organizer';
  avatar: string;
  title: string;
}

export interface VenueZone {
  id: string;
  name: string;
  category: 'stage' | 'workshop' | 'networking' | 'food' | 'restroom' | 'medical' | 'help' | 'gate' | 'parking' | 'accessibility';
  description: string;
  x: number; // Percentage coordinate 0-100 on SVG floorplan
  y: number;
  capacity: number;
  currentOccupancy: number;
  crowdLevel: CrowdLevel;
  waitMinutes?: number;
  accessibleRamp: boolean;
  elevatorAvailable: boolean;
  quietZone?: boolean;
  signLanguageSupport?: boolean;
  amenities: string[];
}

export interface Session {
  id: string;
  title: string;
  speaker: {
    name: string;
    role: string;
    avatar: string;
    company: string;
  };
  startTime: string; // e.g. "10:00 AM"
  endTime: string;   // e.g. "11:00 AM"
  timeMinutes: number; // Minute offset for schedule calculations (e.g. 600 for 10:00 AM)
  durationMinutes: number;
  venueId: string;
  venueName: string;
  category: 'Keynote' | 'AI & Future Tech' | 'Cloud & Architecture' | 'UX & Product' | 'Networking' | 'Workshop';
  totalSeats: number;
  registeredSeats: number;
  status: 'Upcoming' | 'Live' | 'Ended';
  description: string;
  tags: string[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'General' | 'Important' | 'Emergency';
  targetAudience: 'All Attendees' | 'Main Hall' | 'Workshop Track' | 'VIP';
  publishedBy: string;
}

export interface IncidentReport {
  id: string;
  type: 'SOS Alert' | 'Medical' | 'Security' | 'Spill/Cleanliness' | 'Lost Item' | 'Accessibility Issue' | 'Crowd Overflow';
  title: string;
  locationId: string;
  locationName: string;
  reporterName: string;
  timestamp: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved';
  assignedTeam?: string;
  notes?: string;
}

export interface NavigationRoute {
  fromZoneId: string;
  toZoneId: string;
  distanceMeters: number;
  estimatedMinutes: number;
  steps: string[];
  svgPathPoints: string; // SVG path d attribute string
  isAccessible: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
}

export interface EventSettingsData {
  eventName: string;
  eventSubtitle: string;
  startDate: string;
  endDate: string;
  venueName: string;
  totalCapacity: number;
  emergencyHotline: string;
  securityDesk: string;
  accessibilityContact: string;
  highContrastEnabled: boolean;
  largeTextEnabled: boolean;
  wheelchairRouteOnly: boolean;
  simulationActive: boolean;
}
