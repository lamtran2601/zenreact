export interface Team {
  id: string;
  name: string;
  logo: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  stadium: string;
  date: string; // ISO date string
  time: string; // 24h format
  competition: string;
}

export interface TicketCategory {
  id: string;
  name: string; // e.g., "VIP", "Standard", "Economy"
  description: string;
  price: number;
}

export interface Ticket {
  id: string;
  match: Match;
  category: TicketCategory;
  available: number; // Number of tickets available
  maxPerPurchase: number; // Maximum number of tickets per purchase
}

export interface CartItem {
  ticketId: string;
  matchId: string;
  quantity: number;
  category: TicketCategory;
  match: Match;
}

export interface TicketFilter {
  team?: string;
  dateFrom?: string;
  dateTo?: string;
  priceMin?: number;
  priceMax?: number;
  competition?: string;
} 