import { Match, Booking } from '../types';
import { format, addDays } from 'date-fns';

/**
 * Generate mock football matches
 */
export const generateMockMatches = (): Match[] => {
  const teams = [
    'Manchester United',
    'Liverpool',
    'Arsenal',
    'Chelsea',
    'Manchester City',
    'Tottenham',
    'Leicester City',
    'Everton',
    'West Ham',
    'Newcastle',
    'Aston Villa',
    'Southampton',
    'Crystal Palace',
    'Brighton',
    'Wolves',
    'Burnley',
    'Leeds United',
    'Watford',
    'Norwich City',
    'Brentford',
  ];

  const venues = [
    'Old Trafford',
    'Anfield',
    'Emirates Stadium',
    'Stamford Bridge',
    'Etihad Stadium',
    'Tottenham Hotspur Stadium',
    'King Power Stadium',
    'Goodison Park',
    'London Stadium',
    'St James\' Park',
  ];

  const categories = ['Premier League', 'FA Cup', 'EFL Cup', 'Champions League', 'Europa League'];

  const matches: Match[] = [];

  // Generate 20 matches
  for (let i = 0; i < 20; i++) {
    const homeTeamIndex = Math.floor(Math.random() * teams.length);
    let awayTeamIndex = Math.floor(Math.random() * teams.length);
    
    // Ensure home and away teams are different
    while (awayTeamIndex === homeTeamIndex) {
      awayTeamIndex = Math.floor(Math.random() * teams.length);
    }
    
    const homeTeam = teams[homeTeamIndex];
    const awayTeam = teams[awayTeamIndex];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const availableTickets = Math.floor(Math.random() * 500) + 100;
    const price = Math.floor(Math.random() * 150) + 50;
    const date = format(addDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd');
    
    matches.push({
      id: `match-${i + 1}`,
      homeTeam,
      awayTeam,
      date,
      venue,
      availableTickets,
      price,
      category,
      description: `${homeTeam} vs ${awayTeam} - ${category} match at ${venue}`,
      image: `https://picsum.photos/seed/${homeTeam.replace(/\s+/g, '')}-${awayTeam.replace(/\s+/g, '')}/400/200`,
    });
  }

  return matches;
};

/**
 * Generate mock bookings
 */
export const generateMockBookings = (): Booking[] => {
  return [];
};

/**
 * Mock data for initial state
 */
export const mockMatches = generateMockMatches();
export const mockBookings = generateMockBookings(); 