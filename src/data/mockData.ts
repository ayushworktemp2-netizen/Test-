import type { VenueZone, Session, Announcement, IncidentReport, EventSettingsData } from '../types';

export const initialVenueZones: VenueZone[] = [
  {
    id: 'main-stage',
    name: 'Main Stage (Auditorium A)',
    category: 'stage',
    description: 'Central hall for Keynotes, Opening Ceremonies & Product Launches.',
    x: 35,
    y: 28,
    capacity: 1200,
    currentOccupancy: 980,
    crowdLevel: 'Very Busy',
    waitMinutes: 12,
    accessibleRamp: true,
    elevatorAvailable: true,
    signLanguageSupport: true,
    amenities: ['Assistive Listening', 'Wheelchair Seating', 'Live Captioning Screen']
  },
  {
    id: 'workshop-a',
    name: 'Workshop Room Alpha',
    category: 'workshop',
    description: 'Hands-on interactive tech sessions & code labs.',
    x: 68,
    y: 25,
    capacity: 250,
    currentOccupancy: 180,
    crowdLevel: 'Busy',
    waitMinutes: 5,
    accessibleRamp: true,
    elevatorAvailable: true,
    amenities: ['Power Outlets', 'High-Speed Wi-Fi', 'Ramp Access']
  },
  {
    id: 'workshop-b',
    name: 'Workshop Room Beta',
    category: 'workshop',
    description: 'Design systems, UX clinics & product strategy discussions.',
    x: 82,
    y: 38,
    capacity: 200,
    currentOccupancy: 85,
    crowdLevel: 'Moderate',
    waitMinutes: 2,
    accessibleRamp: true,
    elevatorAvailable: true,
    quietZone: false,
    amenities: ['Whiteboards', 'Braille Signage']
  },
  {
    id: 'networking-hub',
    name: 'Networking Lounge & Cafe',
    category: 'networking',
    description: 'Relaxed space for 1-on-1 meetings, mentor hours & coffee breaks.',
    x: 52,
    y: 55,
    capacity: 500,
    currentOccupancy: 190,
    crowdLevel: 'Low',
    waitMinutes: 1,
    accessibleRamp: true,
    elevatorAvailable: true,
    quietZone: false,
    amenities: ['Free Espresso Bar', 'Device Charging Nodes', 'Soft Seating']
  },
  {
    id: 'food-court',
    name: 'Gourmet Food Pavilion',
    category: 'food',
    description: 'Multi-cuisine food trucks, dietary options (Vegan, Halal, Gluten-Free).',
    x: 22,
    y: 72,
    capacity: 600,
    currentOccupancy: 530,
    crowdLevel: 'Very Busy',
    waitMinutes: 18,
    accessibleRamp: true,
    elevatorAvailable: false,
    amenities: ['Braille Menus', 'Low Height Ordering Counters']
  },
  {
    id: 'restrooms-north',
    name: 'North Restrooms & Family Room',
    category: 'restroom',
    description: 'Gender-neutral, accessible stalls, nursing facilities.',
    x: 75,
    y: 12,
    capacity: 60,
    currentOccupancy: 22,
    crowdLevel: 'Moderate',
    waitMinutes: 4,
    accessibleRamp: true,
    elevatorAvailable: true,
    amenities: ['Automatic Doors', 'Adult Changing Table', 'Emergency Call Button']
  },
  {
    id: 'first-aid',
    name: 'Medical & Safety Center',
    category: 'medical',
    description: '24/7 Paramedic team, AED units, sensory recharge room.',
    x: 42,
    y: 82,
    capacity: 40,
    currentOccupancy: 6,
    crowdLevel: 'Low',
    waitMinutes: 0,
    accessibleRamp: true,
    elevatorAvailable: true,
    quietZone: true,
    amenities: ['Sensory Dimming Room', 'Paramedic Dispatch', 'Refrigerated Medication Storage']
  },
  {
    id: 'help-desk',
    name: 'Info & Accessibility Desk',
    category: 'help',
    description: 'Lost & Found, mobility scooter rentals, interpreter assistance.',
    x: 50,
    y: 15,
    capacity: 80,
    currentOccupancy: 25,
    crowdLevel: 'Low',
    waitMinutes: 2,
    accessibleRamp: true,
    elevatorAvailable: true,
    signLanguageSupport: true,
    amenities: ['Wheelchair Rental', 'Tactile Maps', 'ASL Translators']
  },
  {
    id: 'main-gate',
    name: 'Main Entry Gate 1',
    category: 'gate',
    description: 'Badge scanning, fast-track registration & security checkpoint.',
    x: 12,
    y: 40,
    capacity: 800,
    currentOccupancy: 340,
    crowdLevel: 'Moderate',
    waitMinutes: 6,
    accessibleRamp: true,
    elevatorAvailable: false,
    amenities: ['Wide Turnstiles', 'Audio Guidance Beacons']
  },
  {
    id: 'parking-west',
    name: 'Accessible Parking Lot B',
    category: 'parking',
    description: 'EV Chargers, ADA designated spots, shuttle pickup.',
    x: 8,
    y: 15,
    capacity: 350,
    currentOccupancy: 280,
    crowdLevel: 'Busy',
    waitMinutes: 3,
    accessibleRamp: true,
    elevatorAvailable: true,
    amenities: ['Shuttle Bus Ramp', '24/7 Security Patrol']
  }
];

export const initialSessions: Session[] = [
  {
    id: 'sess-1',
    title: 'Opening Keynote: Building Human-Centric Smart Systems',
    speaker: {
      name: 'Dr. Elena Vance',
      role: 'Head of Product Architecture',
      company: 'Aether Technologies',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    },
    startTime: '09:30 AM',
    endTime: '10:30 AM',
    timeMinutes: 570,
    durationMinutes: 60,
    venueId: 'main-stage',
    venueName: 'Main Stage (Auditorium A)',
    category: 'Keynote',
    totalSeats: 1200,
    registeredSeats: 1150,
    status: 'Live',
    description: 'Explore how future urban and event infrastructure seamlessly integrates real-time telemetry, spatial mapping, and inclusion standards.',
    tags: ['Keynote', 'Architecture', 'Accessibility']
  },
  {
    id: 'sess-2',
    title: 'High-Performance Frontend Systems at Scale',
    speaker: {
      name: 'Marcus Chen',
      role: 'Principal Engineer',
      company: 'Vortex Global',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    startTime: '10:45 AM',
    endTime: '11:45 AM',
    timeMinutes: 645,
    durationMinutes: 60,
    venueId: 'workshop-a',
    venueName: 'Workshop Room Alpha',
    category: 'Cloud & Architecture',
    totalSeats: 250,
    registeredSeats: 240,
    status: 'Upcoming',
    description: 'Master micro-interactions, responsive SVG rendering, and real-time state synchronization in web apps without backend overhead.',
    tags: ['Frontend', 'React', 'Performance']
  },
  {
    id: 'sess-3',
    title: 'Inclusive UX Design: Beyond Compliance to Joy',
    speaker: {
      name: 'Sophia Patel',
      role: 'Director of Accessible Experience',
      company: 'OmniDesign Studio',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
    },
    startTime: '10:45 AM',
    endTime: '11:45 AM',
    timeMinutes: 645,
    durationMinutes: 60,
    venueId: 'workshop-b',
    venueName: 'Workshop Room Beta',
    category: 'UX & Product',
    totalSeats: 200,
    registeredSeats: 140,
    status: 'Upcoming',
    description: 'Practical guide to building accessible interfaces with tactile feedback, high contrast modes, screen reader optimizations, and sensory safe zones.',
    tags: ['UX', 'Accessibility', 'Inclusion']
  },
  {
    id: 'sess-4',
    title: 'Fireside Chat: The Future of Event Safety & Crowd Flow',
    speaker: {
      name: 'David Reynolds',
      role: 'Chief Operations Officer',
      company: 'SafeVenue Global',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    timeMinutes: 780,
    durationMinutes: 60,
    venueId: 'main-stage',
    venueName: 'Main Stage (Auditorium A)',
    category: 'Keynote',
    totalSeats: 1200,
    registeredSeats: 920,
    status: 'Upcoming',
    description: 'How modern stadiums and conference centers prevent bottlenecking using smart heat maps, emergency dispatch protocols, and rule-based rerouting.',
    tags: ['Safety', 'Operations', 'Crowd Flow']
  },
  {
    id: 'sess-5',
    title: 'Hands-on Lab: Rule-Based Systems & Event Analytics',
    speaker: {
      name: 'Aisha Omar',
      role: 'Lead Data Strategist',
      company: 'MetricPulse',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200'
    },
    startTime: '02:15 PM',
    endTime: '03:45 PM',
    timeMinutes: 855,
    durationMinutes: 90,
    venueId: 'workshop-a',
    venueName: 'Workshop Room Alpha',
    category: 'Workshop',
    totalSeats: 250,
    registeredSeats: 210,
    status: 'Upcoming',
    description: 'Learn how deterministic algorithms can generate real-time recommendations, balance venue traffic, and trigger automated safety alerts.',
    tags: ['Workshop', 'Data', 'Algorithms']
  },
  {
    id: 'sess-6',
    title: 'Founder & Investor VIP Networking Hour',
    speaker: {
      name: 'Alex Rivera',
      role: 'Venture Partner',
      company: 'Horizon Capital',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    startTime: '04:00 PM',
    endTime: '05:30 PM',
    timeMinutes: 960,
    durationMinutes: 90,
    venueId: 'networking-hub',
    venueName: 'Networking Lounge & Cafe',
    category: 'Networking',
    totalSeats: 500,
    registeredSeats: 390,
    status: 'Upcoming',
    description: 'Connect with tech leaders, event innovators, and venture capital partners over gourmet refreshments.',
    tags: ['Networking', 'Founders', 'Investors']
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Welcome to TechVerse Summit 2026!',
    message: 'Check out the interactive map for instant turn-by-turn navigation and wheelchair-accessible routes.',
    timestamp: '09:00 AM',
    priority: 'General',
    targetAudience: 'All Attendees',
    publishedBy: 'Event Ops Center'
  },
  {
    id: 'ann-2',
    title: 'Main Stage Keynote starting in 15 Minutes',
    message: 'Dr. Elena Vance will present on Human-Centric Smart Systems. ASL translation is active in Row 1.',
    timestamp: '09:15 AM',
    priority: 'Important',
    targetAudience: 'All Attendees',
    publishedBy: 'Stage Manager'
  },
  {
    id: 'ann-3',
    title: 'Food Pavilion Notice: High Wait Times',
    message: 'Gourmet Food Pavilion current wait is 18m. Consider visiting the Networking Lounge Cafe for faster options.',
    timestamp: '10:20 AM',
    priority: 'Important',
    targetAudience: 'All Attendees',
    publishedBy: 'Crowd Operations'
  }
];

export const initialIncidents: IncidentReport[] = [
  {
    id: 'inc-101',
    type: 'Spill/Cleanliness',
    title: 'Coffee spill near Workshop Alpha entrance',
    locationId: 'workshop-a',
    locationName: 'Workshop Room Alpha',
    reporterName: 'John Doe (Attendee)',
    timestamp: '10:05 AM',
    severity: 'Low',
    status: 'In Progress',
    assignedTeam: 'Janitorial Services Unit 2',
    notes: 'Cleaners en route with mop.'
  },
  {
    id: 'inc-102',
    type: 'Crowd Overflow',
    title: 'High crowding at Food Pavilion entry ramp',
    locationId: 'food-court',
    locationName: 'Gourmet Food Pavilion',
    reporterName: 'Automated Sensor / Telemetry',
    timestamp: '10:18 AM',
    severity: 'Medium',
    status: 'Open',
    assignedTeam: 'Crowd Safety Team A',
    notes: 'Staff dispatched to open overflow queue line.'
  }
];

export const initialEventSettings: EventSettingsData = {
  eventName: 'TechVerse Summit 2026',
  eventSubtitle: 'The Premier Conference on Human-Centered Tech & Smart Venues',
  startDate: '2026-09-15',
  endDate: '2026-09-17',
  venueName: 'Metro Convention Center - Hall 4',
  totalCapacity: 3500,
  emergencyHotline: '+1 (800) 555-EVENT',
  securityDesk: 'Ext. 4099 / Ground Floor Desk B',
  accessibilityContact: 'accessibility@eventora.demo',
  highContrastEnabled: false,
  largeTextEnabled: false,
  wheelchairRouteOnly: false,
  simulationActive: true
};
