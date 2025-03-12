import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Match, Booking, MatchFilters } from '../types';
import { mockMatches } from '../data/mockData';
import { format } from 'date-fns';

/**
 * @pattern ZustandStore
 * @rule TypeSafety
 * Ticket store interface extending AppState with actions and selectors
 */
interface TicketStore extends AppState {
  // Actions
  fetchMatches: () => Promise<void>;
  selectMatch: (match: Match) => void;
  bookTickets: (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => Promise<void>;
  applyFilters: (filters: Partial<MatchFilters>) => void;
  cancelBooking: (bookingId: string) => Promise<void>;

  // Cache for filtered matches (performance optimization)
  filteredMatchesCache: Match[];
  lastFilterHash: string;

  // Selectors
  getFilteredMatches: () => Match[];
  getMatchById: (id: string) => Match | undefined;
  getUserBookings: (email: string) => Booking[];

  // Reset functionality
  reset: () => void;
}

/**
 * @pattern InitialState
 * @rule MinimalState
 * Initial state for the ticket store
 */
const initialState: Omit<
  TicketStore,
  | 'fetchMatches'
  | 'selectMatch'
  | 'bookTickets'
  | 'applyFilters'
  | 'cancelBooking'
  | 'getFilteredMatches'
  | 'getMatchById'
  | 'getUserBookings'
  | 'reset'
> = {
  matches: [],
  selectedMatch: null,
  bookings: [],
  isLoading: false,
  error: null,
  filters: {},
  filteredMatchesCache: [],
  lastFilterHash: '',
};

/**
 * @pattern ZustandStore
 * @rule PersistenceStrategy
 * Create the ticket store with persistence middleware
 */
export const useTicketStore = create<TicketStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      /**
       * @pattern AsyncAction
       * @rule ErrorHandling
       * Fetch matches from API (simulated)
       */
      fetchMatches: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call with delay for realistic behavior
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set({ matches: mockMatches, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch matches',
            isLoading: false,
          });
        }
      },

      /**
       * @pattern SimpleAction
       * @rule MinimalUpdates
       * Select a match for viewing details
       */
      selectMatch: (match) => {
        set({ selectedMatch: match });
      },

      /**
       * @pattern AsyncAction
       * @rule OptimisticUpdate
       * Book tickets for a match
       */
      bookTickets: async (bookingData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const match = get().matches.find((m) => m.id === bookingData.matchId);

          if (!match) {
            throw new Error('Match not found');
          }

          if (match.availableTickets < bookingData.quantity) {
            throw new Error('Not enough tickets available');
          }

          // Create new booking
          const newBooking: Booking = {
            ...bookingData,
            id: `booking-${Date.now()}`,
            bookingDate: format(new Date(), 'yyyy-MM-dd'),
            status: 'confirmed',
          };

          // Update available tickets (optimistic update)
          const updatedMatches = get().matches.map((m) =>
            m.id === match.id
              ? { ...m, availableTickets: m.availableTickets - bookingData.quantity }
              : m
          );

          // Update state with new booking and updated matches
          set({
            bookings: [...get().bookings, newBooking],
            matches: updatedMatches,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to book tickets',
            isLoading: false,
          });
        }
      },

      /**
       * @pattern FilterAction
       * @rule BatchUpdates
       * Apply filters to matches
       */
      applyFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
          // Reset cache when filters change
          filteredMatchesCache: [],
          lastFilterHash: '',
        }));
      },

      /**
       * @pattern AsyncAction
       * @rule OptimisticUpdate
       * Cancel a booking
       */
      cancelBooking: async (bookingId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const booking = get().bookings.find((b) => b.id === bookingId);

          if (!booking) {
            throw new Error('Booking not found');
          }

          // Optimistically update booking status
          const updatedBookings = get().bookings.map((b) =>
            b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
          );

          // Return tickets to available pool
          const updatedMatches = get().matches.map((m) =>
            m.id === booking.matchId
              ? { ...m, availableTickets: m.availableTickets + booking.quantity }
              : m
          );

          set({
            bookings: updatedBookings,
            matches: updatedMatches,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to cancel booking',
            isLoading: false,
          });
        }
      },

      /**
       * @pattern Selector
       * @rule ComputedValues
       * Get filtered matches with caching for performance
       */
      getFilteredMatches: () => {
        const { matches, filters, filteredMatchesCache, lastFilterHash } = get();

        // Create a hash of the current filters for cache comparison
        const currentHash = JSON.stringify(filters);

        // Return cached result if filters haven't changed
        if (currentHash === lastFilterHash && filteredMatchesCache.length > 0) {
          return filteredMatchesCache;
        }

        // Apply filters
        const filtered = matches.filter((match) => {
          // Date filter
          if (filters.date && match.date !== filters.date) {
            return false;
          }

          // Team filter
          if (
            filters.team &&
            !match.homeTeam.includes(filters.team) &&
            !match.awayTeam.includes(filters.team)
          ) {
            return false;
          }

          // Price range filter
          if (
            filters.priceRange &&
            (match.price < filters.priceRange[0] || match.price > filters.priceRange[1])
          ) {
            return false;
          }

          return true;
        });

        // Update cache and hash
        set({ filteredMatchesCache: filtered, lastFilterHash: currentHash });

        return filtered;
      },

      /**
       * @pattern Selector
       * @rule SimpleSelector
       * Get a match by ID
       */
      getMatchById: (id) => {
        return get().matches.find((match) => match.id === id);
      },

      /**
       * @pattern Selector
       * @rule FilterSelector
       * Get bookings for a specific user
       */
      getUserBookings: (email) => {
        return get().bookings.filter((booking) => booking.customerEmail === email);
      },

      /**
       * @pattern ResetAction
       * @rule StateReset
       * Reset store to initial state
       */
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'football-ticket-storage',
      partialize: (state) => ({
        // Only persist these fields
        bookings: state.bookings,
        selectedMatch: state.selectedMatch,
        filters: state.filters,
      }),
    }
  )
);

/**
 * @pattern SelectorHooks
 * @rule PreventReRenders
 * Selector hooks for accessing state
 */
export const useMatches = () => useTicketStore((state) => state.matches);
export const useSelectedMatch = () => useTicketStore((state) => state.selectedMatch);
export const useBookings = () => useTicketStore((state) => state.bookings);
export const useIsLoading = () => useTicketStore((state) => state.isLoading);
export const useError = () => useTicketStore((state) => state.error);
export const useFilters = () => useTicketStore((state) => state.filters);

/**
 * @pattern MemoizedSelector
 * @rule PerformanceOptimization
 * Memoized selector for filtered matches to maintain referential stability
 */
const filteredMatchesSelector = (state: TicketStore) => state.getFilteredMatches();
export const useFilteredMatches = () => useTicketStore(filteredMatchesSelector);

/**
 * @pattern ActionHook
 * @rule ActionSeparation
 * Hook for accessing all actions
 */
export const useTicketActions = () => {
  const { fetchMatches, selectMatch, bookTickets, applyFilters, cancelBooking, reset } =
    useTicketStore();
  return { fetchMatches, selectMatch, bookTickets, applyFilters, cancelBooking, reset };
};
