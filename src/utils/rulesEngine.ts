import type { VenueZone, Session, NavigationRoute, CrowdLevel } from '../types';

/**
 * Calculates simulated turn-by-turn route and SVG path between two venue zones.
 */
export function calculateNavigationRoute(
  fromZone: VenueZone,
  toZone: VenueZone,
  isAccessibleOnly: boolean = false
): NavigationRoute {
  // Approximate Cartesian distance between coordinates
  const dx = toZone.x - fromZone.x;
  const dy = toZone.y - fromZone.y;
  const straightDist = Math.sqrt(dx * dx + dy * dy);
  
  // 1 coordinate unit ~ 8 meters
  const distanceMeters = Math.round(straightDist * 7.5);
  // Average walking speed: 70m/min (standard) or 50m/min (accessible route)
  const walkingSpeed = isAccessibleOnly ? 50 : 70;
  const estimatedMinutes = Math.max(1, Math.ceil(distanceMeters / walkingSpeed));

  // Intermediate waypoint for visual L-shaped SVG path or accessible ramp path
  const midX = isAccessibleOnly ? fromZone.x + dx * 0.3 : fromZone.x;
  const midY = isAccessibleOnly ? fromZone.y : fromZone.y + dy * 0.7;

  const svgPathPoints = `M ${fromZone.x} ${fromZone.y} Q ${midX} ${midY} ${toZone.x} ${toZone.y}`;

  const steps: string[] = [];
  steps.push(`Start at ${fromZone.name}`);
  
  if (isAccessibleOnly) {
    steps.push(`Follow the highlighted blue Accessible Ramp / Tactile Floor guide.`);
    if (fromZone.elevatorAvailable || toZone.elevatorAvailable) {
      steps.push(`Take Elevator B to Level 1 Concourse.`);
    }
  } else {
    steps.push(`Head towards the central concourse corridor.`);
  }

  steps.push(`Proceed straight for approx. ${Math.round(distanceMeters * 0.6)}m.`);
  steps.push(`Turn towards ${toZone.name}.`);
  steps.push(`Arrive safely at ${toZone.name}.`);

  return {
    fromZoneId: fromZone.id,
    toZoneId: toZone.id,
    distanceMeters,
    estimatedMinutes,
    steps,
    svgPathPoints,
    isAccessible: isAccessibleOnly
  };
}

/**
 * Detects overlapping sessions in user's saved schedule.
 */
export function detectScheduleConflicts(savedSessions: Session[]): { sessionA: Session; sessionB: Session }[] {
  const conflicts: { sessionA: Session; sessionB: Session }[] = [];

  for (let i = 0; i < savedSessions.length; i++) {
    for (let j = i + 1; j < savedSessions.length; j++) {
      const a = savedSessions[i];
      const b = savedSessions[j];

      const aStart = a.timeMinutes;
      const aEnd = a.timeMinutes + a.durationMinutes;
      const bStart = b.timeMinutes;
      const bEnd = b.timeMinutes + b.durationMinutes;

      // Check if intervals overlap
      if (Math.max(aStart, bStart) < Math.min(aEnd, bEnd)) {
        conflicts.push({ sessionA: a, sessionB: b });
      }
    }
  }

  return conflicts;
}

/**
 * Rule-based recommendation engine for sessions based on attendee interests and seat availability.
 */
export function getRecommendedSessions(
  allSessions: Session[],
  savedSessionIds: string[],
  userInterests: string[] = ['Keynote', 'UX', 'React']
): Session[] {
  return allSessions
    .filter(session => !savedSessionIds.includes(session.id))
    .map(session => {
      let score = 0;
      // Tag matching
      session.tags.forEach(tag => {
        if (userInterests.some(interest => interest.toLowerCase() === tag.toLowerCase())) {
          score += 10;
        }
      });
      // Seat availability bonus
      const openRatio = (session.totalSeats - session.registeredSeats) / session.totalSeats;
      if (openRatio > 0.3) score += 5;
      if (session.status === 'Upcoming') score += 5;

      return { session, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.session);
}

/**
 * Recommends low-crowd alternative zones for busy areas (e.g. Food, Restrooms, Networking).
 */
export function getAlternativeZone(
  targetZone: VenueZone,
  allZones: VenueZone[]
): VenueZone | null {
  if (targetZone.crowdLevel !== 'Very Busy' && targetZone.crowdLevel !== 'Busy') {
    return null;
  }

  // Find same category or similar category zones with Low or Moderate crowd level
  const alternatives = allZones.filter(z => 
    z.id !== targetZone.id && 
    (z.category === targetZone.category || (targetZone.category === 'food' && z.category === 'networking')) &&
    (z.crowdLevel === 'Low' || z.crowdLevel === 'Moderate')
  );

  if (alternatives.length === 0) return null;
  
  // Return the one with lowest occupancy ratio
  return alternatives.sort((a, b) => (a.currentOccupancy / a.capacity) - (b.currentOccupancy / b.capacity))[0];
}

/**
 * Utility helper to determine Tailwind badge color based on crowd level.
 */
export function getCrowdBadgeStyle(level: CrowdLevel): { bg: string; text: string; border: string } {
  switch (level) {
    case 'Low':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-300' };
    case 'Moderate':
      return { bg: 'bg-sky-500/10', text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-300' };
    case 'Busy':
      return { bg: 'bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-300' };
    case 'Very Busy':
      return { bg: 'bg-rose-500/10', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-300' };
  }
}
