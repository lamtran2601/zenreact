import { Match, Team, Ticket, TicketCategory } from '../types/ticket';

// Mock Teams
export const teams: Team[] = [
  {
    id: 't1',
    name: 'Manchester United',
    logo: 'https://placekitten.com/100/100?1',
  },
  {
    id: 't2',
    name: 'Liverpool',
    logo: 'https://placekitten.com/100/100?2',
  },
  {
    id: 't3',
    name: 'Arsenal',
    logo: 'https://placekitten.com/100/100?3',
  },
  {
    id: 't4',
    name: 'Chelsea',
    logo: 'https://placekitten.com/100/100?4',
  },
  {
    id: 't5',
    name: 'Manchester City',
    logo: 'https://placekitten.com/100/100?5',
  },
  {
    id: 't6',
    name: 'Tottenham Hotspur',
    logo: 'https://placekitten.com/100/100?6',
  },
];

// Mock Matches
export const matches: Match[] = [
  {
    id: 'm1',
    homeTeam: teams[0], // Manchester United
    awayTeam: teams[1], // Liverpool
    stadium: 'Old Trafford',
    date: '2023-12-10',
    time: '15:00',
    competition: 'Premier League',
  },
  {
    id: 'm2',
    homeTeam: teams[2], // Arsenal
    awayTeam: teams[3], // Chelsea
    stadium: 'Emirates Stadium',
    date: '2023-12-17',
    time: '17:30',
    competition: 'Premier League',
  },
  {
    id: 'm3',
    homeTeam: teams[4], // Manchester City
    awayTeam: teams[5], // Tottenham
    stadium: 'Etihad Stadium',
    date: '2023-12-23',
    time: '12:30',
    competition: 'Premier League',
  },
  {
    id: 'm4',
    homeTeam: teams[1], // Liverpool
    awayTeam: teams[4], // Manchester City
    stadium: 'Anfield',
    date: '2024-01-05',
    time: '20:00',
    competition: 'FA Cup',
  },
  {
    id: 'm5',
    homeTeam: teams[0], // Manchester United
    awayTeam: teams[3], // Chelsea
    stadium: 'Old Trafford',
    date: '2024-01-14',
    time: '16:30',
    competition: 'Premier League',
  },
];

// Mock Ticket Categories
export const ticketCategories: TicketCategory[] = [
  {
    id: 'c1',
    name: 'VIP',
    description: 'Best seats with access to exclusive lounge',
    price: 250,
  },
  {
    id: 'c2',
    name: 'Premium',
    description: 'Great seats with excellent view',
    price: 150,
  },
  {
    id: 'c3',
    name: 'Standard',
    description: 'Regular seating with good view',
    price: 80,
  },
  {
    id: 'c4',
    name: 'Economy',
    description: 'Budget-friendly seats',
    price: 40,
  },
];

// Generate Mock Tickets
export const generateTickets = (): Ticket[] => {
  const tickets: Ticket[] = [];
  
  matches.forEach(match => {
    ticketCategories.forEach(category => {
      tickets.push({
        id: `ticket-${match.id}-${category.id}`,
        match,
        category,
        available: Math.floor(Math.random() * 100) + 1,
        maxPerPurchase: 10,
      });
    });
  });
  
  return tickets;
};

// Mock Tickets
export const tickets = generateTickets(); 