import React from 'react';
import { EventProvider, useEventContext } from './context/EventContext';
import { DemoHeader } from './components/common/DemoHeader';
import { ToastContainer } from './components/common/ToastContainer';
import { DemoLoginModal } from './components/common/DemoLoginModal';
import { AccessRestrictedModal } from './components/common/AccessRestrictedModal';
import { SplashScreen } from './components/common/SplashScreen';
import { AuthPage } from './pages/AuthPage';
import { LandingPage } from './pages/LandingPage';
import { AttendeeDashboard } from './pages/AttendeeDashboard';
import { OrganizerDashboard } from './pages/OrganizerDashboard';

const AppContent: React.FC = () => {
  const { viewMode, isSplashLoading } = useEventContext();

  if (isSplashLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 selection:bg-indigo-500 selection:text-white">
      {viewMode !== 'auth' && <DemoHeader />}
      <ToastContainer />
      <DemoLoginModal />
      <AccessRestrictedModal />

      <div className="flex-1">
        {viewMode === 'auth' && <AuthPage />}
        {viewMode === 'landing' && <LandingPage />}
        {viewMode === 'attendee' && <AttendeeDashboard />}
        {viewMode === 'organizer' && <OrganizerDashboard />}
      </div>
    </div>
  );
};

export function App() {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
}

export default App;
