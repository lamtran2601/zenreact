/**
 * Match interface representing a football match
 */
export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  availableTickets: number;
  price: number;
  category?: string;
  description?: string;
  image?: string;
}

/**
 * Booking interface representing a ticket booking
 */
export interface Booking {
  id: string;
  matchId: string;
  quantity: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

/**
 * Filter options for matches
 */
export interface MatchFilters {
  date?: string;
  team?: string;
  priceRange?: [number, number];
}

/**
 * Application state interface
 */
export interface AppState {
  matches: Match[];
  selectedMatch: Match | null;
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  filters: MatchFilters;
} 