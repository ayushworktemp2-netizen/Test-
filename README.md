# Eventora — "Navigate Better. Experience More."

> **Production-Quality Hackathon Platform for Smart Event Navigation, Crowd Telemetry, Safety SOS & Organizer Command**

Eventora is a smart event companion platform featuring dual experiences:
1. **Attendee Experience**: Turn-by-turn indoor SVG floorplan navigation, rule-based session discovery, schedule conflict warnings, real-time crowd queue monitoring, 1-tap Emergency SOS panic dispatch, and universal accessibility features.
2. **Organizer Command Center**: Operations KPI dashboard (94/100 Health Score), live venue crowd heat maps, session catalog CRUD, real-time announcement broadcasting, incident dispatch ticket queue, and spatial analytics.

---

## 🌟 Key Features

### 1. Attendee Experience
- **Interactive SVG Venue Floorplan**:
  - Vector map layout of 10 venue nodes (Main Stage, Workshops A & B, Networking Hub, Food Court, Restrooms, First Aid, Help Desk, Gate 1, Parking Lot B).
  - Clickable zones with live crowd indicators, occupancy numbers, wait times, and amenities.
  - **"Navigate Me" Route Simulator**: Calculates distance, walking time (ETA), animated path line, step-by-step turn directions, and **Accessible Route Toggle** (routing via ramps and elevators).
- **Event Schedule & Smart Rule Discovery**:
  - Filter by category, time, and hall location.
  - Live seat availability progress meters.
  - **Rule-Based Recommendations**: Recommends talks based on user tags and seat availability (Zero Generative AI / LLM APIs used).
- **Personal Itinerary & Schedule Conflict Detector**:
  - Saved sessions timeline.
  - **Automated Overlap Detector**: Prominently flags schedule conflicts when two saved sessions overlap in time.
- **Crowd Telemetry & Smart Alternative Finder**:
  - Real-time crowd heat levels (`Low`, `Moderate`, `Busy`, `Very Busy`).
  - Queue wait time estimations (e.g. Food Court 18m wait).
  - **Smart Alternative Recommendation**: Suggests low-crowd alternative zones (e.g. Networking Lounge Cafe for 0-minute wait).
- **Emergency Safety & SOS Center**:
  - Prominent 1-tap **EMERGENCY SOS Panic Button** with double-confirmation safety modal.
  - Issue reporting form (spill, lost item, medical, accessibility barrier) that directly populates the Organizer Command Center ticket queue!
  - Emergency hotline directory.
- **Accessibility & Inclusion Hub**:
  - **High-Contrast Dark Theme Toggle** (pitch black background with high luminescence text).
  - **Text Size Scaling switch**.
  - ASL sign-language session schedule, quiet sensory rooms, wheelchair ramp overlays.

### 2. Organizer Command Center
- **Operations Overview**: Real-time KPI cards (Total Attendance: 2,840, Active Venue Load: 78%, Open Alerts: 2, Health Score: 94/100).
- **Live Venue Monitor**: Real-time crowd heat cards with manual density modifier buttons for quick presentation testing.
- **Session Catalog Management**: Full CRUD modal forms to add, edit, or delete event sessions.
- **Broadcast Announcement System**: Send priority alerts (`General`, `Important`, `Emergency`) targeted to specific halls or all attendees. Instant push to attendee feed & toast container.
- **Incident & SOS Dispatch Queue**: Real-time ticket management (`Open` -> `In Progress` -> `Resolved`) and staff assignment dispatch.
- **Attendee Insights & Visual Analytics (Recharts)**:
  - Hourly venue traffic flow area chart.
  - Session registration vs capacity bar chart.
  - Spatial density distribution donut chart.
- **Event Settings**: Customize event title, capacity caps, paramedic hotline, and security extension numbers.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Vanilla CSS Glassmorphism + Responsive Layouts
- **Icons**: Lucide React (`lucide-react`)
- **Data Analytics**: Recharts (`recharts`)
- **Effects**: Canvas Confetti (`canvas-confetti`)
- **State Management & Persistence**: React Context API + LocalStorage + Real-Time Telemetry Simulation Engine

---

## 🚀 Quick Start & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/eventora.git
   cd eventora
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🎭 3-Minute Hackathon Demo Script

Follow this demo flow to showcase all core features in 3 minutes:

1. **Landing Page**:
   - Start on `http://localhost:5173`. Point out headline *"Every Event. One Smarter Experience."*
   - Click **"Explore Attendee Dashboard"**.
2. **Attendee Experience — Turn-by-Turn Navigation**:
   - Navigate to **"Venue Map"** tab.
   - Select **"Main Stage"** or **"Food Court"** and click **"Navigate Me"**.
   - Observe the animated SVG path line, step-by-step turn directions, and estimated walking time.
   - Toggle **"Accessible Route"** to watch the path update for ramps and elevators.
3. **Session Bookmarking & Conflict Warning**:
   - Go to **"Sessions"** tab.
   - Click **"Add to Schedule"** on two sessions occurring at the same time (e.g. *High-Performance Frontend Systems* and *Inclusive UX Design* at 10:45 AM).
   - Go to **"My Schedule"** tab -> Observe the high-visibility **SCHEDULE OVERLAP DETECTED** warning banner.
4. **Crowd Intelligence & Alternative Suggestion**:
   - Go to **"Crowd Status"** tab.
   - Point out Food Pavilion at `Very Busy (18m wait)` and the rule-based **Smart Alternative Suggestion** directing attendees to Networking Lounge Cafe.
5. **Safety Center & Incident Dispatch**:
   - Go to **"Safety & SOS"** tab.
   - Submit an issue report: Category *"Spill/Cleanliness"*, Location *"Workshop Alpha"*.
6. **Organizer Command Center**:
   - Click **"Organizer Command"** in the sticky top demo toolbar.
   - Open **"Incident & SOS Queue"** -> View the issue reported in Step 5! Click **"Assign Staff"** and **"Resolve Ticket"**.
   - Open **"Broadcast System"** -> Create announcement: *"Free Coffee at Networking Lounge!"* with Priority *"Important"*.
   - Switch back to **Attendee Experience** -> Observe instant toast notification & live updates feed update!

---

## 📄 License

MIT License &copy; 2026 Eventora Team. Built for the Smart Event Experience Hackathon Challenge.
