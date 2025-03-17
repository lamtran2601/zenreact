import { useQuery } from '@tanstack/react-query';
import { Ticket, TicketFilter } from '../types/ticket';
import { tickets } from './mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all tickets
export const fetchTickets = async (): Promise<Ticket[]> => {
  // Simulate API delay
  await delay(800);
  return tickets;
};

// Fetch tickets with filters
export const fetchFilteredTickets = async (filters: TicketFilter): Promise<Ticket[]> => {
  // Simulate API delay
  await delay(1000);
  
  return tickets.filter(ticket => {
    // Filter by team
    if (filters.team && 
        !ticket.match.homeTeam.name.toLowerCase().includes(filters.team.toLowerCase()) &&
        !ticket.match.awayTeam.name.toLowerCase().includes(filters.team.toLowerCase())) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateFrom && new Date(ticket.match.date) < new Date(filters.dateFrom)) {
      return false;
    }
    
    if (filters.dateTo && new Date(ticket.match.date) > new Date(filters.dateTo)) {
      return false;
    }
    
    // Filter by price range
    if (filters.priceMin && ticket.category.price < filters.priceMin) {
      return false;
    }
    
    if (filters.priceMax && ticket.category.price > filters.priceMax) {
      return false;
    }
    
    // Filter by competition
    if (filters.competition && 
        !ticket.match.competition.toLowerCase().includes(filters.competition.toLowerCase())) {
      return false;
    }
    
    return true;
  });
};

// Fetch single ticket by ID
export const fetchTicketById = async (id: string): Promise<Ticket | undefined> => {
  // Simulate API delay
  await delay(500);
  
  return tickets.find(ticket => ticket.id === id);
};

// React Query Hooks

// Hook to get all tickets
export const useTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
  });
};

// Hook to get filtered tickets
export const useFilteredTickets = (filters: TicketFilter) => {
  return useQuery({
    queryKey: ['tickets', 'filtered', filters],
    queryFn: () => fetchFilteredTickets(filters),
  });
};

// Hook to get a single ticket
export const useTicket = (id: string | undefined) => {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: () => (id ? fetchTicketById(id) : Promise.resolve(undefined)),
    enabled: !!id, // Only run the query if id is provided
  });
}; 