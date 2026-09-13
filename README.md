# Eventora — "Navigate Better. Experience More."

> **Production-Quality SaaS Platform for Smart Event Navigation, Real-Time Crowd Telemetry, 1-Tap Safety SOS & Organizer Operations Command**

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717.svg)](https://github.com/ayushworktemp2-netizen/Test-.git)

Eventora is an enterprise smart event companion platform designed for large-scale conferences, summits, and expos. It provides two completely isolated, role-aware experiences connected to a real-time event telemetry engine:

1. **Attendee Experience**: Turn-by-turn indoor SVG floorplan navigation, rule-based session discovery, schedule conflict warnings, live crowd density telemetry, 1-tap Emergency SOS panic dispatch, and universal accessibility tools.
2. **Organizer Command Center**: Executive operations dashboard (Health Score 94/100), live venue crowd heat monitoring, session catalog CRUD, priority announcement broadcasting, incident dispatch ticket queue, and Recharts analytics.

---

## 🚀 Key Highlights & Architectural Principles

- **No Generative AI / LLM APIs**: Built using pure deterministic rule-based algorithms (`rulesEngine.ts`) and simulated live telemetry state engine.
- **Strict Role Isolation**: Authenticated Attendees see **ONLY** attendee-facing tools (`Landing`, `Attendee Experience`). Authenticated Organizers see **ONLY** the `Organizer Command Center`. Cross-role controls are NEVER rendered for the wrong role.
- **Protected Route Guards**: Unauthorized role navigation triggers an `AccessRestrictedModal` guard.
- **Fresh Visit & Refresh Reset**: Page reloads automatically log out and trigger a 1.5-second splash loading screen followed by the role selection authentication page.

---

## 🌟 Feature Breakdown

### 1. Application Entry & Role Authentication (`AuthPage.tsx`)
- **1.5s Splash Screen (`SplashScreen.tsx`)**: Pulsing Eventora sparkle logo, progress bar animation, and tagline *"Smart Event Venue & Companion"*.
- **Role Selection Cards**: Select between **Attendee** (*"Explore the event, navigate the venue, and manage your experience"*) and **Organizer** (*"Manage event operations, monitor the venue, and coordinate activities"*).
- **Dynamic Forms**: Dynamic title and button formatting (`Continue as Attendee` vs `Continue as Organizer`) for Sign In and Account Creation.
- **1-Tap Demo Access**: Instant judge logins for `Alex Rivera` (Attendee) and `Sarah Jenkins` (Organizer).

### 2. Attendee Portal (`AttendeeDashboard.tsx`)
- **Interactive SVG Venue Floorplan (`InteractiveMap.tsx`)**:
  - Vector floorplan of 10 venue zones with color-coded crowd indicators (`Low`, `Moderate`, `Busy`, `Very Busy`), wait times, and amenities.
  - **Turn-by-Turn Route Simulator**: Distance calculation, walking time (ETA), step-by-step directions, and **Accessible Route Toggle** (wheelchair ramps & elevators).
- **Session Discovery & Conflict Detector (`SessionDiscovery.tsx` & `PersonalSchedule.tsx`)**:
  - Category filtering, seat availability meters, and rule-based interest recommendations.
  - **Automated Conflict Detector**: Prominently flags overlapping saved sessions in your itinerary.
- **Live Crowd Telemetry & Alternative Finder (`CrowdStatusView.tsx`)**:
  - Real-time zone occupancy bars and rule-based low-density alternative recommendations (e.g. Networking Lounge Cafe for 0m wait).
- **Emergency SOS & Safety Center (`SafetyCenter.tsx`)**:
  - Prominent 1-tap **EMERGENCY SOS Panic Button** with double-confirmation safety modal.
  - Incident reporting queue (spills, lost items, medical, accessibility barriers) that populates the Organizer dispatch queue!
- **Universal Accessibility Suite (`AccessibilityCenter.tsx`)**:
  - High-Contrast Dark Theme toggle, Text Scaling switch, ASL sign-language schedule, quiet sensory rooms.

### 3. Organizer Command Center (`OrganizerDashboard.tsx`)
- **Operations Overview (`OperationsOverview.tsx`)**: Executive summary banner, 5 KPI metric cards, and Operations Health Index.
- **Live Spatial Monitor (`LiveVenueMonitor.tsx`)**: Live crowd heat density cards with manual occupancy modifier controls for live presentations.
- **Session Catalog Management (`SessionManagement.tsx`)**: Full CRUD modal forms to add, edit, or delete event sessions.
- **Broadcast System (`AnnouncementManagement.tsx`)**: Publish priority announcements (`General`, `Important`, `Emergency`) directly to attendee feeds.
- **Incident & SOS Dispatch Queue (`IncidentManagement.tsx`)**: Ticket queue (`Open` &rarr; `In Progress` &rarr; `Resolved`) with staff assignment controls.
- **Spatial Analytics (`AttendeeInsights.tsx`)**: Interactive Recharts graphs showing venue traffic flow, session seat fill rates, and zone distribution.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18 (TypeScript) |
| **Build Tool** | Vite 5 |
| **Styling** | Vanilla CSS Tokens + Tailwind CSS v3 |
| **Icons** | Lucide React (`lucide-react`) |
| **Analytics Charts** | Recharts (`recharts`) |
| **State Store** | React Context API (`EventContext`) + LocalStorage |
| **Repository** | [GitHub Repo](https://github.com/ayushworktemp2-netizen/Test-.git) |

---

## 📁 Repository Structure

```
PromptWars/
├── public/                  # Favicon & vector assets
├── src/
│   ├── components/
│   │   ├── attendee/        # InteractiveMap, Discovery, Schedule, SOS, Crowd, Accessibility
│   │   ├── organizer/       # Operations, Live Monitor, Session CRUD, Incident Queue, Analytics
│   │   └── common/          # DemoHeader, SplashScreen, AccessRestrictedModal, ToastContainer
│   ├── context/
│   │   └── EventContext.tsx # Global state store, telemetry ticker & role auth guards
│   ├── data/
│   │   └── mockData.ts      # TechVerse Summit 2026 preloaded dataset
│   ├── pages/
│   │   ├── AttendeeDashboard.tsx
│   │   ├── OrganizerDashboard.tsx
│   │   ├── LandingPage.tsx
│   │   └── AuthPage.tsx
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces & types
│   ├── utils/
│   │   └── rulesEngine.ts   # Routing math, crowd alternatives & conflict algorithms
│   ├── App.tsx              # Root component & entry router
│   ├── index.css            # Core design system tokens & glassmorphic utilities
│   └── main.tsx             # Application mount point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18.0 or higher)
- npm / yarn / pnpm

### 2. Installation & Running

```bash
# 1. Clone repository
git clone https://github.com/ayushworktemp2-netizen/Test-.git
cd Test-

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 🎭 Hackathon Judge Evaluation Journey

1. **App Entry**: Open `http://localhost:5173` &rarr; Observe the 1.5s **Splash Loading Screen** transition to **Welcome Authentication**.
2. **Attendee Journey**:
   - Click **`[ 👤 Demo Attendee ]`** &rarr; Land on Eventora Attendee Portal.
   - Note the top navbar: Displays **ONLY** `Landing` and `Attendee Experience`. Organizer options are hidden.
   - Click **`[ 🧭 Interactive Venue Map ]`** &rarr; Opens SVG floorplan map directly.
   - Select **Main Stage** &rarr; **Food Court** &rarr; Click **"Navigate Me"** &rarr; Toggle **"Accessible Route"**.
   - Go to **"Safety & SOS"** &rarr; Submit incident report: Category *"Spill/Cleanliness"*, Location *"Workshop Alpha"*.
3. **Organizer Journey**:
   - Click **`[ Logout ]`** in header &rarr; Returns to Authentication Screen.
   - Click **`[ 🛡️ Demo Organizer ]`** &rarr; Lands directly on Organizer Command Center.
   - Note the top navbar: Displays **ONLY** `Organizer Command`.
   - Open **"Incident & SOS Queue"** &rarr; View the issue reported by Attendee! Click **"Assign Staff"** &rarr; **"Resolve Ticket"**.
   - Open **"Broadcast System"** &rarr; Broadcast alert: *"Free Refreshments at Concourse B!"*.

---

## 📄 License

MIT License &copy; 2026 Eventora Team. Built for the Smart Event Experience Platform Challenge.
